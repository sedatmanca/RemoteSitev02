import { TTranslation } from "@/services/translationService";
import { Session, User } from "@supabase/supabase-js";

export interface ISetNewPasswordProps {
    lang: string;
    translation: TTranslation['login'];
    userData: User;
    sessionData: Session;
}