"use client"
import React, { useContext, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Context } from '../context/SectionContext';
import { EraInterface } from './MainSection';
import {
    Navbar as NavbarMaterial,
    MobileNav,
    Typography,
    Button,
    IconButton,
  } from "@material-tailwind/react";

const NavHeight = 18;

const Navbar2 = ({eras: eras} : {eras: any}) => {
    const { era, setState } = useContext(Context);
    const controls = useAnimation();
    const controlsInactive = useAnimation();

    const [openNav, setOpenNav] = React.useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 768 && setOpenNav(false),
        );

        console.log(eras[era]);
        controls.start({borderBottom: "2px solid #fff", x: 0});
        controls.set({transition: {delay: 1}})
        controlsInactive.start({borderBottom: "2px solid transparent"});


    }, [era, controls]);

    // c
    // {
    //     borderBottom:
    //         era === index + 1 ? '2px solid white' : '2px solid transparent',
    // }

    return (
        <NavbarMaterial className="mx-auto max-w-screen-xl px-4 py-2 md:px-8 md:py-4 bg-black fixed top-0 left-0 z-10">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    Material Tailwind
                </Typography>
                <div className="hidden md:block">{navList}</div>
                <div className="flex items-center gap-x-1">
                <Button variant="text" size="sm" className="hidden md:inline-block">
                    <span>Log In</span>
                </Button>
                <Button
                    variant="gradient"
                    size="sm"
                    className="hidden md:inline-block"
                >
                    <span>Sign in</span>
                </Button>
                </div>
                <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
                >
                {openNav ? (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                    </svg>
                ) : (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    </svg>
                )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                <div className="container mx-auto">
                    {navList}
                {/* <div className="flex items-center gap-x-1">
                    <Button fullWidth variant="text" size="sm" className="">
                    <span>Log In</span>
                    </Button>
                    <Button fullWidth variant="gradient" size="sm" className="">
                    <span>Sign in</span>
                    </Button>
                </div> */}
                </div>
            </MobileNav>
        </NavbarMaterial>
    )

    return (
        <div className={`bg-[#7d7c89] w-full h-20 fixed top-0 z-30 flex items-center justify-between`}>
            <Image
                className='h-14 w-auto mt-2 ml-4'
                src="/logo.png"
                width={500}
                height={282}
                alt="Picture of the author"
            />
            <div className="flex mx-14">
                {eras.map((thisEra : EraInterface, index : number) => (
                    <div key={index}>
                    {era === index + 1 ? 
                        <motion.div
                            className={`cursor-pointer text-white m-4 p-1 box-border`}
                            animate={controls}
                            transition={{ type: 'linear', stiffness: 260, damping: 20, borderBottom: {duration: 0.5}}}
                            //initial={{ borderBottom: '2px solid transparent', x: (index - (era - 1) * 50)}}
                            whileHover={{ scale: 1.05 }}
                        >
                            {eras[index]}
                        </motion.div>
                    :
                        <motion.div
                            className={`cursor-pointer text-white m-4 p-1 box-border`}
                            transition={{ type: 'linear', stiffness: 260, damping: 20, borderBottom: {duration: 0.5}}}
                            initial={{ borderBottom: '2px solid transparent'}}
                            //initial={{ borderBottom: '2px solid transparent' }}
                            animate={controlsInactive}
                            whileHover={{ scale: 1.05 }}
                        >
                            {eras[index]}
                        </motion.div>
                    }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Navbar2;
export { NavHeight };