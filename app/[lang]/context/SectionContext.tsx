"use client"

import React, { useState, createContext, useEffect } from 'react';

export interface State {
    era: number,
    section: number;
}

interface SectionState extends State {
    setState: React.Dispatch<React.SetStateAction<State>>
}

export const Context = createContext<SectionState>({
    section: 1,
    era: 1,
    setState: () => {}
});

export default function SectionContext({children}: {children: React.ReactNode}) {
    const [state, setState] = useState<State>({
        section: 1,
        era: 1
    });

    return (
        <Context.Provider
            value={{
                ...state,
                setState
            }}
        >
            {children}
        </Context.Provider>
    )
}