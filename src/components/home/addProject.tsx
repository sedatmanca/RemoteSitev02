'use client'

import { useState } from "react";
import { 
    Button, 
    Form, 
    Steps,
    Modal, 
} from "antd";
import { IAddProjectProps } from "@/types/home/addProjectProps";
import {
    SiteInfo,
    Settings,
    UserInfo
} from "@/components/home/add";
import { getCategoryWithSubCategory } from "@/services/categoryService";
import { IProject } from "@/types/home/project";
import dayjs from 'dayjs';
import { PageState } from "@/types/home/pageState";

const AddProject = ({
    translation,
    lang,
    project,
    setProject,
    setPageState,
    addNewProject,
    pageState
}: IAddProjectProps) => {
    const [form] = Form.useForm();
    
    const [currentStep, setCurrentStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const existingUsers = [
        { value: "sedat.manca@arventek.com" },
        { value: "merve.manca@arventek.com" },
        { value: "melih.sahaner@arventek.com" },
        { value: "tayfun.top@arventek.com" },
    ];

    const steps = [
        {
            title: translation.projects['site-info'],
            content: <SiteInfo 
                        translation={translation.projects}
                        lang={lang}
                        project={project}
                        setProject={setProject}
                    />,
            rules: {
                labelCol: {
                    xs: { span: 7 },
                    sm: { span: 7 },
                    md: { span: 7 },
                    lg: { span: 7 },
                    xl: { span: 7 },
                    xxl: { span: 5 } 
                },
                wrapperCol: { span: 18 }
            }
        },
        {
            title: translation.projects['settings'],
            content: <Settings
                        translation={translation.units}
                        project={project}
                        setProject={setProject}
                    />,
            rules: {
                labelCol: { span: 5 },
                wrapperCol: { span: 18 }
            }
        },
        {
            title: translation.projects['user-info'],
            content: <UserInfo 
                translation={translation.user}
                project={project}
                setProject={setProject}
                existingUsers={existingUsers}
            />,
            rules: {
                labelCol: undefined,
                wrapperCol: undefined
            }
        },
    ];

    const stepItems = steps.map((item, index) => ({
        key: index,
        title: item.title
    }));

    const getCategoryString = (project: IProject | undefined) => {
        if(project?.category === undefined && project?.subCategory === undefined) return "";
        
        const { category, subCategory } = getCategoryWithSubCategory(project?.category!, project?.subCategory!);
        return `${translation.projects[category!]} / ${translation.projects[subCategory!]}`;
    }

    const nextStep = async () => {
        try{
            await form.validateFields();
            setCurrentStep(currentStep + 1);
        }
        catch{
            return null;
        }
    }

    const checkUnregisteredUsers = () => {
        let userList: string[] = [];
        
        const existingUserList = existingUsers.map((user) => {
            return user.value
        });

        project?.users?.forEach((user) => {
            !existingUserList.includes(user.email) && userList.push(user.email);
        })

        return userList;
    }

    const finishAddingProject = () => {
        addNewProject(project!);
        setPageState(PageState.Map);
        setProject(undefined);
        setCurrentStep(0);
    }

    return (
        <div className={`${pageState === PageState.AddProject ? "grow shrink opacity-100 visible sidebar-collapse-min:w-[75%] sidebar-collapse-max:w-auto" : "opacity-0 invisible w-0 h-0"} bg-white overflow-auto duration-200 ease-out transition-opacity z-10`}>
            <header className="sticky top-0 z-10 p-2 bg-black h-fit w-full">
                <span>
                    {translation.projects['add-new-project']}
                </span>
            </header>
            <div className="mt-3 h-[90%] sidebar-collapse-max:p-3 flex flex-col">
                <Steps
                    current={currentStep}
                    items={stepItems}
                    direction="horizontal"
                    className="sidebar-collapse-max:items-center max-w-xl w-full mx-auto"    
                />
                <div className="sidebar-collapse-max:pl-3 flex flex-col justify-between mt-3 ant-sm:h-auto h-inherit pl-3 grow">
                    <Form 
                        form={form} 
                        layout="horizontal" 
                        autoComplete="off"
                        className="flex flex-col"
                        labelAlign="left"
                        labelCol={steps[currentStep].rules.labelCol}
                        wrapperCol={steps[currentStep].rules.wrapperCol}
                        fields={[
                            { name: ['name'], value: project?.name },
                            { name: ['category'], value: getCategoryString(project) },
                            { name: ['latitude'], value: project?.coordinates?.lat },     
                            { name: ['longitude'], value: project?.coordinates?.lng },
                            { name: ['description'], value: project?.description },
                            { name: ['start-date'], value: project?.startDate && dayjs(project.startDate) },
                            { name: ['end-date'], value: project?.endDate && dayjs(project.endDate) },
                            { name: ['distance-unit'], value: project?.distanceUnit },
                            { name: ['volume-unit'], value: project?.volumeUnit },
                            { name: ['users'], value: project?.users}
                        ]}
                    >
                        <div className="mx-48 m-low:mx-1 m-medium:mx-12 m-high:mx-36">
                            {steps[currentStep].content}
                        </div>
                    </Form>
                    <div className="ant-sm:py-5 ant-sm:flex ant-sm:flex-col ant-sm:mx-0 ant-sm:self-auto bottom-0 inline-flex self-end mx-56 gap-2 m-medium:mx-12 m-high:mx-36">
                        {currentStep > 0 && 
                            <Button 
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="hover:!border-main-orange hover:!text-main-orange"
                            >
                                {translation.projects['previous']}
                            </Button>
                        }
                        {currentStep < steps.length - 1 && 
                            <Button 
                                onClick={() => nextStep()}
                                className="hover:!border-main-orange hover:!text-main-orange"
                            >
                                {translation.projects['next']}
                            </Button>
                        }
                        {currentStep === steps.length - 1 && 
                            <Button
                                onClick={() => checkUnregisteredUsers().length > 0 ? setIsModalOpen(true) : finishAddingProject() }
                                className="ant-sm:grow ant-sm:w-full self-center text-white bg-main-orange hover:bg-main-deep-orange disable-text-hover border-none inline-flex items-center place-content-center"
                            >
                                {translation.projects['add-project']}
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <Modal
                title={translation.projects['invite-user-title-message']}
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                centered
                keyboard
                closable
                footer={
                    <div className="flex justify-center gap-x-2">
                        <Button 
                            onClick={() => setIsModalOpen(false)}
                            className="bg-main-white text-black px-4 py-1 mx-2 focus:ring-4 focus:ring-slate-100 hover:bg-slate-100 border-2 border-slate-400 rounded w-36"
                        >
                            {translation.projects['cancel']}
                        </Button>
                        <Button 
                            onClick={() => finishAddingProject()}
                            className="bg-main-orange text-white px-4 py-1 mx-2 rounded focus:ring-4 focus:ring-main-orange/20 hover:bg-main-orange/90 w-36"
                        >
                            {translation.projects['send-email']}
                        </Button>
                    </div>
                }
                onCancel={() => setIsModalOpen(false)}
                wrapClassName="drop-shadow-xl"
                width={550}
            >
                <div className="my-5 pt-2 pb-10 border-b-2">
                    <span className="font-medium">
                        {translation.projects['invitation-message']}
                    </span>
                    {checkUnregisteredUsers().map((user, index) => {
                        return(
                            <li
                                key={index}
                                className="font-bold"
                            >
                                {user}
                            </li>
                        )
                    })}
                </div>
            </Modal>
        </div>
    )
}

export default AddProject;