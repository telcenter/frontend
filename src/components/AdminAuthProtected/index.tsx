import { Link, useNavigate } from "react-router";
import { AuthTrue, useAuth } from "../../contexts/AuthProvider";
import { Button, notification, Popover } from "antd";

function AuthOptions() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        setAuth({
            authenticated: false,
        });
        notification.success({
            message: 'Đăng xuất thành công',
            description: 'Bạn đã đăng xuất khỏi tài khoản quản trị viên.',
        });
        navigate('/admin');
    };

    return auth.authenticated ? <>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        }}>
            <h2>Thông tin tài khoản</h2>
            <p>ID: {auth.admin.id}</p>
            <p>Email: {auth.admin.email}</p>
            <Button onClick={logout}>Đăng xuất</Button>
        </div>
    </> : <></>;
}

export function AdminAuthProtected<T extends {}>({
    component,
    props,
}: {
    component: React.FC<T & { auth: AuthTrue }>;
    props: T;
} & T) {
    const { auth } = useAuth();

    if (auth.authenticated && auth.admin) {
        return <>
            <div style={{
                display: 'flex',
                width: '100%',
                minWidth: '90vw',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Link to={"/admin"}>Trang quản trị</Link>
                <Popover content={<AuthOptions />} trigger="click">
                    <Button type="primary">Tài khoản {auth.admin.email}</Button>
                </Popover>
            </div>
            <div>
                {component({
                    ...props,
                    auth,
                })}
            </div>
        </>;
    }

    return (
        <div>
            <h2>Bạn không thể truy cập trang này khi chưa đăng nhập tài khoản quản trị viên.</h2>
            <p><Link to={'/admin/login'}>Đăng nhập hoặc đăng ký tài khoản quản trị viên</Link></p>
        </div>
    );
}
