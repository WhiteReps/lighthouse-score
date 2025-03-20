import React from "react";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useData } from "../service/Provider";

const fetchComments = async (postId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POST_URL}/api/comments/${postId}/${process.env.NEXT_PUBLIC_SITE_ID}`
  );
  if (!response.ok) throw new Error("Error fetching comments");
  return response.json();
};

const postComment = async ({ commentText, postId, parentId }) => {
  const postLink = window.location.href;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_POST_URL}/api/comments/${process.env.NEXT_PUBLIC_SITE_ID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentText, postId, parentId, postLink }),
    }
  );

  if (!response.ok) throw new Error("Error posting comment");
  return response.json();
};

const CommentForm = ({
  onSubmit,
  isPosting,
  placeholder,
  buttonText,
  initialValue = "",
}) => {
  const [commentText, setCommentText] = useState(initialValue);
  const sectionData = useData();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onSubmit(commentText);
    setCommentText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6"
    >
      <div className="py-2 px-4 mb-4 bg-white rounded-lg border border-gray-200">
        <label
          htmlFor="comment"
          className="sr-only"
        >
          {sectionData?.singlePost[0]?.comment_input_text}
        </label>
        <textarea
          id="comment"
          rows="4"
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
          placeholder={placeholder}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-white bg-[#00359f] rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-[#00359f] disabled:opacity-50"
        disabled={isPosting}
      >
        {isPosting ? "Posting..." : buttonText}
      </button>
    </form>
  );
};

const CommentItem = ({ comment, onReply, isReply = false }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplyClick = () => {
    setShowReplyForm(!showReplyForm);
  };

  const sectionData = useData();

  const handleSubmitReply = (replyText) => {
    onReply(replyText, comment.cid);
    setShowReplyForm(false);
  };

  return (
    <article
      className={`p-6 text-base bg-white border-b ${isReply ? "border-l-4 border-l-gray-300 ml-6" : ""
        }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
            <Image
              className="mr-2 w-6 h-6 rounded-full"
              src={`${process.env.NEXT_PUBLIC_POST_URL}/api/uploads/${sectionData?.singlePost[0]?.avatar}`}
              alt="Comment user"
              width={20}
              height={20}
            />
            {sectionData?.singlePost[0]?.define_user_name}
          </p>
          <p className="text-sm text-gray-600">
            <time dateTime={comment.created_time}>
              {new Date(comment.created_time).toLocaleDateString()}
            </time>
          </p>
        </div>
      </div>
      <p className="text-gray-500">{comment.comment_desc}</p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          onClick={handleReplyClick}
          className="flex items-center text-sm text-gray-500 hover:underline"
        >
          <svg
            className="mr-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          {sectionData?.singlePost[0]?.reply_button_text}
        </button>
      </div>

      {showReplyForm && (
        <div className="mt-4">
          <CommentForm
            onSubmit={handleSubmitReply}
            isPosting={false}
            placeholder={sectionData?.singlePost[0]?.comment_input_text}
            buttonText={sectionData?.singlePost[0]?.post_comment_button_text}
          />
        </div>
      )}

      {/* Recursively Render Replies */}
      {comment.replies.length > 0 && (
        <div className="mt-4 pl-6 border-gray-300">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.cid}
              comment={reply}
              onReply={onReply}
              isReply={true}
            />
          ))}
        </div>
      )}
    </article>
  );
};

const Comments = ({ id }) => {

  

  const queryClient = useQueryClient();
  const [isPosting, setIsPosting] = useState(false);
  const sectionData = useData();

  const {
    data: comments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchComments(id),
    staleTime: 5000,
  });

  // Mutation for posting comments
  const mutation = useMutation({
    mutationFn: postComment,
    onMutate: async (newCommentData) => {
      setIsPosting(true);
      await queryClient.cancelQueries({ queryKey: ["comments", id] });

      const previousComments = queryClient.getQueryData(["comments", id]);

      queryClient.setQueryData(["comments", id], (old = []) => {
        const newComment = {
          cid: `temp-${Date.now()}`,
          comment_desc: newCommentData.commentText,
          created_time: new Date().toISOString().split("T")[0],
          parent_id: newCommentData.parentId || null,
          post_id: newCommentData.postId,
        };

        return [newComment, ...old];
      });

      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setIsPosting(false);
    },
    onError: (err, newCommentData, context) => {
      queryClient.setQueryData(["comments", id], context.previousComments);
      setIsPosting(false);
    },
  });

  const handleSubmitComment = (commentText) => {
    mutation.mutate({ commentText, postId: id });
  };

  const handleSubmitReply = (replyText, parentId) => {
    mutation.mutate({ commentText: replyText, postId: id, parentId });
  };

  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      setIsPosting(false);
    }
  }, [mutation.isSuccess, mutation.isError]);

  const organizeCommentsWithReplies = (comments) => {
    const commentMap = new Map();
    const rootComments = [];

    comments.forEach((comment) => {
      commentMap.set(comment.cid, { ...comment, replies: [] });
    });

    comments.forEach((comment) => {
      if (comment.parent_id && commentMap.has(comment.parent_id)) {
        commentMap
          .get(comment.parent_id)
          .replies.push(commentMap.get(comment.cid));
      } else {
        rootComments.push(commentMap.get(comment.cid));
      }
    });

    return rootComments;
  };

  const organizedComments = organizeCommentsWithReplies(comments);

  return (
    <section className="bg-white py-8 lg:py-16 antialiased">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
            {sectionData?.singlePost[0]?.comment_header_title} (
            {comments.length})
          </h2>
        </div>

        <CommentForm
          onSubmit={handleSubmitComment}
          isPosting={isPosting}
          placeholder={sectionData?.singlePost[0]?.comment_input_text}
          buttonText={sectionData?.singlePost[0]?.post_comment_button_text}
        />

        {isLoading && <p>Loading comments...</p>}
        {error && <p className="text-red-500">Error loading comments</p>}

        <div className="comments-container space-y-4">
          {organizedComments.map((comment) => (
            <CommentItem
              key={comment.cid}
              comment={comment}
              onReply={handleSubmitReply}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comments;
