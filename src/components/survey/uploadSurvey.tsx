'use client'

import { useState } from "react";
import { 
    Button, 
    Form, 
    Select, 
    Steps, 
    Modal,
    Progress,
    notification
} from "antd";

import { 
  SurveyDataTypes, 
  SurveyImage,
  SurveyFile,
  SurveyDetails, 
  SurveySummary 
} from "@/components/survey/subcomponents";

import ISurveyOptions from "@/types/survey/surveyOptions";

import { 
  IUploadSurveyProps, 
  ISelectProject, 
  ISurveyStep 
} from "@/types/survey/uploadSurveyProps";

import dayjs from "dayjs";

import Image from "next/image";
import { SurveyDataType } from "@/types/survey/surveyDataType";

const UploadSurvey = ({
  lang,
  translation,
  isModalOpen,
  setIsModalOpen
}: IUploadSurveyProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnProjectSelectionPage, setIsOnProjectSelectionPage] = useState(true);
  const [surveyOptions, setSurveyOptions] = useState<ISurveyOptions>();

  const [form] = Form.useForm();

  const projects = [
    {
      id: 1,
      name: "Kalyon",
      startDate: new Date(2022, 11, 20),
      endDate: new Date(2022, 11, 20),
      coordinates: {
        lat: 41.0166, 
        lng: 29.1970
      }
    },    
    {
      id: 2,
      name: "Limak",
      startDate: new Date(2023, 3, 7),
      endDate: new Date(2023, 3, 7),
      coordinates: {
        lat: 41.0153, 
        lng: 29.1999
      }
    }
  ];

  const projectOptions: ISelectProject[] = projects.map((p) => {
    return {
      value: p.id,
      label: p.name
    }
  });

  const projectSelectionRequired = translation['project-selection-required'];

  const surveyDataTypes: ISurveyStep = {
    title: translation['data-type'],
    formLayout: "vertical",
    content: (
      <SurveyDataTypes
        translation={translation}
        lang={lang}
        surveyOptions={surveyOptions!}
        setSurveyOptions={setSurveyOptions}
      />
    )
  };

  const surveyImage: ISurveyStep = {
    title: translation['image'],
    formLayout: "vertical",
    content: (
      <SurveyImage
        translation={translation}
        lang={lang}
        surveyOptions={surveyOptions!}
        setSurveyOptions={setSurveyOptions}
      />
    )
  };
  
  const surveyFile: ISurveyStep = {
    title: translation['file'],
    formLayout: "vertical",
    content: (
      <SurveyFile
        translation={translation}
        lang={lang}
        surveyOptions={surveyOptions!}
        setSurveyOptions={setSurveyOptions}
      />
    )
  };

  const surveyDetails: ISurveyStep = {
    title: translation['details'],
    formLayout: "vertical",
    content: (
      <SurveyDetails
        translation={translation}
        lang={lang}
        surveyOptions={surveyOptions!}
        setSurveyOptions={setSurveyOptions}
      />
    )
  };

  const surveySummary: ISurveyStep = {
    title: translation['summary'],
    formLayout: "horizontal",
    content: (
      <SurveySummary
        translation={translation}
        surveyOptions={surveyOptions!}
      />
    )
  };

  const surveySteps = [surveyDataTypes, surveyImage, surveyDetails, surveySummary];
  const ppdSteps = [surveyDataTypes, surveyFile];
  const designSteps = [surveyDataTypes];

  const mapStepItems = (steps: ISurveyStep[]) => {
    return steps.map((item) => ({
      title: item.title
    }));
  };

  const getSteps = () => {
    switch(surveyOptions?.dataType){
      case undefined:
      case SurveyDataType.Survey:
        return surveySteps;
      case SurveyDataType.Design:
        return designSteps;
      default:
        return ppdSteps;
    }
  };

  const BottomNotification = () => {
    return (
      <div className="text-center">
        <div className="flex justify-center">
          <Image
            src="/assets/svg/tik.svg" 
            alt=""
            width={42}
            height={42} 
          />
        </div>
        <div className="py-3 grid">
          <span className="font-bold">
            {translation['upload-completed']}
          </span>
          <span>
            {`${surveyOptions?.name!} ${translation['uploaded']}`}
          </span>
        </div>
        <div className="flex justify-center">
          <Button 
            onClick={() => notification.destroy()}
            className="min-w-44 grow text-black px-4 py-1 mx-2 rounded hover:!border-main-orange hover:!text-main-orange"
          >
            {translation['close']}
          </Button>
          <Button
            className="min-w-44 grow bg-main-orange text-white px-4 py-1 mx-2 rounded hover:bg-main-deep-orange disable-text-hover border-none"
          >
            {translation['open-project']}
          </Button>
        </div>
      </div>
    );
  };

  const TopNotification = () => {
    return (
      <div>
        <div className="py-2 grid">
          <Progress
            strokeColor="#FFB800"
            percent={100} 
          />
          <span className="font-bold">
            1 {translation['image-uploading']}
          </span>
          <span>your-file-here.PDF</span>
        </div>
        <div className="py-2 grid">
          <Progress
            strokeColor="#FFB800"
            percent={70} 
          />
          <span className="font-bold">
            2 {translation['file-processing']}
          </span>
          <span>document-name.PDF</span>
          <span>image-name-goes-here.png</span>
        </div>
      </div>
    );
  };

  //TODO: Önce alttaki notifikasyon açılmalı, progress barı dolduktan sonra üstteki notifikasyon açılmalı
  const openNotification = () => {
    notification.open({
      message: (<span className="font-bold">{translation['uploads']}</span>),
      description: <TopNotification/>,
      duration: null,
    });

    notification.open({
      message: '',
      description: <BottomNotification/>,
      duration: 30,
      placement: 'bottomRight',
    });
  }

  const closeModal = () => {
    setIsOnProjectSelectionPage(true);
    setCurrentStep(0);
    setSurveyOptions(undefined);
    setIsModalOpen(false);
  }

  const previousStep = () => {
    if(currentStep === 0){
      setSurveyOptions(undefined);
      setIsOnProjectSelectionPage(true);
      form.setFieldValue('project-selection', undefined);
    }
    else{
      setCurrentStep(currentStep - 1);
    }
  }

  const nextStep = async () => {
    try{
      if(currentStep === getSteps().length - 1) {
        closeModal();
        openNotification();
        return;
      } 

      await form.validateFields();

      if(isOnProjectSelectionPage){
        setIsOnProjectSelectionPage(false);
      }
      else{
        setCurrentStep(currentStep + 1);
      }
    }
    catch{
      return;
    }
  }

  return(
    <Modal
      centered
      open={isModalOpen}
      width={1000}
      onOk={closeModal}
      onCancel={() => setIsModalOpen(false)}
      destroyOnClose
      closable
      footer={
        <div className="inline-flex gap-x-2">
          {
            !isOnProjectSelectionPage &&
            <Button 
                onClick={previousStep}
                className="hover:!border-main-orange hover:!text-main-orange px-3 py-1"
            >
                {translation['previous']}
            </Button>
          }
            <Button 
                onClick={nextStep}
                className="hover:!border-main-orange hover:!text-main-orange px-3 py-1"
            >
                {getSteps.length - 1 === currentStep ? translation['start'] : translation['next']}
            </Button>
        </div>
      }
    >
      <div className="pt-5">
        <Form 
          form={form} 
          layout={getSteps()[currentStep].formLayout} 
          autoComplete="off"
          labelAlign="left"
          labelCol={{span: 7}}
          fields={[
            { name: ['project-selection'], value: surveyOptions?.project?.id },
            { name: ['data-type'], value: surveyOptions?.dataType },
            { name: ['survey-name'], value: surveyOptions?.name },
            { name: ['survey-date'], value: surveyOptions?.date && dayjs(surveyOptions.date) }
          ]}
        >
        {
          isOnProjectSelectionPage ? ( 
            <div className="flex flex-col items-center py-20">
              <span className="mb-2 font-medium">
                {translation['choose-site']}
              </span>
              <Form.Item
                name="project-selection"
                className="w-2/5"
                rules={[{ required: true, message: projectSelectionRequired }]}
              >
                <Select
                  className="w-2/5 [&>div:hover]:!border-main-orange [&>div:focus]:!border-main-orange [&>div:focus]:!shadow [&>div:focus-within]:!border-main-orange [&>div:focus-within]:!shadow"
                  size="large"
                  showSearch
                  placeholder={translation['search-sites']}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(first, second) =>
                    (first?.label ?? '').toLowerCase().localeCompare((second?.label ?? '').toLowerCase())
                  }
                  options={projectOptions}
                  onChange={(e) => setSurveyOptions({
                    ...surveyOptions,
                    project: projects.find((p) => p.id === e)
                  })}
                />
              </Form.Item>
            </div> 
          ) : (
            <div className="w-full gap-x-4">
              <Steps
                labelPlacement="vertical"
                current={currentStep}
                items={mapStepItems(getSteps())}
                direction="horizontal"
                className="w-full place-content-center"
              />
              <div className="flex flex-col px-4 justify-between w-full"> 
                {getSteps()[currentStep].content}
              </div>
            </div>
          )
        }
        </Form>
      </div>
    </Modal>
  )
};

export default UploadSurvey;
