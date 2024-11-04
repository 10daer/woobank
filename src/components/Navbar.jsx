import { useState } from "react";

import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import { AnimatePresence, delay, motion } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const menuSlide = {
    initial: {
      y: "100%",
    },
    animate: {
      y: "0%",
      transition: { duration: 1, ease: [0.64, 0, 0.36, 1] },
    },
    exit: {
      y: "100%",
      transition: { duration: 1.5, delay: 0.5, ease: [0.64, 0, 0.36, 1] },
    },
  };

  const slide = {
    initial: {
      opacity: 0,
      y: "80%",
      x: "100%",
    },
    animate: (i) => ({
      opacity: 1,
      y: "0",
      x: "0%",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
    exit: (i) => ({
      opacity: 0,
      y: "80%",
      x: "100%",
      transition: {
        duration: 1.25,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.15 * -i,
      },
    }),
  };

  return (
    <nav className="navbar flex w-full items-center justify-between py-6 md:py-10">
      <img
        src={logo}
        alt="hoobank"
        className="h-[32px] w-[124px] md:h-[58px] md:w-[248px]"
      />

      <ul className="hidden flex-1 list-none items-center justify-end sm:flex">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`cursor-pointer font-poppins text-xl font-normal hover:text-white ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>

      <div className="flex flex-1 items-center justify-end sm:hidden">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="h-[28px] w-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />
        <AnimatePresence mode="wait">
          {toggle && (
            <motion.div
              variants={menuSlide}
              animate="animate"
              exit="exit"
              initial="initial"
              className="bg-black-gradient fixed right-0 top-20 z-10 h-[calc(100vh-80px)] w-screen p-6"
            >
              <ul className="flex h-[50%] list-none flex-col items-start justify-between">
                {navLinks.map((nav, index) => (
                  <motion.li
                    variants={slide}
                    custom={index}
                    animate="animate"
                    exit="exit"
                    initial="initial"
                    key={nav.id}
                    className={`cursor-pointer font-poppins text-6xl font-medium ${
                      active === nav.title ? "text-white" : "text-dimWhite"
                    } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                    onClick={() => {
                      setToggle(false);
                      setActive(nav.title);
                    }}
                  >
                    <a className="hover:underline" href={`#${nav.id}`}>
                      {nav.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
