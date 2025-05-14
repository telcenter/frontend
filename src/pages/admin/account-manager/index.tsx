import { Button, Table } from "antd";
import { AdminAuthProtected } from "../../../components/AdminAuthProtected";
import { AccountCreateForm } from "./account-create-form";
import { useAccountTable } from "./hooks/useAccountTable";
import { useState } from "react";

export default function AccountManagerPage() {
    const { data, columns, update } = useAccountTable();

    const [createFormOpen, setCreateFormOpen] = useState(false);

    return <AdminAuthProtected props={{}} component={({ auth }) => (
        <>
            <AccountCreateForm
                open={createFormOpen} setOpen={setCreateFormOpen}
                update={update} auth={auth}
            />

            <div>
                <h1>Quản lý tài khoản</h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginBottom: '16px',
                }}>
                    <Button type="primary" onClick={() => setCreateFormOpen(true)}>
                        Thêm tài khoản
                    </Button>
                </div>

                <Table
                    dataSource={data}
                    columns={columns}
                />
            </div>
        </>
    )} />;
}
