'use client'

import { 
    Button, 
    DatePicker, 
    Form, 
    Input, 
    Select, 
    Modal 
} from "antd";
import { ISiteInfoProps } from "@/types/home/addProjectComponentProps";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { 
    MapPinIcon, 
    CheckIcon 
} from "@heroicons/react/24/outline";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ICoordinates } from "@/types/home/coordinates";
import { categories } from "@/types/home/categories";
import { 
    getCategoryName, 
    getSubCategoriesFromCategoryId, 
    getSubCategoryName 
} from "@/services/categoryService";

import dayjs from "dayjs";

import "dayjs/locale/tr";
import "dayjs/locale/en-gb";

import { default as en } from "antd/es/date-picker/locale/en_GB";
import { default as tr } from "antd/es/date-picker/locale/tr_TR";
import { UploadChangeParam } from "antd/es/upload";

const Map = dynamic(async () => await import('@/components/home/add/map'), { ssr: false } );

const SiteInfo = ({
    translation,
    lang,
    project,
    setProject
} : ISiteInfoProps) => {
    //DatePicker'ın dili algılaması için bunları yapmak gerekiyor.
    dayjs.locale(lang === 'tr' ? 'tr' : 'en-gb');
    const locale = lang === 'tr' ? tr : en;
    
    const dateFormat = "DD/MM/YYYY";
    
    const form = Form.useFormInstance();
 
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [mapCoords, setMapCoords] = useState<ICoordinates | undefined>(project?.coordinates);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const onMapClose = () => {
        setMapCoords(project?.coordinates);
        setIsMapModalOpen(false);
    }

    const onCoordsConfirm = () => {
        //Burası haritada seçim yapıldıktan sonra required uyarısı vermesin diye eklendi
        form.setFieldsValue({
            'latitude': mapCoords?.lat,
            'longitude': mapCoords?.lng
        })

        mapCoords && setProject({...project, coordinates: mapCoords });

        setIsMapModalOpen(false);
    }

    const getDisabledStartDates = (current: dayjs.Dayjs): boolean => {
        return current.toDate() >= project?.endDate!;
    }
    
    const getDisabledEndDates = (current: dayjs.Dayjs): boolean => {
        return current.toDate() <= project?.startDate!;
    }
    
    const uploadImage = (e: UploadChangeParam) => {
        if(e.file.status === "done"){
            const reader = new FileReader();
            
            reader.readAsDataURL(e.file.originFileObj!);

            reader.onload = (e) => {
                setProject({
                    ...project,
                    image: e.target?.result?.toString() 
                });
            }

            setIsImageModalOpen(true);
        }
        else if(e.file.status === "removed"){
            setProject({
                ...project,
                image: undefined
            })
        }
    }

    const CategoriesDropdown = () => {
        return(
            <div className="grid grid-cols-2 gap-3 mx-2 my-2 py-2 text-color-main">
                {categories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="category-item group/item">
                        <div className="flex items-centers justify-start gap-x-1 font-medium group-hover/item:text-light-orange cursor-default">
                            <Image 
                                alt={translation[getCategoryName(category.id)!]}
                                src={category.icon}
                                quality={100}
                                width={24} 
                                height={24}
                            /> 
                            <span className={`${category.id === project?.category ? "text-main-orange" : "text-black"}`}>
                                {translation[getCategoryName(category.id)!]}
                            </span>
                        </div>
                        <div className="pl-1 mt-2">
                            <ul className="text-xs leading-5 cursor-pointer">
                                {getSubCategoriesFromCategoryId(category.id).map((subCategory, scIndex) => {
                                    return (
                                        <li key={scIndex}
                                            onClick={() => {
                                                setProject({
                                                    ...project,
                                                    category: category.id,
                                                    subCategory: subCategory.id
                                                });
                                                setIsCategoriesOpen(false);
                                            }}
                                            className="hover:text-light-orange"
                                        >
                                            <span className={`${category.id === project?.category && subCategory.id === project?.subCategory ? "text-main-orange" : ""}`}>
                                                {translation[getSubCategoryName(category.id, subCategory.id)!]}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        )
    } 

    return(
        <div>
            <div className="w-full inline-flex justify-start items-center gap-x-2 mb-4 ">
                <span className="text-lg font-medium">
                    {translation['details']}
                </span>
                <div className="h-px w-full bg-gray-400/80"></div>
            </div>
            <div className="ant-sm:block grid grid-cols-12 gap-x-2">
                <div className="flex flex-col col-span-10">
                    <Form.Item
                        name="name"
                        label={translation['project-name']}
                        rules={[{ required: true, message: translation['project-name-required'] }]}
                    >
                        <Input
                            className="hover:!border-main-orange focus:!border-main-orange focus:!shadow"
                            onChange={(e) => setProject({
                                ...project,
                                name: e.target.value
                            })}
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        label={translation['project-category']}
                    >
                        <Select
                            className="[&>div:hover]:!border-main-orange [&>div:focus]:!border-main-orange [&>div:focus]:!shadow [&>div:focus-within]:!border-main-orange [&>div:focus-within]:!shadow"
                            open={isCategoriesOpen}
                            dropdownRender={CategoriesDropdown}
                            onDropdownVisibleChange={(e) => setIsCategoriesOpen(e)}
                        />
                    </Form.Item>
                    <div className="flex w-full mb-6 place-content-center">    
                        <Button
                            className="ant-sm:grow self-center text-white bg-main-orange hover:bg-main-deep-orange disable-text-hover border-none inline-flex items-center place-content-center"
                            onClick={() => setIsMapModalOpen(true)} 
                        >
                            <MapPinIcon className="w-5 h-5 mr-1" />
                            <span>
                                {translation['select-location']}
                            </span>
                        </Button>
                    </div>
                    <Form.Item
                        name="latitude"
                        label={translation['latitude']}
                        rules={[{ required: true, message: translation['latitude-required'] }]}
                    >
                        <Input
                            className="hover:!border-main-orange focus:!border-main-orange focus:!shadow"
                            type="number"
                            max={90}
                            min={-90}
                            step={0.0001}
                            onChange={(e) => {
                                setMapCoords(coords => 
                                    { return { 
                                            lat: Number(e.target.value),
                                            lng: coords?.lng 
                                        } 
                                    }
                                );
                                setProject({
                                    ...project,
                                    coordinates:{
                                        lat: Number(e.target.value),
                                        lng: project?.coordinates?.lng
                                    } 
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="longitude"
                        label={translation['longitude']}
                        rules={[{ required: true, message: translation['longitude-required'] }]}
                    >
                        <Input
                            className="hover:!border-main-orange focus:!border-main-orange focus:!shadow"
                            type="number"
                            max={180}
                            min={-180}
                            step={0.0001}
                            onChange={(e) =>{
                                    setMapCoords(coords => 
                                        { return { 
                                                lat: coords?.lat,
                                                lng: Number(e.target.value) 
                                            } 
                                        }
                                    );
                                    setProject({
                                        ...project,
                                        coordinates:{
                                            lat: project?.coordinates?.lat,
                                            lng: Number(e.target.value)
                                        } 
                                    });
                                }
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label={translation['project-description']}
                    >
                        <Input.TextArea
                            className="hover:!border-main-orange focus:!border-main-orange focus:!shadow focus-within:!border-main-orange focus-within:!shadow"
                            allowClear={true}
                            showCount={true}
                            onChange={(e) => setProject({
                                ...project,
                                description: e.target.value
                            })}
                        />
                    </Form.Item>
                </div>
                <div className="ant-sm:mb-3 col-span-2">
                    <div className="flex flex-col gap-y-1 w-full">
                        <label className="ant-sm:text-start text-center">
                            {translation['upload-photo']}
                        </label>
                        <Dragger
                            maxCount={1}
                            accept=".jpg,.jpeg,.png" 
                            className="w-full"
                            onChange={(e) => uploadImage(e)}
                            action="/api/image"
                            onPreview={() => setIsImageModalOpen(true)}
                        >
                            <ArrowUpTrayIcon className="!text-main-orange w-10 h-10 ml-auto mr-auto mb-2"/>
                            <p className="ant-upload-text px-2">
                                {translation['upload-message']}
                            </p>
                            <p className="ant-upload-hint"></p>
                        </Dragger>
                    </div>
                </div>
            </div>
            <div className="w-full inline-flex justify-start items-center gap-x-2 my-2">
                <span className="text-lg font-medium whitespace-nowrap">
                    {translation['project-dates']}
                </span>
                <div className="h-px w-full bg-gray-400/80"></div>
            </div>
            <div className="ant-sm:block grid grid-cols-12 gap-x-2">
                <div className="flex flex-col col-span-10">
                    <Form.Item
                        name="start-date"
                        label={translation['project-start-date']}
                        rules={[{ required: true, message: translation['start-date-required'] }]}
                    >
                        <DatePicker
                            className="w-full hover:!border-main-orange focus:!border-main-orange focus:!shadow focus-within:!border-main-orange focus-within:!shadow"
                            locale={locale}
                            placeholder={translation['select-start-date']}
                            format={dateFormat}
                            disabledDate={getDisabledStartDates}
                            onChange={(e) => { 
                                setProject({
                                    ...project,
                                    startDate: e?.toDate()
                            })}}
                        />
                    </Form.Item>
                    <Form.Item
                        name="end-date"
                        className="m-0"
                        label={translation['project-end-date']}
                        rules={[{ required: true, message: translation['end-date-required'] }]}
                    >
                        <DatePicker
                            className="w-full hover:!border-main-orange focus:!border-main-orange focus:!shadow focus-within:!border-main-orange focus-within:!shadow"
                            locale={locale}
                            placeholder={translation['select-end-date']}
                            format={dateFormat}
                            disabledDate={getDisabledEndDates}
                            onChange={(e) => setProject({
                                ...project,
                                endDate: e?.toDate()
                            })}
                        />
                    </Form.Item>
                </div>
            </div>
            <Modal
                centered
                open={isMapModalOpen}
                width={800}
                onOk={() => onMapClose()}
                onCancel={() => onMapClose()}
                afterClose={() => onMapClose()}
                destroyOnClose
                footer={
                    <div className="inline-flex gap-x-2 ant-sm:w-full">
                        <Button 
                            onClick={() => onCoordsConfirm()}
                            disabled={!mapCoords}
                            className={`${mapCoords ? "bg-main-orange hover:bg-main-deep-orange" : ""} grow self-center text-white disable-text-hover border-none inline-flex items-center place-content-center`}
                        >
                            <CheckIcon className="w-5 h-5 mr-1"/>
                            <span>
                                {translation['confirm-location']}
                            </span>
                        </Button>
                    </div>
                }
            >
                <div className="pt-5">
                    <Map
                        translation={translation}
                        coords={mapCoords}
                        setCoords={setMapCoords}
                    />
                </div>
            </Modal>
            <Modal
                centered
                closable
                open={isImageModalOpen}
                onOk={() => setIsImageModalOpen(false)}
                onCancel={() => setIsImageModalOpen(false)}
                afterClose={() => setIsImageModalOpen(false)}
                footer={null}
            >
                <Image
                    src={project?.image!}
                    alt=""
                    className="mt-5"
                    width={600}
                    height={600}
                />
            </Modal>
        </div>
    );
}

export default SiteInfo;