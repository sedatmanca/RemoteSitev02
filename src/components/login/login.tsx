'use client'

import { 
    Form, 
    Input, 
    Button 
} from "antd"
import { ILoginComponentProps } from "@/types/login/loginComponentProps"
import { 
    KeyIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState } from "react";
import { useRouter } from "next/navigation"

const emailField = "email";
const passwordField = "password";

const Login = ({ 
    translation,
    isResetPassword,
    isResetPasswordMailSent,
    setIsResetPassword,
    setIsResetPasswordMailSent
} : ILoginComponentProps) => {
    const [isUserNotFound, setIsUserNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    
    const supabase = createClientComponentClient();

    const router = useRouter();

    const signIn = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        if(loading) return;

        setLoading(true);
        setIsUserNotFound(false);

        try { 
            await form.validateFields(); 
        } catch { 
            setLoading(false);
            return; 
        }

        const email: string = form.getFieldValue(emailField);
        const password: string = form.getFieldValue(passwordField);
        
        const res = await supabase.auth.signInWithPassword({ email, password });
 
        setLoading(false);
        
        if (res.error){
            setIsUserNotFound(true);
            return;
        }
 
        router.push('/');
        router.refresh();
    }

    return(
        <div className={`duration-200 ease-out transition-all ${isResetPassword ? "opacity-0 absolute lg:absolute z-[-1000]" : "opacity-100 absolute lg:relative"} xxs:w-5/6 w-96 min-w-[224px] max-h-[768px] bg-slate-50/80 backdrop-blur-sm m-0 mb-8 md:ml-24 flex flex-col items-center rounded-md`}>
            <div className="my-5 flex flex-col gap-y-4 items-center w-full h-full pb-3">
                <h1 className="text-2xl pt-8 pb-4 font-semibold">
                    {translation['login-header']}
                </h1>
                {isResetPasswordMailSent && 
                    <span className="text-center text-green-600 px-10">
                        {translation['reset-password-description']}
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
                                }
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserIcon className="w-5 mr-2" />
                                }
                                size="large"
                                className="w-full hover:!border-main-orange focus:!border-main-orange focus:!shadow"
                            />
                        </Form.Item>
                        <Form.Item
                            required
                            name={passwordField}
                            className={isUserNotFound ? 'mb-5' : 'mb-7'}
                            label={<span className="text-base">{translation['password']}</span>}
                            rules={[
                                {
                                    required: true,
                                    message: translation['password-required']
                                }
                            ]}
                        >
                            <Input.Password
                                prefix={
                                    <KeyIcon className="w-5 mr-2" />
                                }
                                size="large"
                                className="w-full hover:!border-main-orange focus:!border-main-orange focus:!shadow"
                            />
                        </Form.Item>
                        {isUserNotFound &&
                            <div className="text-md text-center my-3 animate-shake">
                                <span className="text-red-500">
                                    {translation['invalid-user']}
                                </span>
                            </div>
                        }
                        <Button
                            onClick={(e) => signIn(e)}
                            loading={loading}
                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-5 mb-3 text-sm font-medium text-white shadow-sm hover:bg-slate-700 hover:!border-main-orange hover:!text-main-orange items-center"
                        >
                            {!loading && <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" /> }
                            <span className="self-center">
                                {translation['login']}
                            </span>
                        </Button>
                        <div className={`text-md text-center tracking-wide text-slate-600 flex place-content-center ${!loading ? "hover:text-main-orange duration-150 ease-linear transition-colors cursor-pointer" : ""}`}>
                            <KeyIcon className="w-4 h-4 mt-1 mr-2"/>
                            <span
                                onClick={() => {
                                        if(loading) return;
                                        setIsResetPasswordMailSent(false);
                                        setIsResetPassword(true);
                                    }
                                } 
                                className="underline underline-offset-4"
                            >
                                {translation['reset-your-password']}
                            </span>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;