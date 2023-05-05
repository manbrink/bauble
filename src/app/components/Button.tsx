interface Props {
  text: string;
}

export default function Button({ text }: Props) {
  return (
    <>
      <button
        type="submit"
        className="text-white-normal bg-neutral-darkest px-4 py-2 rounded hover:bg-black hover:text-white-bright transition-colors duration-1000"
      >
        {text}
      </button>
    </>
  );
}
