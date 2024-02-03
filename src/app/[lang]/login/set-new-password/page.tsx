import ISetNewPasswordPageProps from "@/types/login/setNewPasswordPageProps";
import { getTranslation } from "@/services/translationService";
import { redirect } from "next/navigation";
import Main from "@/components/login/new-password/main";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ResetPasswordPage({
  params,
  searchParams
}: ISetNewPasswordPageProps){
  const { lang } = params;

  if(!searchParams?.code){
    redirect(`/${lang}/login`);
  }
  
  const supabase = createServerComponentClient({ cookies });

  try{
    const { data } = await supabase.auth.exchangeCodeForSession(searchParams.code);
    
    if(!data.user?.email){
      throw new Error("E-mail not found");
    }
 
    const translation = await getTranslation(lang);

    return (
      <Main
        lang={lang}
        translation={translation.login}
        userData={data.user}
        sessionData={data.session}
      />
    );
  }
  catch{
    redirect(`/${lang}/login`);
  }
};