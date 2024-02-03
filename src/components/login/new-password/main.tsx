'use client'

import SetNewPassword from "@/components/login/new-password/setNewPassword";
import Success from "@/components/login/new-password/success";
import { ISetNewPasswordProps } from "@/types/login/setNewPasswordProps";
import { useState } from "react";

const Main = ({ 
    lang, 
    translation,
    userData,
    sessionData
} : ISetNewPasswordProps) => {
    const [isSuccessful, setIsSuccessful] = useState(false);

    return(
        <>
            <SetNewPassword 
                translation={translation} 
                isSuccessful={isSuccessful}
                setIsSuccessful={setIsSuccessful}
                userData={userData}
                sessionData={sessionData}
            />
            <Success
                lang={lang}
                translation={translation}
                isSuccessful={isSuccessful}
            />
        </>
    )
}

export default Main;