import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../shared/Button";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleClick = () => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.onscroll = function () {
    handleScroll();
  };

  return (
    <>
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, top: "-100px" }}
            animate={{ opacity: 1, top: "0" }}
            exit={{ opacity: 0, top: "-100px" }}
            className="fixed left-1/2 z-20 translate-x-[-50%]"
          >
            <Button
              styles={{
                boxShadow:
                  "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
              }}
              onClick={handleClick}
            >
              Scroll To Top
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollToTop;
