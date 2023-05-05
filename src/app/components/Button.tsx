interface Props {
  text: string | JSX.Element;
  theme: "dark" | "light" | "neutral" | "none";
}

export default function Button({ text, theme }: Props) {
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

  return (
    <>
      <button
        type="submit"
        className={`${themeMap[theme]} px-4 py-2 rounded transition-colors duration-1000`}
      >
        {text}
      </button>
    </>
  );
}
