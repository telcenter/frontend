import { Link, useNavigate } from "react-router";
import { UserTrue, useUser } from "../../contexts/UserProvider";
import { Button, Popover } from "antd";
import { Format } from "../../utils/format";

function UserOptions() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const switchPhoneNumber = () => {
        setUser({
            phoneNumber: null,
        });
        navigate('/user');
    };

    return user.phoneNumber ? <>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        }}>
            <h2 style={{ fontWeight: 'bold' }}>Thông tin thuê bao</h2>
            <p>ID: {user.accountId}</p>
            <p>Số điện thoại: {user.phoneNumber}</p>
            <p>Họ tên: {user.fullName}</p>
            <p>Ngày tạo: {Format.datetime(user.createdAt)}</p>
            <p>Trạng thái: {user.status}</p>
            <p>Số dư: {user.balance}</p>
            <Button onClick={switchPhoneNumber}>Đổi số điện thoại</Button>
        </div>
    </> : <></>;
}

export function PhoneNumberProtected<T extends {}>({
    component,
    props,
}: {
    component: React.FC<T & { user: UserTrue }>;
    props: T;
} & T) {
    const { user } = useUser();

    if (!user.phoneNumber) {
        return <>
            <h1>Who are you?</h1>
            <p>Vui lòng nhập thông tin thuê bao của bạn <Link to={'/user'}>tại đây.</Link></p>
        </>
    }

    return <>
        <div style={{
            display: 'flex',
            width: '100%',
            minWidth: '90vw',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <Link to={"/user"}>Trang chủ dịch vụ</Link>
            <Popover content={<UserOptions />} trigger="click">
                <Button type="primary">SĐT {user.phoneNumber}</Button>
            </Popover>
        </div>

        <div style={{
            marginTop: '3rem',
        }}>
            {component({
                ...props,
                user,
            })}
        </div>
    </>;
}