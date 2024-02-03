import { SurveyDataType, SurveyDataTypeValues } from "@/types/survey/surveyDataType";
import { ISurveySummaryProps } from "@/types/survey/surveySummary";
import { Input, Form } from "antd";

const SurveySummary = ({
    translation,
    surveyOptions
}: ISurveySummaryProps) => {
    const getSurveyType = (dataType: SurveyDataTypeValues): string => {
        switch(dataType){
            case SurveyDataType.Survey:
                return translation['survey'];
            case SurveyDataType.PreprocessedData:
                return translation['pre-processed-data'];
            case SurveyDataType.PointCloud:
                return translation['point-cloud'];
            case SurveyDataType.Design:
                return translation['design'];
        }
    }

    return (
        <div className="mt-6">
            <Form.Item
                label={translation['project-name']}
            >
                <Input
                    className="!text-black"
                    value={surveyOptions.project?.name}
                    disabled
                />
            </Form.Item>
            <Form.Item
                label={translation['data-type']}
            >
                <Input
                    className="!text-black"
                    value={getSurveyType(surveyOptions.dataType!)}
                    disabled
                />
            </Form.Item>
            <Form.Item
                label={translation['total-image-count']}
            >
                <Input
                    className="!text-black"
                    value="#TEMP 54"
                    disabled
                />
            </Form.Item>        
            <Form.Item
                label={translation['survey-name']}
            >
                <Input
                    className="!text-black"
                    value={surveyOptions.name}
                    disabled
                />
            </Form.Item>        
            <Form.Item
                label={translation['survey-date-time']}
            >
                <Input
                    className="!text-black"
                    value={surveyOptions.date?.toString()}
                    disabled
                />
            </Form.Item>
        </div>
    )
}

export default SurveySummary;