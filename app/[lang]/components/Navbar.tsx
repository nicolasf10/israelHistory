"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { EraInterface } from './MainSection';
import { Context } from '../context/SectionContext';
import LanguagePicker from './LanguagePicker';
import Link from 'next/link';
import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext';
import logo from './logo.png'

const Navbar = ({ eras: eras }: { eras: any }) => {
  const { era, setState } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const controls = useAnimation();
  const controlsInactive = useAnimation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    console.log(eras[era]);
    controls.start({ borderBottom: '2px solid #fff', x: 0 });
    controls.set({ transition: { delay: 1 } });
    controlsInactive.start({ borderBottom: '2px solid transparent' });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [era, controls]);

  const toggleNavbar = () => {
    if (!isOpen) {
      controls.start({ borderBottom: '2px solid transparent', x: 0 });
      controlsInactive.start({ borderBottom: '2px solid transparent' });
    }
    setIsOpen(!isOpen);
  };

  return (
    <nav className="font-roboto bg-blue-950 fixed top-0 w-full h-20 items-center justify-between flex z-50">
      {/* <div className="container mx-0 flex items-center justify-end outline-white"> */}
        <div className="flex mr-auto ml-4 items-center justify-start">
          {/* <Image
            className="h-14 w-auto p-1"
            src={logo}
            width={500}
            height={282}
            alt="Betar logo"
          /> */}
          <h1 className="text-white text-md md:text-xl font-bold font-libre">Historical Maps of the Land of Israel</h1>
        </div>

        <div className="hidden md:flex mr-4 items-center justify-self-end space-x-4">
          {eras.map((thisEra: EraInterface, index: number) => (
            <div key={index}>
              {era === index + 1 ? (
                <motion.div
                  className={`cursor-pointer text-white m-4 p-1 box-border`}
                  animate={controls}
                  transition={{
                    type: 'linear',
                    stiffness: 260,
                    damping: 20,
                    borderBottom: { duration: 0.1 },
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link href={`#era-${index+1}`}>{eras[index]}</Link>
                </motion.div>
              ) : (
                <motion.div
                  className={`cursor-pointer text-white m-4 p-1 box-border`}
                  transition={{
                    type: 'linear',
                    stiffness: 260,
                    damping: 20,
                    borderBottom: { duration: 0.1 },
                  }}
                  initial={{ borderBottom: '2px solid transparent' }}
                  animate={controlsInactive}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link href={`#era-${index+1}`}>{eras[index]}</Link>
                </motion.div>
              )}
            </div>
          ))}
          <LanguagePicker/>
        </div>

        <div className="md:hidden flex">
        <LanguagePicker/>
          <button onClick={toggleNavbar} className="text-white mx-4">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
      {/* </div> */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-inherit w-full"
            style={{ position: 'absolute', top: '100%', left: 0 }}
          >
            {/* Add your navigation links for mobile here */}
            {eras.map((thisEra: EraInterface, index: number) => (
              <div key={index}>
                {era === index + 1 ? (
                  <motion.div
                    className={`cursor-pointer text-white m-4 p-1 box-border`}
                    animate={controls}
                    transition={{
                      type: 'linear',
                      stiffness: 260,
                      damping: 20,
                      borderBottom: { duration: 0.5 },
                    }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Link onClick={() => setIsOpen(false)} href={`#era-${index+1}`}>{eras[index]}</Link>
                  </motion.div>
                ) : (
                  <motion.div
                    className={`cursor-pointer text-white m-4 p-1 box-border`}
                    transition={{
                      type: 'linear',
                      stiffness: 260,
                      damping: 20,
                      borderBottom: { duration: 0.5 },
                    }}
                    initial={{ borderBottom: '2px solid transparent' }}
                    animate={controlsInactive}
                    whileHover={{ scale: 1.01 }}
                  >
                    <Link onClick={() => setIsOpen(false)} href={`#era-${index+1}`}>{eras[index]}</Link>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
