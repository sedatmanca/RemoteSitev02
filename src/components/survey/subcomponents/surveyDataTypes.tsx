import { ISurveyDataTypesProps, ISurveyDataTypeCategory } from "@/types/survey/surveyDataTypes";
import Image from "next/image";
import { Form } from "antd";
import { SurveyDataType } from "@/types/survey/surveyDataType";

const SurveyDataTypes = ({
    translation,
    lang,
    surveyOptions,
    setSurveyOptions
}: ISurveyDataTypesProps) => {
    const categories: ISurveyDataTypeCategory[] = [
        {
            id: SurveyDataType.Survey,
            title: translation['survey'],
            description: translation['survey-description'],
            image: "/assets/svg/survey-1.svg",
            acceptedFileTypes: translation['geotagged-jpegs']
        },
        {
            id: SurveyDataType.PreprocessedData,
            title: translation['pre-processed-data'],
            description: translation['pre-processed-data-description'],
            image: "/assets/svg/survey-2.svg",
            acceptedFileTypes: translation['geotiff-files']
        },
        {
            id: SurveyDataType.PointCloud,
            title: translation['point-cloud'],
            description: translation['point-cloud-description'],
            image: "/assets/svg/survey-3.svg",
            acceptedFileTypes: translation['point-cloud-image-text']
        },
        {
            id: SurveyDataType.Design,
            title: translation['design'],
            description: translation['design-description'],
            image: "/assets/svg/survey-4.svg",
            acceptedFileTypes: translation['design-image-text']
        },
    ];

    return (
        <Form.Item
            name="data-type"
            rules={[{ required: true, message: translation['data-type-required'] }]}
        >
            <div className="grid grid-cols-12 my-1">
            {categories.map((item, index) => {
                return (
                    <div 
                        key={index} 
                        className={`${surveyOptions.dataType === item.id ? 'ring-1 ring-main-orange' : ''} flex flex-col transition delay-75 col-span-12 sm:col-span-12 md:col-span-6 m-3 p-2 shadow-md rounded hover:ring-1 cursor-pointer min-h-[170px] hover:ring-main-orange`}
                        onClick={() => setSurveyOptions({
                            ...surveyOptions,
                            dataType: item.id
                        })}
                    >
                        <span className="py-2 pl-4 font-medium">
                            {item.title.toLocaleUpperCase(lang)}
                        </span>
                        <div className="flex-1 grid grid-cols-12 mt-3">
                            <div className="col-span-4 md:col-span-3 sm:col-span-2 justify-center flex px-1 sm:ml-5 md:ml-2 mb-auto mt-3">
                                <Image 
                                    src={item.image} 
                                    alt={item.acceptedFileTypes}
                                    quality={100}
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className="col-span-8 md:col-span-9 sm:col-span-10 mx-2 flex flex-col">
                                <div className="text-xs">
                                    {item.description}
                                </div>
                                <div className="flex py-2 mt-auto">
                                    <Image 
                                        src="/assets/svg/photo-icon.svg" 
                                        alt="Icon"
                                        quality={100}
                                        width={18}
                                        height={18}
                                    />
                                    <span className="px-1 text-sm">
                                        {item.acceptedFileTypes}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </Form.Item>
    )
};

export default SurveyDataTypes;