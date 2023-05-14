import Spinner from "../../../components/Spinner";

export default function Loading() {
  return (
    <div className="flex h-64 items-center justify-center text-white-normal">
      <Spinner />
    </div>
  );
}
