'use client'

import Image from "next/image"
import background from '#/assets/login-bg.png';
import backgroundSm from '#/assets/login-bg-small.png';
import { useState } from "react";

const Background = () => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return(
        <>
            <Image
                className={`z-minus-2 object-cover transition duration-200 ease-linear ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                src={backgroundSm}
                fill
                alt=""
                quality={100}
                priority
            />   
            <Image
                className={`z-minus-1 object-cover transition duration-200 ease-linear ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                src={background}
                fill
                alt=""
                quality={100}
                onLoad={() => setIsImageLoaded(true)}
            />
        </>
    )
}

export default Background;