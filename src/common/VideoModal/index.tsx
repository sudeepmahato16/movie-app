import { IoMdClose } from "react-icons/io";
import { m, AnimatePresence } from "framer-motion";

import Overlay from "../Overlay";
import { useGlobalContext } from "../../context/globalContext";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { zoomIn } from "../../utils/motion";
import { useCallback } from "react";

const VideoModal = () => {
  const { videoId, toggleModal, isModalOpen, setVideoId } = useGlobalContext();

  const closeModal = useCallback(() => {
    toggleModal();
    setVideoId("");
  }, [setVideoId, toggleModal]);

  const { ref } = useOnClickOutside(closeModal);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Overlay className="flex items-center justify-center">
          <m.div
            variants={zoomIn(0.9, 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            ref={ref}
            className=" md:w-[570px] md:h-[370px] sm:w-[80vw] sm:h-[60vh] w-[80vw] xs:h-[30vh] h-[35vh] dark:bg-gray-900 bg-mainColor z-[25]  shadow-lg rounded-md relative"
          >
            <button
              type="button"
              className="absolute -right-8 -top-6 text-gray-300 text-[28px] z-50 "
              onClick={closeModal}
            >
              <IoMdClose />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://127.0.0.1:5173/`}
              title="trailer"
              width="100%"
              height="100%"
              className="rounded-md"
              allowFullScreen
            />
          </m.div>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
