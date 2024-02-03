import IPageProps from "@/types/pageProps";

export default interface ISetNewPasswordPageProps extends IPageProps{
    searchParams?: {
        code: string;
        redirectUrl: string;
    }
}