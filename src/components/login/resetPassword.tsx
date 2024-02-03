'use client'

import { Form, Input, Button } from "antd"
import { IResetPasswordProps } from "@/types/login/loginComponentProps"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { 
    UserIcon,
    KeyIcon
} from "@heroicons/react/24/outline"
import { useState } from "react";
import { getAbsoluteUrl } from "@/services/urlService"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"

const emailField = "email";

const ResetPassword = ({
    lang,
    translation,
    isResetPassword,
    setIsResetPassword,
    setIsResetPasswordMailSent
}: IResetPasswordProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<'sixty-second-error' | 'generic-error'>();
    const [form] = Form.useForm();
    
    const supabase = createClientComponentClient();

    const sendResetPasswordEmail = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        if(loading) return;

        setLoading(true);
        setError(undefined);
        
        try { 
            await form.validateFields();
        } catch {
            setLoading(false);
            return;
        }

        const url = getAbsoluteUrl();
        const email: string = form.getFieldValue(emailField);
        
        const res = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${url}/${lang}/login/set-new-password`
        });

        if(!res.error){
            setIsResetPasswordMailSent(true);
            setIsResetPassword(false);
        }
        else{
            switch(res.error.status){
                case 429:
                    setError('sixty-second-error');
                    break;
                default:
                    setError('generic-error');
                    break;
            }
        }

        setLoading(false);
    }

    return(
        <div className={`duration-200 ease-out transition-all ${!isResetPassword ? "opacity-0 absolute lg:absolute z-[-1000]" : "opacity-100 absolute lg:relative"} xxs:w-5/6 w-96 min-w-[224px] max-h-[768px] bg-slate-50/80 backdrop-blur-sm m-0 mb-8 md:ml-24 flex flex-col items-center rounded-md`}>
            <div className="my-5 flex flex-col gap-y-4 items-center w-full h-full">
                <div className="inline-grid grid-cols-5 w-full">
                    <ArrowLeftIcon 
                        className={`w-7 h-7 self-start ml-5 mt-5 ${!loading ? "cursor-pointer hover:text-main-orange duration-150 ease-linear transition-colors" : ""}`}
                        onClick={() => !loading && setIsResetPassword(false)}
                    />
                    <h1 className="text-2xl py-4 font-semibold col-span-4 ml-auto mr-[27%]">
                        {translation['reset-password']}
                    </h1>
                </div>
                {error && 
                    <span className="text-center px-10 text-red-600">
                        {translation[error]}
                    </span>
                }
                <div className="w-[75%]">
                    <Form
                        form={form}
                        layout="vertical"
                        autoComplete="on"
                        className="mt-2"
                        requiredMark={false}
                    >
                        <Form.Item
                            required
                            name={emailField}
                            className="mb-8"
                            label={<span className="text-base">{translation['email']}</span>}
                            rules={[
                                {
                                    required: true,
                                    message: translation['email-required'],
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserIcon className="w-5 mr-2" />}
                                size="large"
                                className="w-full"
                            />
                        </Form.Item>
                        <Button
                            onClick={(e) => sendResetPasswordEmail(e)}
                            loading={loading} 
                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-5 mb-3 text-sm font-medium text-white shadow-sm hover:bg-slate-700 hover:!border-main-orange hover:!text-main-orange items-center"
                        >
                            {!loading && <KeyIcon className="w-5 h-5 mr-2"/>}
                            <span className="self-center">
                                {translation['reset-password']}
                            </span>
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;