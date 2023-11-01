export default function RedBox() {
  return (
    <aside className="w-full flex relative justify-center">
      <strong
        className="absolute w-11/12 md:w-8/12 h-10 rounded-md bg-red-500 text-white text-xl flex
      justify-center items-center z-10 bottom-[-20px]"
      />
    </aside>
  );
}
