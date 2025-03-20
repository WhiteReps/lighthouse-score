const TitleWrapper = ({ title, firstLine, secondLine,thirdLine }) => {
  const renderText = (text) => {
    if (!text) return null;
    return text.split(/<br\s*\/?>|\n/).map((line, index) => (
      <p key={index} className="text-[#575757] font-light text-sm">
        {line}
      </p>
    ));
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-normal mb-2">{title}</h2>
      <div className="text-[#575757] font-light text-sm">{renderText(firstLine)}</div>
      <p className="text-[#575757] font-light text-sm">{secondLine}</p>
      <p className="text-[#575757] font-light text-sm">{thirdLine}</p>
    </div>
  );
};

export default TitleWrapper;
