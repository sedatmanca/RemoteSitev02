import IPageProps from "@/types/pageProps";
import { getTranslation } from "@/services/translationService";

import LoginLanguageSelection from "@/components/login/loginLanguageSelection";
import Main from "@/components/login/main";

export default async function LoginPage({params}: IPageProps){
  const { lang } = params;
  
  const translation = await getTranslation(lang);

  return (
    <>
      <Main
        lang={lang}
        translation={translation.login}
      />
      <LoginLanguageSelection
        translation={translation.navbar}
        path={`/${lang}/login`}
      />
    </>
  );
};