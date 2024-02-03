'use client'

import Login from "@/components/login/login";
import ResetPassword from "@/components/login/resetPassword";
import { ILoginProps } from "@/types/login/loginProps";
import { useState } from "react";

const Main = ({ 
    lang, 
    translation 
} : ILoginProps) => {
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isResetPasswordMailSent, setIsResetPasswordMailSent] = useState(false);

    return(
        <>
            <Login 
                translation={translation} 
                isResetPassword={isResetPassword}
                isResetPasswordMailSent={isResetPasswordMailSent}
                setIsResetPassword={setIsResetPassword}
                setIsResetPasswordMailSent={setIsResetPasswordMailSent}
            />
            <ResetPassword
                lang={lang}
                translation={translation} 
                isResetPassword={isResetPassword}
                setIsResetPassword={setIsResetPassword}
                setIsResetPasswordMailSent={setIsResetPasswordMailSent}
            />
        </>
    )
}

export default Main;