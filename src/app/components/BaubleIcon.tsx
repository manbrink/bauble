export default function BaubleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="50"
      height="50"
    >
      <circle cx="50" cy="50" r="5" fill="green" />
      {Array.from({ length: 360 / 10 }, (_, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={50 + Math.cos((i * 10 * Math.PI) / 180) * (i % 2 === 0 ? 40 : 30)}
          y2={50 + Math.sin((i * 10 * Math.PI) / 180) * (i % 2 === 0 ? 40 : 30)}
          stroke="white"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
