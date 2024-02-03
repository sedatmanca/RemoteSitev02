import { TTranslation } from "@/services/translationService";
import { Session, SupabaseClient, User } from "@supabase/supabase-js";

interface ILoginCoreComponentProps {
    translation: TTranslation['login'];
    isResetPassword: boolean;
    setIsResetPassword: (e: boolean) => void;
    setIsResetPasswordMailSent: (e: boolean) => void;
}

interface ILoginComponentProps extends ILoginCoreComponentProps {
    isResetPasswordMailSent: boolean;
}

interface IResetPasswordProps extends ILoginCoreComponentProps {
    lang: string;
}

interface ISetNewPasswordCoreProps {
    translation: TTranslation['login'];
    isSuccessful: boolean;   
}

interface ISetNewPasswordProps extends ISetNewPasswordCoreProps{
    setIsSuccessful: (e: boolean) => void;
    userData: User;
    sessionData: Session;
}

interface ISuccessComponentProps extends ISetNewPasswordCoreProps{
    lang: string;
}

export type {
    ILoginComponentProps,
    IResetPasswordProps,
    ISetNewPasswordProps,
    ISuccessComponentProps
}