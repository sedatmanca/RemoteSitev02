import Dragger from "antd/es/upload/Dragger";
import { Button, Checkbox } from "antd";
import Image from "next/image";
import { IUploadImageComponentProps } from "@/types/survey/uploadImage";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";

const SurveyImage = ({
    translation,
    lang,
    surveyOptions,
    setSurveyOptions
}: IUploadImageComponentProps) => {
  return (
    <div className="grid grid-cols-12">
        <div className="col-span-6 p-4 flex flex-col justify-between">
            <Dragger
                className="overflow-y-auto h-64"
                accept=".jpg,.jpeg,.png,.tiff"
                multiple
            >
                <p className="ant-upload-drag-icon">
                    <Image 
                        className="inline" 
                        src="/assets/svg/upload-icon.svg"
                        alt="" 
                        width={47}
                        height={43}
                    />
                </p>
                <p className="ant-upload-text font-semibold px-10 py-2">
                    {translation['drag-and-drop']}&nbsp;<span className="text-main-orange underline">{translation['browse']}</span>
                </p>
                <p className="ant-upload-hint">
                    {translation['supported-formats']}: JPEG, JPG, PNG, TIFF
                </p>
            </Dragger>
            <Button
                className="w-full px-4 py-2 rounded h-auto self-center text-white bg-main-orange hover:bg-main-deep-orange disable-text-hover border-none inline-flex items-center place-content-center"
            >
            <DocumentArrowUpIcon className="w-6 h-6 mr-1" />
                {translation['upload-files'].toLocaleUpperCase(lang)}
            </Button>
        </div>
        <div className="flex flex-col col-span-6 p-4">
            <Image 
                src="/assets/rectangle.png" 
                alt=""
                width={380}
                height={265}
            />
            <div className="mt-4">
                <Checkbox>
                    {translation['show-survey-area']}
                </Checkbox>
                <br/>
                <Checkbox>
                    {translation['show-photo-position']} 54/55
                </Checkbox>
            </div>
        </div>
    </div>
  )
}

export default SurveyImage;