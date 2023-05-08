interface Props {
  className?: string; // extra custom classes
  text: string | JSX.Element;
  theme: "dark" | "light" | "neutral" | "none";
  size: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function Button({
  className,
  text,
  theme,
  size,
  onClick,
}: Props) {
  const neutralTheme =
    "text-white-normal bg-neutral-darkest hover:text-white-bright hover:bg-black";
  const darkTheme =
    "text-white-normal bg-black hover:text-white-bright hover:bg-black";
  const lightTheme =
    "text-neutral-darkest bg-white-normal hover:text-black hover:bg-white-bright";
  const noneTheme = "text-white-normal hover:text-white-bright";

  const themeMap = {
    neutral: neutralTheme,
    dark: darkTheme,
    light: lightTheme,
    none: noneTheme,
  };

  const sizeMap = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-md",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <>
      <button
        type="submit"
        className={`${className} ${themeMap[theme]} ${sizeMap[size]} rounded transition-colors duration-1000`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
