import { Button, Table } from "antd";
import { AdminAuthProtected } from "../../../components/AdminAuthProtected";
import { useFaqTable } from "./hooks";
import { useState } from "react";
import { FaqCreateForm } from "./faq-create-form";

export default function FaqManagerPage() {
    const { data, columns, update } = useFaqTable();

    const [createFormOpen, setCreateFormOpen] = useState(false);

    return <AdminAuthProtected props={{}} component={({ auth }) => (
        <>
            <FaqCreateForm open={createFormOpen} setOpen={setCreateFormOpen} update={update} auth={auth} />

            <div>
                <h1>Quản lý câu hỏi thường gặp</h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginBottom: '16px',
                }}>
                    <Button type="primary" onClick={() => setCreateFormOpen(true)}>
                        Thêm câu hỏi
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
