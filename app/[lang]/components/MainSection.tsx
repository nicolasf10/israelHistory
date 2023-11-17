"use client"

import React, { useEffect } from 'react'
import { motion, useAnimation, useScroll } from 'framer-motion'
import Section from './Section'
import NativeMap from './NativeMap'


export interface SectionInterface {
    era: number,
    id: number,
    title: string,
    content: string[],
    date: string
}
  
export interface EraInterface {
    era: number,
    sections: SectionInterface[]
}

export default function MainSection({sections: sections, lang : lang, accessKey : accessKey} : {sections: any, lang: string, accessKey : string}) {

    const { scrollYProgress } = useScroll();
    // const [allData, setAllData] = useState(require('./mapData.json'));

    useEffect(() => {
        console.log(scrollYProgress)
    }, [scrollYProgress])

    return (
        <div className='relative top-20 left-0'>
            <motion.div
                className="progress-bar z-50"
                style={{ scaleY: scrollYProgress }}
            />
            <main className='w-screen relative'>
                <div className="min-h-screen md:w-2/5 w-screen relative z-10 top-0">
                    {sections.map((era : EraInterface, index : number) => {
                    return (
                        <div id={`era-${era.era}`} key={index}>
                            {era.sections.map((section, indexSection) => {
                                return (
                                    <Section scrollProgress={scrollYProgress} maxId={12} data={section} key={`section-${indexSection}`} />
                                )
                            })}
                            {/* <hr></hr> */}
                        </div>
                    )
                    })}
                </div>
                <NativeMap accessKey={accessKey} lang={lang}/>
            </main>
        </div>
    )
}
