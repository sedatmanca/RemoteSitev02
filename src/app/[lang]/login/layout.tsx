import { Locale } from "@/i18n/settings"

import Image from "next/image";
import logo from '#/assets/logo.png';
import Background from "@/components/login/background";

export default async function LoginLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: {
        lang: Locale
    }
}){
    return(
        <div className="w-full shadow-bg h-screen justify-center md:justify-start bg-cover bg-no-repeat bg-center flex items-center">
            <Background/>
            {children}
            <Image
                src={logo}
                width={300}
                height={150}
                alt="Remote Site"
                className="self-end mb-[50px] ml-auto mr-auto md:mr-[150px] z-0"
            />
        </div>
    )
}