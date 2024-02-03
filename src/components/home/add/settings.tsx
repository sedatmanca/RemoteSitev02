'use client'

import { ISettingsProps } from "@/types/home/addProjectComponentProps";
import { 
    DistanceUnit, 
    VolumeUnit 
} from "@/types/units";
import { Form, Select } from "antd";

const Settings = ({
    translation,
    project,
    setProject
}: ISettingsProps) => {
    const unitInfo = {
        distanceUnits: [
            { label: translation['meter'], value: DistanceUnit.Meter },
            { label: translation['feet'], value: DistanceUnit.Feet },
            { label: translation['inch'], value: DistanceUnit.Inch },
        ],
        volumeUnits: [
            { label: translation['cubic-meter'], value: VolumeUnit.Meter },
            { label: translation['cubic-feet'], value: VolumeUnit.Feet },
            { label: translation['cubic-yards'], value: VolumeUnit.Yards },
        ]
    }

    return (
        <div>
            <div className="w-full inline-flex justify-start items-center gap-x-2 mb-4 ">
                <span className="text-lg font-medium">
                    {translation['units']}
                </span>
                <div className="h-px w-full bg-gray-400/80"></div>
            </div>
            <div className="grid grid-cols-12 gap-x-2">
                <div className="flex flex-col col-span-12">
                    <Form.Item
                            name="distance-unit"
                            label={translation['distance-unit']}
                        >
                            <Select
                                className="[&>div:hover]:!border-main-orange [&>div:focus]:!border-main-orange [&>div:focus]:!shadow [&>div:focus-within]:!border-main-orange [&>div:focus-within]:!shadow"
                                onChange={(e) => setProject({
                                    ...project,
                                    distanceUnit: e
                                })}
                                options={unitInfo.distanceUnits}
                            />
                        </Form.Item>
                        <Form.Item
                            name="volume-unit"
                            label={translation['volume-unit']}
                        >
                            <Select
                                className="[&>div:hover]:!border-main-orange [&>div:focus]:!border-main-orange [&>div:focus]:!shadow [&>div:focus-within]:!border-main-orange [&>div:focus-within]:!shadow"
                                onChange={(e) => setProject({
                                    ...project,
                                    volumeUnit: e
                                })}
                                options={unitInfo.volumeUnits}
                            />
                    </Form.Item>
                </div>
            </div>
        </div>
    );
};

export default Settings;
