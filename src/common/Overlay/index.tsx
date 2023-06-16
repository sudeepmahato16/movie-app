import { useGlobalContext } from "../../context/globalContext";

const Overlay = () => {
  const { showSidebar, setShowSidebar } = useGlobalContext();
  return (
    <div
      className={`${
        showSidebar
          ? "opacity-100 visible w-screen h-screen"
          : "opacity-0 invisible"
      } overlay fixed top-0 left-0 z-[15] drop-shadow-sm transition-all duration-300`}
      onClick={() => setShowSidebar(false)}
    ></div>
  );
};

export default Overlay;
