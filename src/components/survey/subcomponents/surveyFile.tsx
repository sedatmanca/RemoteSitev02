import Dragger from "antd/es/upload/Dragger";
import { Button } from "antd";
import Image from "next/image";
import { IUploadImageComponentProps } from "@/types/survey/uploadImage";
import { SurveyDataType } from "@/types/survey/surveyDataType";

const SurveyFile = ({
    translation,
    lang,
    surveyOptions,
    setSurveyOptions
}: IUploadImageComponentProps) => {
    const getSupportedFileString = () => {
        switch(surveyOptions.dataType){
            case SurveyDataType.PreprocessedData:
                return translation['geotiff-files'];
            case SurveyDataType.PointCloud:
                return translation['point-cloud-image-text'];
            default:
                return "";
        };
    }

    return (
        <div className="p-4 flex flex-col justify-between">
            <Dragger
                className="overflow-y-auto h-64"
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
                    {translation['supported-formats']}: {getSupportedFileString()}
                </p>
            </Dragger>
            <Button
                className="bg-main-orange text-white px-4 py-2 rounded focus:ring-4 focus:ring-main-orange/20 hover:bg-main-orange/90 h-auto"
            >
                {translation['upload-files'].toLocaleUpperCase(lang)}
            </Button>
        </div>
    )
}

export default SurveyFile;