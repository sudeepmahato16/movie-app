import { useGlobalContext } from "../context/context";

const Overlay = () => {
  const { showSideBar, setShowSideBar } = useGlobalContext();
  return (
    <div
      className={`${
        showSideBar
          ? "opacity-100 visible w-screen h-screen"
          : "opacity-0 invisible"
      } bg-[rgba(0,0,0)] bg-opacity-50 fixed top-0 left-0 z-[5] drop-shadow-sm transition-all duration-300`}
      onClick={() => setShowSideBar(false)}
    ></div>
  );
};

export default Overlay;
