'use client';
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        VANTA: any;
        THREE: any;
    }
}

export default function VantaBackground({ effect = 'WAVES' }: { effect?: 'WAVES' | 'DOTS' }) {
    const vantaRef = useRef<HTMLDivElement | null>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (
                window.THREE &&
                window.VANTA &&
                window.VANTA[effect] &&
                vantaRef.current &&
                !vantaEffect
            ) {
                const instance = window.VANTA[effect]({
                    el: vantaRef.current,
                    THREE: window.THREE,
                    mouseControls: true,
                    touchControls: true,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x6b21a8,
                    backgroundColor: 0x000000,
                });
                setVantaEffect(instance);
                clearInterval(interval);
            }
        }, 200);

        return () => {
            if (vantaEffect) vantaEffect.destroy();
            clearInterval(interval);
        };
    }, [effect, vantaEffect]);

    return (
        <>
            {/* Load scripts only once */}
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js" strategy="beforeInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js" strategy="afterInteractive" />
            <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js" strategy="afterInteractive" />
            <div ref={vantaRef} className="absolute inset-0 -z-10" />
        </>
    );
}
