'use client'

import { Form, Input, Button } from "antd"
import { ISetNewPasswordProps } from "@/types/login/loginComponentProps"
import { KeyIcon } from "@heroicons/react/24/outline"
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const passwordField = "password";
const passwordRetypeField = "password-retype";

const SetNewPassword = ({
    translation,
    isSuccessful,
    setIsSuccessful,
    userData,
    sessionData
}: ISetNewPasswordProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<'password-length-error' | 'generic-error'>();
    const [form] = Form.useForm();

    const supabase = createClientComponentClient();
    
    const setPassword = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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

        const password: string = form.getFieldValue(passwordField);

        try{
            await supabase.auth.setSession({ access_token: sessionData.access_token, refresh_token: sessionData.refresh_token });
            
            const { data, error } = await supabase.auth.updateUser({ email: userData.email, password: password });

            if(error){
                switch(error.status){
                    case 422:
                        setError('password-length-error');
                        break;
                    default:
                        setError('generic-error');
                        break;
                }
                setLoading(false);
                return;
            }

            setIsSuccessful(true);
        }
        catch{
            setError('generic-error');
        }

        setLoading(false);
    }

    return(
        <div className={`duration-200 ease-out transition-all ${isSuccessful ? "opacity-0 absolute lg:absolute z-[-1000]" : "opacity-100 absolute lg:relative"} xxs:w-5/6 w-96 min-w-[224px] max-h-[768px] bg-slate-50/80 backdrop-blur-sm m-0 mb-8 md:ml-24 flex flex-col items-center rounded-md`}>
            <div className="my-5 flex flex-col gap-y-4 items-center w-full h-full">
                <h1 className="text-2xl py-4 font-semibold">
                    {translation['set-new-password']}
                </h1>
                {error && 
                    <span className="px-10 text-red-600">
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
                            name={passwordField}
                            className="mb-8"
                            label={<span className="text-base">{translation['password']}</span>}
                            rules={[
                                {
                                    required: true,
                                    message: translation['password-required'],
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                className="w-full"
                            />
                        </Form.Item>
                        <Form.Item
                            required
                            name={passwordRetypeField}
                            className="mb-8"
                            label={<span className="text-base">{translation['repeat-password']}</span>}
                            rules={[
                                {
                                    required: true,
                                    message: translation['repeat-password-required'],
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value){
                                        if(!value || getFieldValue(passwordField) === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error(translation['password-match-error']));
                                    }
                                })
                            ]}
                        >
                            <Input.Password
                                size="large"
                                className="w-full"
                            />
                        </Form.Item>
                        <Button
                            onClick={(e) => setPassword(e)}
                            loading={loading}
                            disabled={isSuccessful}
                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-5 mb-3 text-sm font-medium text-white shadow-sm hover:bg-slate-700 hover:!border-main-orange hover:!text-main-orange items-center"
                        >
                            {!loading && <KeyIcon className="w-5 h-5 mr-2"/>}
                            <span className="self-center">
                                {translation['set-new-password']}
                            </span>
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default SetNewPassword;