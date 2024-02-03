import IPageProps from "@/types/pageProps";
import { Navbar } from "@/components/navbar/navbar";
import Main from "@/components/home/main";
import { getTranslation } from "@/services/translationService";

export default async function Home({ params }: IPageProps){
  const { lang } = params;

  const translation = await getTranslation(lang);

  return (
    <div className="relative w-screen h-screen bg-color-main text-white font-poppins overflow-hidden">
      <div className="wrapper max-h-screen min-h-full flex flex-col">
        <header className="w-full px-4 py-3 sticky top-0 left-0 z-50 bg-color-main">
          <Navbar
            lang={lang}
            translation={translation}
          />
        </header>
          <Main 
            lang={lang}
            translation={translation}
          />
      </div>
    </div>
  );
};