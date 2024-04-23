"use client"

import React, { createContext, ReactElement } from "react";
import PermalinkProviderData from "../../YachtsList/types/PermalinkProviderData";

export const PermalinkContext = createContext<PermalinkProviderData | null>(null);

interface PermalinkProviderProps {
    children: ReactElement | ReactElement[];
    value: PermalinkProviderData;
}

export default function PermalinkProvider({ children, value }: PermalinkProviderProps) {
    return (
        <PermalinkContext.Provider value={value}>
            {children}
        </PermalinkContext.Provider>
    )
}

