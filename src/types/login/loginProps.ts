import { TTranslation } from "@/services/translationService";

export interface ILoginProps {
    lang: string;
    translation: TTranslation['login'];
}