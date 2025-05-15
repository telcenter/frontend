import { Button, Input, notification, Space } from "antd";
import { useUser } from "../../contexts/UserProvider";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../../env";

const getAccountByPhoneNumber = async (phoneNumber: string): Promise<{
    id: number;
    full_name: string;
    phone_number: string;
    created_at: string;
    status: string;
    balance: number;
}> => {
    if (!phoneNumber) {
        notification.error({
            message: 'Lỗi',
            description: 'Vui lòng nhập số điện thoại.',
        });
        throw new Error('Vui lòng nhập số điện thoại.');
    }
    const res = await fetch(`${BACKEND_URL}/end-user/accounts-by-phone-number/${phoneNumber}`, {
        method: 'GET',
    });
    const data = await res.json();
    if (!res.ok) {
        notification.error({
            message: 'Lỗi',
            description: data.message || 'Có lỗi xảy ra, vui lòng thử lại sau.',
        });
        throw new Error(data.message);
    }
    return data;
};

export default function UserPage() {
    const { user, setUser } = useUser();
    const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber || "");
    const navigate = useNavigate();

    const verifyPhoneNumber = async () => {
        const account = await getAccountByPhoneNumber(phoneNumber);
        setUser({
            accountId: account.id,
            fullName: account.full_name,
            phoneNumber: account.phone_number,
            createdAt: account.created_at,
            status: account.status,
            balance: account.balance,
        });
    };

    const onChat = () => {
        verifyPhoneNumber().then(() => navigate('/user/chat'));
    };

    const onCall = () => {
        verifyPhoneNumber().then(() => navigate('/user/call'));
    };

    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}>
                <h1>Tổng đài Chăm sóc khách hàng (CSKH)</h1>

                <div>
                    <Input
                        placeholder="Nhập số điện thoại của bạn"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        style={{ width: '300px' }}
                    />
                </div>

                <div>
                    <Space size='middle' direction="vertical">
                        <Button type="primary" onClick={onChat}>Nhắn tin SMS với chúng tôi</Button>
                        <Button onClick={onCall}>Gọi điện cho chúng tôi</Button>
                    </Space>
                </div>
            </div>
        </>
    );
}
