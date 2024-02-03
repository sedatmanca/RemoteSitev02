import { TTranslation } from '@/services/translationService';
import { 
    InsightTypes, 
    InsightTypeValues 
} from '@/types/projects/insightTypes';
import { 
    Progress, 
    Space, 
    Table,
    Modal,
    Switch,
    List
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useState } from 'react';
import { 
    LineChart, 
    XAxis, 
    YAxis,
    Tooltip, 
    CartesianGrid, 
    Line 
} from 'recharts';

interface Root{
    id: number;
    name: string;
}

interface Table {
    name: string;
    unit: string;
    planned: number;
    actualPrev: number;
    actualNew: number;
    actualTotal: number;
    remaining: number;
    complete: number;
}

interface ModalMetrics {
    metric: string;
    value: string;
}

interface ModalTable {
    activity: string;
    quantity: string;
    date1: string;
    date2: string;
    date3: string;
}

const Overview = ({ 
    translation,
    selectedInsightModule
 }: { 
    translation: TTranslation,
    selectedInsightModule: InsightTypeValues
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categories = [
        { name: "Surface", id: 1 },
        { name: "Earthworks", id: 2 },
        { name: "Drainage", id: 3 },
        { name: "Railway", id: 4 },
        { name: "Electrical", id: 5 },
        { name: "Bridge objects", id: 6 }
    ];

    const data = [
        {
            rootId: 1,
            kpi: [
                {
                    name: "Clearing & Grading",
                    unit: "m2/m3",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }
            ]
        },
        {
            rootId: 2,
            kpi: [
                {
                    name: "Embankment",
                    unit: "m3",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }, 
                {
                    name: "Bottom balast",
                    unit: "m2/m3",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                },
                {
                    name: "Top ballast",
                    unit: "m2/m3",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }
            ]
        },
        {
            rootId: 3,
            kpi: [
                {
                    name: "Pipes",
                    unit: "m",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }, 
                {
                    name: "Gutter",
                    unit: "m",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                },
            ]
        },
        {
            rootId: 4,
            kpi: [
                {
                    name: "Anchorage spikes",
                    unit: "#",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }, 
                {
                    name: "Sleepers",
                    unit: "#",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                },
                {
                    name: "Rail",
                    unit: "#",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                },
                {
                    name: "Switch motors",
                    unit: "#",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }
            ]
        },
        {
            rootId: 5,
            kpi: [
                {
                    name: "Pole bases",
                    unit: "#",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }, 
                {
                    name: "Poles",
                    unit: "#",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                },
                {
                    name: "Traction pylons",
                    unit: "#",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }
            ]
        },
        {
            rootId: 6,
            kpi: [
                {
                    name: "Foundations",
                    unit: "m2/m3",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }, 
                {
                    name: "Abutment piling",
                    unit: "#/m3",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                },
                {
                    name: "Pile caps",
                    unit: "m2/m3",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                },
                {
                    name: "MSE Walls",
                    unit: "m2/m3",
                    planned: 221,
                    actualPrev: 450,
                    actualNew: 245,
                    actualTotal: 695,
                    remaining: 100,
                    complete: 83
                }
            ]
        }
    ];

    const rootColumn: ColumnsType<Root> = [{ title: 'Category', dataIndex: 'name', key: 'name' }]

    const columns: ColumnsType<Table> = [
        { 
            title: 'KPI', 
            dataIndex: 'name', 
            key: 'name' 
        },
        { 
            title: 'Planned', 
            dataIndex: 'planned', 
            key: 'planned' 
        },
        { 
            title: 'Actual (Previous)', 
            dataIndex: 'actualPrev', 
            key: 'actualPrev' 
        },
        { 
            title: 'Actual (New)', 
            dataIndex: 'actualNew', 
            key: 'actualNew' 
        },
        { 
            title: 'Actual (Total)', 
            dataIndex: 'actualTotal', 
            key: 'actualTotal' 
        },
        { 
            title: 'Remaining', 
            dataIndex: 'remaining', 
            key: 'remaining' 
        },
        { 
            title: '% Complete', 
            dataIndex: 'complete', 
            key: 'complete',
            render: (_, { complete }) => {
                return (<Progress
                    percent={complete}
                    strokeColor="#21920F"
                />)
            }
        },
    ];

    const SubTable = ({ categoryId } : { categoryId: number }) => {
        const subcategory = data.find((d) => d.rootId == categoryId)!.kpi;
        
        return (
            <Table
                columns={columns}
                dataSource={subcategory}
                pagination={false}
                onRow={(_, index) => {
                    return{
                        onClick: () => setIsModalOpen(true)
                    };
                }}
            />
        )
    }

    const ModalView = () => {
        const chartData = [
            {
                name: "Nov 1",
                uv: 0,
                pv: 0.1,
            },               
            {
                name: "Nov 8",
                uv: 16.66666666666667,
                pv: 15,
            },           
            {
                name: "Nov 15",
                uv: 33.3,
                pv: 22,
            },           
            {
                name: "Nov 22",
                uv: 50,
                pv: 22,
            },           
            {
                name: "Nov 29",
                uv: 66.66666666666667,
                pv: 25,
                hv: 25
            },           
            {
                name: "Dec 6",
                uv: 83.33333333333333,
                hv: 50
            },            
            {
                name: "Dec 13",
                uv: 100,
                hv: 100
            },
        ]

        const metricData: ModalMetrics[] = [
            {
                metric: "Planned Start Date",
                value: "Apr 08, 23"
            },
            {
                metric: "Planned Finish Date",
                value: "Jul 08, 23"
            },           
            {
                metric: "Actual Start Date",
                value: "May 08, 23"
            },        
            {
                metric: "Actual Start Date",
                value: "Jul 08, 23"
            },        
            {
                metric: "Planned Duration",
                value: "91"
            },
            {
                metric: "Remaining",
                value: "20"
            },
            {
                metric: "Delayed Days",
                value: "10"
            }
        ]

        const tableColumns: ColumnsType<ModalTable> = [
            { title: 'Activity', dataIndex: 'activity', key: 'activity' },
            { title: 'Planned Quantity', dataIndex: 'quantity', key: 'quantity' },
            { title: 'May 2, 2023', dataIndex: 'date1', key: 'date1' },
            { title: 'May 3, 2023', dataIndex: 'date2', key: 'date2' },
            { title: 'May 4, 2023', dataIndex: 'date3', key: 'date3' },
        ];

        const tableData: ModalTable[] = [
            { activity: "Electrical Distribution", quantity: "16,783,763", date1: "37.10m", date2: "53.10m", date3: "92.10m" }
        ]

        return(
            <div className="flex flex-row gap-6 p-3">
                <div className="flex flex-col">
                    <Switch
                        className="w-[75px] self-end mb-3 bg-light-font"
                        checkedChildren="%"
                        unCheckedChildren="QTY"
                    />
                    <LineChart
                        className="mb-5"
                        width={600}
                        height={200}
                        data={chartData}
                    >
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={tick => `${tick}%` } />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="pv" stroke="#E3951E" />
                        <Line type="monotone" dataKey="uv" stroke="#B5B8BC" strokeDasharray="3 3" />
                        <Line type="monotone" dataKey="hv" stroke="#E3951E" strokeDasharray="3 3" />
                    </LineChart>
                    <Table
                        className="w-[600px]"
                        columns={tableColumns}
                        dataSource={tableData}
                        pagination={false}
                    />
                </div>
                <div className="bg-[#EEF0F3] rounded-lg grow pb-3">
                    <div className="flex flex-row grow m-2">
                        <Progress
                            strokeColor="#21920F"
                            trailColor="#bdb8b8"
                            type="circle"
                            percent={30}
                            strokeWidth={8}
                        />
                        <span className="ml-3 self-center">
                            Mechanical Ducts
                        </span>
                    </div>
                    <List 
                        dataSource={metricData}
                        renderItem={(item, index) => {
                            return(
                                <div className={`flex flex-row mx-2 py-1 ${index !== metricData.length - 1 && "border-b-[1px] border-gray-500"}`}>
                                    <label className="text-gray-500">
                                        {item.metric}
                                    </label>
                                    <span className="ml-auto">
                                        {item.value}
                                    </span>
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        )
    }

    return(
        <div className={`${selectedInsightModule === InsightTypes.Overview ? "grow shrink opacity-100 visible" : "opacity-0 invisible w-0 h-0"} text-black max-w- duration-200 transition-opacity ease-out z-20 flex flex-col`}>
            <div className="px-7 py-10 flex flex-row">
                <div className="w-[70%]">
                    <h2 className="font-bold text-xl">Total Days Progess</h2>
                    <h1 className="font-bold text-3xl py-6">Total Day: 225</h1>
                    <div className="h-7 grid grid-cols-10">
                        <div className="bg-[#21920F] col-span-7 rounded-l-xl"/>
                        <div className="bg-main-orange col-span-1"/>
                        <div className="bg-[#969696] col-span-2 rounded-r-xl"/>
                    </div>                
                    <div className="h-7 grid grid-cols-10 py-3">
                        <span className="col-start-1 col-end-7 text-xs">Jun 12</span>
                        <span className="col-span-2 text-xs text-center">Today</span>
                        <span className="col-start-10 text-xs justify-self-end">Oct 9</span>
                    </div>
                    <div className="sm:w-[90%] lg:w-full 2xl:w-[85%] grid grid-cols-3 sm:h-3 lg:h-5 mt-3 gap-2">
                        <div className="col-span-1 bg-[#21920F] rounded-xl text-center flex">
                            <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                Remaining Duration
                            </span>
                        </div>
                        <div className="col-span-1 bg-main-orange rounded-xl text-center flex">
                            <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                Overdue
                            </span>
                        </div>
                        <div className="col-span-1 bg-[#969696] rounded-xl text-center flex">
                            <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                Actual Duration
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col grow text-center">
                    <span className="mb-3">
                        Actual Progress
                    </span>
                    <Progress
                        strokeColor="#21920F"
                        trailColor="#bdb8b8"
                        type="circle"
                        percent={30}
                        strokeWidth={8}
                    />                    
                    <div className="sm:w-[90%] lg:w-[85%] 2xl:w-[80%] grid grid-cols-2 h-5 mt-6 gap-2 self-center">
                        <div className="col-span-1 bg-[#21920F] rounded-xl text-center flex">
                            <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                Complete
                            </span>
                        </div>
                        <div className="col-span-1 bg-[#bdb8b8] rounded-xl text-center flex">
                            <span className="sm:text-xxs xl:text-xs text-white m-auto">
                                Remaining
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overflow-auto flex flex-grow flex-shrink basis-24 [&>div]:flex-grow bg-white">
                <Table
                    columns={rootColumn}
                    dataSource={categories}
                    pagination={false}
                    expandable={{
                        expandedRowRender: (record) => <SubTable categoryId={record.id}/>
                    }}
                />
            </div>
            <Modal
                open={isModalOpen}
                width={1000}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                closable
                footer={null}
                centered
            >
                <ModalView/>
            </Modal>
        </div>
    )
}

export default Overview;