"use client";

import { useEffect } from "react";
import { clarity } from "react-microsoft-clarity";

export default function ClientApplication({ children}: Readonly<{children: React.ReactNode;}>) 
{
    useEffect(() => 
    {
        clarity.init("ogsmm2i2lg")
    });

    return children;
}