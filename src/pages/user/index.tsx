import { Button, Input, notification, Space } from "antd";
import { useUser } from "../../contexts/UserProvider";
import { useState } from "react";
import { useNavigate } from "react-router";
import { BACKEND_URL, FRONTEND_AUDIOCALL_URL } from "../../env";

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
        const newUserObject = {
            accountId: account.id,
            fullName: account.full_name,
            phoneNumber: account.phone_number,
            createdAt: account.created_at,
            status: account.status,
            balance: account.balance,
        };
        setUser(newUserObject);
        return newUserObject;
    };

    const onChat = () => {
        verifyPhoneNumber().then(() => navigate('/user/chat'));
    };

    const onCall = () => {
        verifyPhoneNumber().then(async user => {
            const res = await fetch(`${BACKEND_URL}/end-user/audio-calls`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.accountId}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: user.phoneNumber,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo cuộc trò chuyện thành công.',
                });
                window.open(`${FRONTEND_AUDIOCALL_URL}?chatId=${data.id}&accountId=${data.account_id}&phoneNumber=${phoneNumber}`, '_blank');
            } else {
                console.error(data);
                notification.error({
                    message: 'Lỗi',
                    description: 'Có lỗi xảy ra khi tạo cuộc trò chuyện.',
                });
            }
        });
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
