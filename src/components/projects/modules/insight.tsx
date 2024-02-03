'use client'

import { TbProgress } from "react-icons/tb";
import { GiEarthCrack } from "react-icons/gi"; 

import { 
    InsightTypes, 
    InsightTypeValues 
} from "@/types/projects/insightTypes";

import {
    Earthworks,
    Overview
} from "@/components/projects/modules/insight-modules";

import { useState } from "react";
import { TTranslation } from "@/services/translationService";

import Image from "next/image";
import progressOverview from '#/assets/progress-1.png';
import progressEarthworks from '#/assets/progress-2.png'; 

const Insight = ({ translation } : { translation: TTranslation}) => {
    const [selectedInsightModule, setSelectedInsightModule] = useState<InsightTypeValues>(InsightTypes.Overview);

    return(
        <div className="bg-[#EEF0F3] grow flex flex-col h-[calc(100vh-59px]">
            <div className="w-full px-4 pt-4 flex flex-row gap-10 bg-color-main">
                <div
                    className={`${selectedInsightModule === InsightTypes.Overview ? "border-b-main-orange border-b-4 text-white" : "text-light-font cursor-pointer"} flex ml-3 hover:text-white duration-200 transition-colors ease-linear h-10`}
                    onClick={() => setSelectedInsightModule(InsightTypes.Overview)}
                >
                    <TbProgress className="w-6 h-6 mr-2" />
                    <span>
                        Progress Overview
                    </span>
                </div>
                <div
                    className={`${selectedInsightModule === InsightTypes.Earthworks ? "border-b-main-orange border-b-4 text-white" : "text-light-font cursor-pointer"} flex ml-3 hover:text-white duration-200 transition-colors ease-linear h-10`}
                    onClick={() => setSelectedInsightModule(InsightTypes.Earthworks)}
                >
                    <GiEarthCrack className="w-6 h-6 mr-2" />
                    <span>
                        Earthworks
                    </span>
                </div>
            </div>
            <div className="w-full h-auto grow flex flex-row">
                <div className="w-full flex">
                    <Overview 
                        translation={translation}
                        selectedInsightModule={selectedInsightModule}
                    />
                    <Earthworks 
                        translation={translation}
                        selectedInsightModule={selectedInsightModule}
                    />      
                </div>
                <div className="bg-[#EEF0F3] w-full">
                    <div className="w-full h-full pt-3 pr-7 flex flex-col gap-5">
                        <div className="grid grid-cols-5 h-5 gap-2">
                            <div className="col-span-1 bg-[#21920F] rounded-xl text-center flex">
                                <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                    Completed
                                </span>
                            </div>
                            <div className="col-span-1 bg-[#0F8292] rounded-xl text-center flex">
                                <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                    Completed (New)
                                </span>
                            </div>
                            <div className="col-span-1 bg-main-orange rounded-xl text-center flex">
                                <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                    In Progress (New)
                                </span>
                            </div>  
                            <div className="col-span-1 bg-[#A077F6] rounded-xl text-center flex">
                                <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                    In Progress (Previous)
                                </span>
                            </div>
                            <div className="col-span-1 bg-[#969696] rounded-xl text-center flex">
                                <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                    Not Started
                                </span>
                            </div>
                        </div>
                        <>
                            <Image
                                className={`object-cover transition-opacity duration-200 ease-linear flex-grow ${selectedInsightModule === InsightTypes.Overview ? 'opacity-100 h-10 w-full visible' : 'opacity-0 h-0 w-0 invisible absolute'}`}
                                src={progressOverview}
                                alt=""
                                quality={100}
                                priority
                            />   
                            <Image
                                className={`object-cover transition-opacity duration-200 ease-linear flex-grow ${selectedInsightModule === InsightTypes.Earthworks ? 'opacity-100 h-10 w-full visible' : 'opacity-0 h-0 w-0 invisible absolute'}`}
                                src={progressEarthworks}
                                alt=""
                                quality={100}
                            />
                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Insight;