"use client";
import { TypeAnimation } from "react-type-animation";
import { useData } from "../service/Provider";
import React from "react";

const TypingText = () => {

  

  const data = useData();

  const sequence = data?.subTitle?.flatMap(item => [item.typing_text, 1000]);
  return (
    <span style={{ fontSize: "2em", textTransform: "uppercase", display: "inline-block", color: "white" }}>
      <span style={{ color: "#ffd966" }}>{data?.heroSection[0]?.subtitle_text} </span>
      <TypeAnimation
        sequence={sequence}
        wrapper="span"
        speed={10}
        repeat={Infinity}
      />
    </span>
  );
};

export default TypingText;
