'use client'

import { IUserInfoProps } from "@/types/home/addProjectComponentProps"
import { 
    Form, 
    Dropdown, 
    Select, 
    Table, 
    Checkbox,
    Button,
} from "antd"
import { DownOutlined } from "@ant-design/icons"
import { useState } from "react"
import { Roles, RoleTypes, IRole } from "@/types/roles"

const UserInfo = ({
    translation,
    project,
    setProject,
    existingUsers
}: IUserInfoProps) => { 
    const form = Form.useFormInstance();

    const [selectedUsers, setSelectedUsers] = useState<string[]>();
    const [tableUsers, setTableUsers] = useState<IRole[]>();
    const [sameRole, setSameRole] = useState(false);
    const [invitePeopleSelectRole, setInvitePeopleSelectRole] = useState<RoleTypes>(Roles.Member);

    const roles = Object.values(Roles).map((r, index) => {
        return {
            label: <span className="flex items-center gap-2">{translation[r]}</span>,
            key: index,
            value: r
        }
    })

    const TitleColumn = () => {
        return (
            <div className='flex items-center justify-end'>
                <Checkbox
                    checked={sameRole}
                    onChange={() => setSameRole(!sameRole)}
                    className='text-[8px] sm:text-xs md:text-sm'
                >
                    <span>
                        {`${translation['choose-all']}: ${translation[invitePeopleSelectRole]}`}
                    </span>
                </Checkbox>
                <Dropdown
                    menu={{
                            items: roles,
                            onClick: (e) => {
                                const selectedRole = roles.find((r) => r.key === Number(e.key))?.value;
                                setInvitePeopleSelectRole(selectedRole!);
                            }
                    }}
                >
                    <DownOutlined />
                </Dropdown>
            </div>
        )
    }

    const columns = [
        {
            title: <span className='text-[10px] sm:text-xs md:text-sm'>{translation['e-mail-address']}</span>,
            dataIndex: 'email',
            align: 'left' as const
        },
        {
            title: TitleColumn,
            dataIndex: 'roleStr',
            align: 'right' as const
        },
    ];

    const isValidEmail = () => { 
        if (selectedUsers?.length! <= 0) return Promise.reject(translation['empty-email-error']);

        const isEmailValid = selectedUsers?.every((email: string) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        });

        return isEmailValid ? Promise.resolve() : Promise.reject(translation['invalid-email-error']);
    }

    const addPeopleToProject = async () => {
        try{
            await form.validateFields();

            const users = selectedUsers?.map((user): IRole => {
                return {
                    email: user,
                    role: invitePeopleSelectRole,
                    roleStr: translation[invitePeopleSelectRole]
                }
            })

            setTableUsers(users);
            setProject({
                ...project,
                users: users
            })
        }
        catch{
            return null;
        }
    }

    return(
        <div>            
            <div className="w-full inline-flex justify-start items-center gap-x-2 mb-4">
                <span className="text-lg font-medium">
                    {translation['user-info']}
                </span>
                <div className="flex-1 h-px mr-auto w-full bg-gray-400/80"/>
            </div>
            <span>
                {translation['user-add-info']}
            </span>
            <Form.Item
                className='pt-4'
                name="users"
                rules={[{ validator: isValidEmail }]}
            >
                <div className='flex-col sm:flex sm:flex-row justify-between w-full gap-2'>
                    <Select
                        mode="tags"
                        placeholder={translation["enter-email-or-name"]}
                        tokenSeparators={[',']}
                        onChange={(e) => setSelectedUsers(e)}
                        options={existingUsers}
                        defaultValue={selectedUsers}
                    />
                    <div className='flex justify-center items-center ant-sm:mt-5'>
                        <Button
                            onClick={() => addPeopleToProject()} 
                            className="ant-sm:grow ant-sm:w-full self-center text-white bg-main-orange hover:bg-main-deep-orange disable-text-hover border-none inline-flex items-center place-content-center"
                        >
                            {translation['add-people']}
                        </Button>
                    </div>
                </div>
            </Form.Item>
            <hr />
            <Table
                scroll={{ x: 700 }}
                className='mt-8' 
                pagination={{ pageSize: 6 }}
                tableLayout="fixed"
                columns={columns} 
                dataSource={tableUsers} 
            />
        </div>
    )
}

export default UserInfo;