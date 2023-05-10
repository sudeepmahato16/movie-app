import React, { useCallback } from "react";

import { IoMdClose } from "react-icons/io";

import { useGlobalContext } from "../../store";
import { m, AnimatePresence } from "framer-motion";
import { zoomIn } from "../../utils/motion";

const Modal = () => {
  const { videoId, toggleModal, isModalOpen, setVideoId } = useGlobalContext();
 
  const closeModal = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      toggleModal();
      setVideoId("");
    },
    [toggleModal]
  );

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 flex items-center w-screen h-screen justify-center z-10 bg-blackOverlay transition-all duration-300"
          onClick={closeModal}
        >
          <m.div
            variants={zoomIn(0.9, 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className=" md:w-[570px] md:h-[370px] sm:w-[80vw] sm:h-[60vh] w-[80vw] xs:h-[30vh] h-[35vh] dark:bg-gray-900 bg-mainColor z-10  shadow-lg rounded-md relative"
          >
            <button
              type="button"
              className="absolute -right-8 -top-6 dark:text-gray-300 text-gray-600 text-[28px] z-50 "
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
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
