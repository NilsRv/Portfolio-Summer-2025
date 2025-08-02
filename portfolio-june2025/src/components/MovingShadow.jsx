export default function MovingShadow() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-10">
      <div className="moving-shadow" />
    </div>
  );
}
