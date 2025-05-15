import { useEffect, useState } from "react";
import { PhoneNumberProtected } from "../../../components/PhoneNumberProtected";
import { BACKEND_URL } from "../../../env";
import { Button, notification, Table } from "antd";
import { useLocation, useNavigate } from "react-router";
import { Format } from "../../../utils/format";
import { ButtonLink } from "../../../components/ButtonLink";

export default function ChatHomePage() {
    return <PhoneNumberProtected props={{}} component={({ user }) => {
        const [chats, setChats] = useState<any[]>([]);
        const location = useLocation();
        const navigate = useNavigate();

        const createNewChat = async () => {
            const res = await fetch(`${BACKEND_URL}/end-user/text-chats`, {
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
                navigate(`/user/chat/${data.id}`);
            } else {
                console.error(data);
                notification.error({
                    message: 'Lỗi',
                    description: 'Có lỗi xảy ra khi tạo cuộc trò chuyện.',
                });
            }
        };

        useEffect(() => {
            if (location.pathname !== '/user/chat') {
                return;
            }

            fetch(`${BACKEND_URL}/end-user/chats`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.accountId}`,
                },
            }).then(async res => {
                const data: any[] = await res.json();
                if (res.ok) {
                    setChats(data.filter(c => c.type === 'nhắn tin'));
                } else {
                    console.error(data);
                    notification.error({
                        message: 'Lỗi',
                        description: 'Có lỗi xảy ra khi tải danh sách cuộc trò chuyện.',
                    });
                }
            });
        }, [location]);

        const columns = [
            {
                title: "Loại",
                dataIndex: "type",
                key: "type",
            },

            {
                title: "Ngày tạo",
                dataIndex: "created_at",
                key: "created_at",
                render: Format.datetime,
            },

            {
                title: "Mức độ hài lòng",
                dataIndex: "customer_satisfaction",
                key: "customer_satisfaction",
            },

            {
                title: "Hành động",
                key: "action",
                render: (_text: any, record: any) => (
                    <ButtonLink type="primary" to={`/user/chat/${record.id}`}>
                        Mở
                    </ButtonLink>
                ),
            }
        ]

        return <div>
            <h1>Tin nhắn CSKH</h1>

            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginBottom: '16px',
            }}>
                <Button type="primary" onClick={createNewChat}>
                    Tạo cuộc trò chuyện mới
                </Button>
            </div>

            <Table
                dataSource={chats}
                columns={columns}
            />
        </div>;
    }} />;
}
