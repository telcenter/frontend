import { AdminAuthProtected } from "../../components/AdminAuthProtected";
import { ButtonLink } from "../../components/ButtonLink";

export default function AdminPage() {
    return <AdminAuthProtected props={{}} component={({ auth }) => {
        return (
            <div>
                <div>
                    <h1>Trang quản trị</h1>
                    <p>ID: {auth.admin.id}</p>
                    <p>Email: {auth.admin.email}</p>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                    <ButtonLink to={'/admin/package-manager'}>Quản lý gói cước</ButtonLink>
                    <ButtonLink to={'/admin/faq-manager'}>Quản lý câu hỏi thường gặp</ButtonLink>
                </div>
            </div>
        );
    }} />;
}
