import { AdminAuthProtected } from "../../../components/AdminAuthProtected";

export default function PackageManagerPage() {
    return <AdminAuthProtected props={{}} component={() => (
        <div>
            <h1>Quản lý gói</h1>
            <p>Chức năng này đang được phát triển.</p>
        </div>
    )} />;
}
