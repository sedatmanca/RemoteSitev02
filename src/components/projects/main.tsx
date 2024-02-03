"use client"

import { 
    ProjectSurveyType, 
    ProjectSurveyTypeValues 
} from "@/types/projects/projectSurveyTypes";

import { 
    PencilSquareIcon,
    Square3Stack3DIcon,
    CubeIcon
} from "@heroicons/react/24/outline";

import { RxRulerHorizontal } from "react-icons/rx";
import { MdInsights } from "react-icons/md";
import { BsDownload } from "react-icons/bs";

import { useState } from "react";

import {
    Annotation,
    Design,
    Insight,
    Measure,
    Output,
    Survey
} from "@/components/projects/modules"
import { TTranslation } from "@/services/translationService";


const Main = ({ translation } : { translation: TTranslation } ) => {
    const [selectedSurveyType, setSelectedSurveyType] = useState<ProjectSurveyTypeValues>(ProjectSurveyType.Insight);

    const SelectedModule = () => {
        switch(selectedSurveyType){
            case ProjectSurveyType.Annotation:
                return <Annotation />;
            case ProjectSurveyType.Design:
                return <Design />;
            case ProjectSurveyType.Insight:
                return <Insight translation={translation}/>;
            case ProjectSurveyType.Measure:
                return <Measure />;
            case ProjectSurveyType.Output:
                return <Output />;
            case ProjectSurveyType.Survey:
                return <Survey />;
        }
    }

    return(
        <div className="flex flex-row grow overflow-auto">
            <div className="bg-color-main-alternate grow max-w-[80px] min-w-[80px] h-auto">
                <div 
                    className={`${selectedSurveyType === ProjectSurveyType.Measure ? "bg-color-main border-r-main-orange border-r-2 text-main-orange" : "cursor-pointer"} text-center py-8 hover:bg-color-main hover:text-main-orange duration-200 transition-colors ease-linear`}
                    onClick={() => setSelectedSurveyType(ProjectSurveyType.Measure)}
                >
                    <RxRulerHorizontal className="w-6 h-6 mx-auto" />
                    <span className="text-xs">
                        Measure
                    </span>
                </div>
                <div 
                    className={`${selectedSurveyType === ProjectSurveyType.Annotation ? "bg-color-main border-r-main-orange border-r-2 text-main-orange" : "cursor-pointer"} text-center py-8 hover:bg-color-main hover:text-main-orange duration-200 transition-colors ease-linear`}
                    onClick={() => setSelectedSurveyType(ProjectSurveyType.Annotation)}
                >
                    <PencilSquareIcon className="w-6 h-6 mx-auto" />
                    <span className="text-xs">
                        Annotation
                    </span>
                </div>
                <div 
                    className={`${selectedSurveyType === ProjectSurveyType.Survey ? "bg-color-main border-r-main-orange border-r-2 text-main-orange" : "cursor-pointer"} text-center py-8 hover:bg-color-main hover:text-main-orange duration-200 transition-colors ease-linear`}
                    onClick={() => setSelectedSurveyType(ProjectSurveyType.Survey)}
                >
                    <Square3Stack3DIcon className="w-6 h-6 mx-auto" />
                    <span className="text-xs">
                        Survey
                    </span>
                </div>
                <div 
                    className={`${selectedSurveyType === ProjectSurveyType.Design ? "bg-color-main border-r-main-orange border-r-2 text-main-orange" : "cursor-pointer"} text-center py-8 hover:bg-color-main hover:text-main-orange duration-200 transition-colors ease-linear`}
                    onClick={() => setSelectedSurveyType(ProjectSurveyType.Design)}
                >
                    <CubeIcon className="w-6 h-6 mx-auto" />
                    <span className="text-xs">
                        Design
                    </span>
                </div>
                <div 
                    className={`${selectedSurveyType === ProjectSurveyType.Output ? "bg-color-main border-r-main-orange border-r-2 text-main-orange" : "cursor-pointer"} text-center py-8 hover:bg-color-main hover:text-main-orange duration-200 transition-colors ease-linear`}
                    onClick={() => setSelectedSurveyType(ProjectSurveyType.Output)}
                >
                    <BsDownload className="w-6 h-6 mx-auto" />
                    <span className="text-xs">
                        Output
                    </span>
                </div>
                <div 
                    className={`${selectedSurveyType === ProjectSurveyType.Insight ? "bg-color-main border-r-main-orange border-r-2 text-main-orange" : "cursor-pointer"} text-center py-8 hover:bg-color-main hover:text-main-orange duration-200 transition-colors ease-linear`}
                    onClick={() => setSelectedSurveyType(ProjectSurveyType.Insight)}
                >
                    <MdInsights className="w-6 h-6 mx-auto" />
                    <span className="text-xs">
                        Insight
                    </span>
                </div>
            </div>
            <SelectedModule />
        </div>
    )
}

export default Main;