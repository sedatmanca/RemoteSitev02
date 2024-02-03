import { ISurveyDetailsProps } from "@/types/survey/surveyDetails";
import { 
    Form, 
    Input, 
    DatePicker 
} from "antd";

import dayjs from "dayjs";

import "dayjs/locale/tr";
import "dayjs/locale/en-gb";

import { default as en } from "antd/es/date-picker/locale/en_GB";
import { default as tr } from "antd/es/date-picker/locale/tr_TR";
import { PickerLocale } from "antd/es/date-picker/generatePicker";

const SurveyDetails = ({
    translation,
    lang,
    surveyOptions,
    setSurveyOptions
}: ISurveyDetailsProps) => {
    //DatePicker'ın dili algılaması için bunları yapmak gerekiyor.
    dayjs.locale(lang === 'tr' ? 'tr' : 'en-gb');

    const changeLocaleText = (loc: PickerLocale) => {
        loc.lang = {
            ...loc.lang,
            ok: translation['ok']
        }

        return loc;
    }

    const locale = lang === 'tr' ? changeLocaleText(tr) : changeLocaleText(en);
    
    //TODO: Locale'e gore degistirilecek
    const dateFormat = "DD/MM/YYYY HH:mm:ss";
    
    return (
        <div className="pb-10 col-span-7 mt-3">
            <Form.Item 
                name="survey-name"
                label={translation['survey-name']}
                className="py-2"
                rules={[{ required: true, message: translation['survey-name-required'] }]}
            >
                <Input 
                    className="hover:!border-main-orange focus:!border-main-orange focus:!shadow"
                    onChange={(e) => {
                        setSurveyOptions({
                            ...surveyOptions,
                            name: e.target.value
                        });
                    }}
                />
            </Form.Item>
            <Form.Item 
                name="survey-date"
                label={translation['survey-date-time']}
                className="py-2" 
                rules={[{ required: true, message: translation['survey-date-time-required'] }]}
            >
                <DatePicker
                    className="w-full hover:!border-main-orange focus:!border-main-orange focus:!shadow focus-within:!border-main-orange focus-within:!shadow"
                    locale={locale}
                    format={dateFormat}
                    placeholder={translation['select-date']}
                    showTime
                    onChange={(e) => setSurveyOptions({
                        ...surveyOptions,
                        date: e?.toDate()
                    })}
                />
            </Form.Item>
        </div>
    )
}

export default SurveyDetails;