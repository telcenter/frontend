import { useState } from "react";
import { AdminAuthProtected } from "../../../components/AdminAuthProtected";
import { usePackageTable } from "./hooks/usePackageTable";
import { PackageCreateForm } from "./package-create-form";
import { Button, Table } from "antd";
import { useNavigate } from "react-router";

export default function PackageManagerPage() {
    const { data, columns, update, packageMetadataInterpretations } = usePackageTable();

    const [createFormOpen, setCreateFormOpen] = useState(false);

    const navigate = useNavigate();

    return <AdminAuthProtected props={{}} component={({ auth }) => (
        <>
            <PackageCreateForm
                open={createFormOpen} setOpen={setCreateFormOpen}
                update={update} auth={auth}
                packageMetadataInterpretations={packageMetadataInterpretations}
            />

            <div>
                <h1>Quản lý gói cước</h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginBottom: '16px',
                }}>
                    <Button type="primary" onClick={() => setCreateFormOpen(true)}>
                        Thêm gói cước
                    </Button>

                    <Button onClick={() => navigate("/admin/package-metadata-interpretation-manager")} style={{ marginLeft: '16px' }}>
                        Cài đặt định dạng thông tin gói cước
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
