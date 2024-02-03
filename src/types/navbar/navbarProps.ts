import { Locale } from "@/i18n/settings";
import type { TTranslation } from "@/services/translationService";

export interface INavbarProps{
    lang: Locale;
    translation: TTranslation;
    showProjectFilters?: boolean;
}

export interface INavbarDropdownProps{
    translation: TTranslation['navbar'];
    path?: string;
}

export interface ILangugageDropdownProps extends INavbarDropdownProps{
    className?: string;
}

export interface IProfileDropdownProps extends INavbarDropdownProps{
    lang: string;
}

export interface INavbarFilterProps extends INavbarProps{
    
}