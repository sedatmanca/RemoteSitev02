import { TTranslation } from "@/services/translationService";
import { 
    InsightTypes, 
    InsightTypeValues 
} from "@/types/projects/insightTypes";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";

interface Column{
    name: string;
    fill: number;
    newPlus: number;
    cut: number;
    newMinus: number;
}

const Earthworks = ({ 
    translation,
    selectedInsightModule
} : { 
    translation: TTranslation,
    selectedInsightModule: InsightTypeValues
}) => {
    const columns: ColumnsType<Column> = [
        { title: null, dataIndex: "name", key: "name"},
        { title: "Fill (m3)", dataIndex: "fill", key: "fill" },
        { title: "New (+)", dataIndex: "newPlus", key: "new-plus" },
        { title: "Cut (m3)", dataIndex: "cut", key: "cut" },
        { title: "New (-)", dataIndex: "newMinus", key: "new-minus" },
    ];

    const data = [
        {
            name: "0+720",
            fill: 2.3,
            newPlus: 0.0,
            cut: 62.2,
            newMinus: -1.3
        },
        {
            name: "0+730",
            fill: 4.3,
            newPlus: 18.7,
            cut: 217.1,
            newMinus: 0.0
        },       
        {
            name: "0+740",
            fill: 2.3,
            newPlus: 0.0,
            cut: 62.2,
            newMinus: -1.3
        },       
        {
            name: "0+750",
            fill: 2.4,
            newPlus: 45.8,
            cut: 64.3,
            newMinus: -1.3
        },       
        {
            name: "0+760",
            fill: 5.6,
            newPlus: 2.3,
            cut: 23.5,
            newMinus: -1.3
        },           
        {
            name: "0+770",
            fill: 22.5,
            newPlus: 1.4,
            cut: 12.2,
            newMinus: -1.3
        },       
        {
            name: "0+780",
            fill: 2.5,
            newPlus: 5.6,
            cut: 68.2,
            newMinus: -1.3
        },       
        {
            name: "0+790",
            fill: 7.8,
            newPlus: 12.5,
            cut: 48.8,
            newMinus: -1.3
        },       
        {
            name: "0+800",
            fill: 4.5,
            newPlus: 0.0,
            cut: 38.9,
            newMinus: -1.3
        },
    ]

    return(
        <div className={`${selectedInsightModule === InsightTypes.Earthworks ? "grow shrink opacity-100 visible" : "opacity-0 invisible w-0 h-0"} flex flex-col text-black duration-200 transition-opacity ease-out z-10`}>
            <div className="px-7 py-10 flex flex-col">
                <h1 className="font-bold text-2xl mx-auto">Earthworks - Overview</h1>
                <div className="flex flex-row gap-96 mt-10 place-content-center">
                    <div className="flex flex-col">
                        <label className="text-center">
                            Fill
                        </label>
                        <span className="font-bold text-2xl">
                            1.005
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-center">
                            Cut
                        </label>
                        <span className="font-bold text-2xl">
                            12.666
                        </span>
                    </div>
                </div>
            </div>
            <div className="overflow-auto flex flex-grow flex-shrink basis-24 [&>div]:flex-grow bg-white">
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default Earthworks;