import { useEffect, useRef } from "react";

export default function ModalAdd({
  state,
  setModalState,
  onclick,
  setName,
  setEmail,
}) {
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setModalState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return state ? (
    <div className="absolute h-screen w-screen bg-slate-600 opacity-95 z-50 -top-10 -left-10 bottom-0 right-0">
      <div>
        <div
          ref={wrapperRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/3 h-1/3 rounded-md"
        >
          <div className="flex flex-col items-center justify-center h-full">
            <input
              type="text"
              placeholder="Name"
              className="border-2 border-gray-300 rounded-md w-3/4 p-2 my-2"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="border-2 border-gray-300 rounded-md w-3/4 p-2 my-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-blue-500 font-semibold text-white px-7 py-2 mt-5 rounded-md"
              onClick={() => onclick()}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
