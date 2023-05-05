interface Props {
  text: string;
  theme: "dark" | "light";
}

export default function Button({ text, theme }: Props) {
  const darkTheme =
    "text-white-normal bg-neutral-darkest hover:text-white-bright hover:bg-black";
  const lightTheme =
    "text-neutral-darkest bg-white-normal hover:text-black hover:bg-white-bright";

  return (
    <>
      <button
        type="submit"
        className={`${
          theme === "dark" ? darkTheme : lightTheme
        } px-4 py-2 rounded hover:bg-black transition-colors duration-1000`}
      >
        {text}
      </button>
    </>
  );
}
