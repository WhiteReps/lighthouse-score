export const extractImage = (html) => {
  const div = document.createElement("div");

  div.innerHTML = html;

  const img = div.querySelector("img");

  if (img) {
    const src = img.src;
    const updatedSrc = src.replace(
      `${process.env.NEXT_PUBLIC_OWN_URL}api/uploads`,
      `${process.env.NEXT_PUBLIC_CMS_URL}api/uploads`
    );
    return updatedSrc;
  }

  return null;
};
