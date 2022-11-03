export default function Container({ children }) {
  return (
    <div className="overflow-hidden">
      <div className="h-screen w-screen p-10 ">
        <div className="p-5 drop-shadow-[0_7px_13px_rgba(0,0,0,0.15)] rounded-3xl  bg-gray-50 h-full w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
