import AllIcons from "./AllIcons";
const IconRenderer = ({ iconName, size = 24,className }) => {
  const IconComponent = AllIcons[iconName];
  if (!IconComponent) return null;

  return <IconComponent size={size} className={className}/>;
};

export default IconRenderer;
