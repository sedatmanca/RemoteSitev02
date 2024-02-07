import { Select, DatePicker } from "antd";
import { INavbarFilterProps } from "@/types/navbar/navbarProps";

import dayjs from "dayjs";

import "dayjs/locale/tr";
import "dayjs/locale/en-gb";

import { default as en } from "antd/es/date-picker/locale/en_GB";
import { default as tr } from "antd/es/date-picker/locale/tr_TR";
import { PickerLocale } from "antd/es/date-picker/generatePicker";

const NavbarFilters = ({
    translation,
    lang
}: INavbarFilterProps) => {
    //DatePicker'ın dili algılaması için bunları yapmak gerekiyor.
    dayjs.locale(lang === 'tr' ? 'tr' : 'en-gb');

    const changeLocaleText = (loc: PickerLocale) => {
        loc.lang = {
            ...loc.lang,
            ok: translation.projects['ok']
        }

        return loc;
    }

    const locale = lang === 'tr' ? changeLocaleText(tr) : changeLocaleText(en); 
    
    //TODO: Locale'e gore degistirilecek
    const dateFormat = "DD/MM/YYYY";

    return(
        <div className="ml-6 w-2/6 flex flex-row">
          <div className="flex flex-row w-auto px-3 border-l-[1px] border-l-[#8E8F93]">
            <label className="text-xs text-white self-center">
              {translation.projects['site-name']}
            </label>
            <Select
              title="Site Name"
              className="ml-2 [&_.ant-select-selection-item]:!text-white [&_.ant-select-selection-item]:!text-center [&_.ant-select-arrow]:!text-white"
              defaultValue={0}
              bordered={false}
              options={[
                { value: 0, label: 'Romania Bucharest South Ring Road LOT-1' },
                /*{ value: 1, label: 'Limak' },
                { value: 2, label: 'Deneme' },*/
              ]}
            />
          </div>          
          <div className="flex flex-row border-r-[1px] w-auto px-3 border-r-[#8E8F93] border-l-[1px] border-l-[#8E8F93]">
            <label className="text-xs text-white self-center">
              {translation.survey['survey-date']}
            </label>
            <DatePicker
                className="bg-inherit border-none shadow-none !text-white [&>.ant-picker-input>input]:!text-white [&>.ant-picker-input>input]:!text-center"
                defaultValue={dayjs()}
                locale={locale}
                format={dateFormat}
                placeholder=""
                clearIcon={false}
                suffixIcon={false}
            />
          </div>
        </div>
    )
}

export default NavbarFilters;