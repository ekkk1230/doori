'use client'

import { useEffect, useState } from "react";

interface SplashScreenProps {
    isLoadingData: boolean;
    onFinish: () => void;
}

export default function SplashScreen() {
    const [minTimePassed, setMinTimePassed] = useState(false);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimePassed(true);
        }, 1500);

        return () => clearTimeout(timer);
    })

    return (
        
    )
}
