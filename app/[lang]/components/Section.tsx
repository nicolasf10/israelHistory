"use client"

import React, { useContext, useEffect, useRef, useState } from 'react';
import SectionContext, { Context } from '../context/SectionContext';
import { SectionInterface } from './MainSection';
import { MotionValue, motion, useAnimation } from 'framer-motion';


const Section = ({data, maxId, scrollProgress} : {data: SectionInterface, maxId: number, scrollProgress: MotionValue<number>}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInViewport, setIsInViewport] = useState<boolean>(false);
    const { section, era, setState } = useContext(Context);
    const controls = useAnimation();
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const checkIsInViewport = () => {
      if (!elementRef.current) return;

      const sectionElement = sectionRef.current;
      const sectionRect = (sectionElement as HTMLDivElement).getBoundingClientRect();

      const element = elementRef.current;
      const elementRect = element.getBoundingClientRect();

      // Calculate the threshold (50px from the bottom)
      const threshold = 500;
      const lg_threshold = 100;


      // Check if the element is partially in view (except the bottom 50px)
      // if (data.id === 1) console.log(scrollProgress.get())
      if (
          ((((elementRect.bottom + 100 <= window.innerHeight + (windowDimensions.width <= 768 ? threshold : lg_threshold)) &&
              sectionRect.y <= window.innerHeight / 2 + (windowDimensions.width <= 768 ? threshold : lg_threshold))
            ||
            (data.id === maxId && sectionRect.bottom <= window.innerHeight + 100))
          &&
          (data.id != 200 || scrollProgress.get() > 0.04)
          )
          ||
          (data.id == 1 && scrollProgress.get() <= 0.04)
      ) {
        setState({
            section: data.id,
            era: data.era
        });
        //setIsInViewport(true);
      } else {
        //setIsInViewport(false);
      }
    };

    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height
      };
    }

    function handleResize() {
      let dimensions = getWindowDimensions();
      setWindowDimensions(dimensions);

      if (innerWidth <= 768 && sectionRef.current && data.id != maxId)
        sectionRef.current.style.marginBottom = dimensions.height.toString() +  'px';
      else if (sectionRef.current) {
          sectionRef.current.style.marginBottom = 'auto';
      }
      }

    useEffect(() => {
      checkIsInViewport(); // Check on initial load

      // Attach an event listener to check when the user scrolls
      window.addEventListener('scroll', checkIsInViewport);

      // Trigger the check when the component is mounted
      checkIsInViewport();

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        window.removeEventListener('resize', handleResize);
        // Clean up the event listener when the component unmounts
        window.removeEventListener('scroll', checkIsInViewport);
      };
    }, []);

    useEffect(() => {
        if (section == data.id) {
          controls.start({ opacity: 1, y: 0, x: 0 });
        } else {
          controls.start({ opacity: 0.1, y: 30, x: -30 });
        }
      }, [section, controls]);


    return (
        <motion.div
            initial={{ opacity: 0, y: 30, x: -30 }}
            ref={sectionRef}
            animate={controls}
            className={`bg-white md:min-h-[50vh] w-full md:py-10 px-14 relative text-[#272727] md:mb-auto mb-[${windowDimensions.height}px] relative md:mb-auto z-30`}
            transition={{ type: 'linear', stiffness: 260, damping: 20, x: {duration: 0.5}, y: {duration: 0.5} }}
        >
            <motion.div className='md:sticky md:top-12 pt-12 pb-4 z-5 relative gradient-bottom'>
                <h3 className='font-libre text-xl font-bold mb-6 inline border-b-2 border-black underline-offset-2'>{data.date}</h3>
                <h1 className='font-libre font-bold mt-7 text-3xl mb-4'>{data.title}</h1>
            </motion.div>
            {
                data.content.map((paragraph : string, index : number) => {
                    return (
                        index == 0 ?
                            <p ref={elementRef} key={`paragraph-${index}`} className='font-roboto'>{paragraph}<br/><br/></p>
                        :
                        <p key={`paragraph-${index}`} className='font-roboto'>{paragraph}<br/><br/></p>
                    )
                })
            }
      </motion.div>
    );
  };

export default Section;