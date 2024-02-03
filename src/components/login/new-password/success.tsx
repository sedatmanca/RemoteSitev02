'use client'

import { Button } from "antd";
import { ISuccessComponentProps } from "@/types/login/loginComponentProps";
import { useRouter } from "next/navigation";

const Success = ({
    lang,
    translation,
    isSuccessful
}: ISuccessComponentProps) => {
    const router = useRouter();

    const returnToLoginPage = () => {
        router.push(`/${lang}/login`);
        router.refresh();
    }

    return(
        <div className={`duration-200 ease-out transition-all ${!isSuccessful ? "opacity-0 absolute lg:absolute z-[-1000]" : "opacity-100 absolute lg:relative"} xxs:w-5/6 w-96 min-w-[224px] max-h-[768px] bg-slate-50/80 backdrop-blur-sm m-0 mb-8 md:ml-24 flex flex-col items-center rounded-md`}>
            <div className="my-5 px-10 flex flex-col items-center w-full h-full">
                <h1 className="text-2xl py-4 font-semibold text-center">
                    {translation['reset-password-success']}
                </h1>
                <Button
                    onClick={returnToLoginPage}
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-5 mb-3 text-sm font-medium text-white shadow-sm hover:bg-slate-700 hover:!border-main-orange hover:!text-main-orange items-center"
                >
                    <span className="self-center">
                        {translation['return-to-login']}
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default Success;