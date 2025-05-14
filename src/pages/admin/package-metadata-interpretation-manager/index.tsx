import { Button, Table } from "antd";
import { AdminAuthProtected } from "../../../components/AdminAuthProtected";
import { usePackageMetadataInterpretationTable } from "./hooks/usePackageMetadataInterpretationTable";
import { PackageMetadataInterpretationCreateForm } from "./package-metadata-interpretation-create-form";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function PackageMetadataInterpretationManagerPage() {
    const { data, columns, update } = usePackageMetadataInterpretationTable();

    const [createFormOpen, setCreateFormOpen] = useState(false);

    const navigate = useNavigate();

    return <AdminAuthProtected props={{}} component={({ auth }) => (
        <>
            <PackageMetadataInterpretationCreateForm
                open={createFormOpen} setOpen={setCreateFormOpen}
                update={update} auth={auth}
            />

            <div>
                <h1>Quản lý định dạng thông tin gói cước</h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginBottom: '16px',
                }}>
                    <Button type="primary" onClick={() => setCreateFormOpen(true)}>
                        Thêm trường thông tin gói cước
                    </Button>

                    <Button onClick={() => navigate('/admin/package-manager')} style={{ marginLeft: '16px' }}>
                        Quản lý gói cước
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
