import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../contexts/AuthProvider";
import { BACKEND_URL } from "../../../../env";
import { Button, notification, Space } from "antd";
import { useLocation } from "react-router";
import { Format } from "../../../../utils/format";
import { ChatDetails } from "../customer-service-chat-details-popup";

export function useCustomerServiceChatsTable({
    setChatDetails,
    setChatDetailsOpen,
    currentChatIdInDetails,
    setCurrentChatIdInDetails,
}: {
    setChatDetails: (chatDetails: ChatDetails) => void;
    setChatDetailsOpen: (open: boolean) => void;
    currentChatIdInDetails: number | null;
    setCurrentChatIdInDetails: (id: number | null) => void;
}) {
    const [chats, setChats] = useState<any[]>([]);
    const [lastUpdateTime, setLastUpdateTime] = useState("");
    const { auth } = useAuth();
    const location = useLocation();

    const update = () => {
        if (!auth.authenticated) return;

        fetch(`${BACKEND_URL}/admin/customer-service-chats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                setChats(data);
                setLastUpdateTime(Format.datetime(new Date()));
                if (currentChatIdInDetails) {
                    const chat = data.find((chat: any) => chat.id === currentChatIdInDetails);
                    if (chat) {
                        setChatDetails({
                            summary: chat.summary,
                            lastUpdateTime: lastUpdateTime,
                        });
                    } else {
                        setChatDetails({
                            summary: "Không còn tìm thấy cuộc trò chuyện này.",
                            lastUpdateTime: lastUpdateTime,
                        })
                    }
                }
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tải danh sách cuộc trò chuyện.',
                });
            }
        });
    };

    const updateInterval = useRef<number | null>(null);

    useEffect(() => {
        if (updateInterval.current !== null) {
            clearInterval(updateInterval.current);
        }
        updateInterval.current = null;
        if (location.pathname === '/admin/customer-service-chats-viewer') {
            update();
            updateInterval.current = (
                setInterval(() => update(), 2500)
            );
        }
        return () => {
            if (updateInterval.current !== null) {
                clearInterval(updateInterval.current);
            }
            updateInterval.current = null;
        };
    }, [auth, location]);

    const columns = [
        {
            title: "Tên khách hàng",
            dataIndex: "account.full_name",
            key: "account.full_name",
        },

        {
            title: "Số điện thoại",
            dataIndex: "account.phone_number",
            key: "account.phone_number",
        },

        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
        },

        {
            title: "Thời gian bắt đầu",
            dataIndex: "created_at",
            key: "created_at",
            render: Format.datetime,
        },

        {
            title: "Ước tính mức độ hài lòng của khách hàng",
            dataIndex: "customer_satisfaction",
            key: "customer_satisfaction",
        },

        {
            title: "Hành động",
            key: "action",
            render: (_text: string, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        setChatDetailsOpen(true);
                        setCurrentChatIdInDetails(record.id);
                        setChatDetails({
                            summary: record.summary,
                            lastUpdateTime: record.updated_at,
                        });
                    }}>Xem tóm tắt</Button>

                    <Button onClick={() => {
                        alert("Chức năng này chưa được triển khai.\n\nĐây là chức năng cho phép quản trị viên dừng chế độ trả lời tự động đối với cuộc trò chuyện này, và tiếp tục cuộc trò chuyện với khách hàng.\n\nChức năng này sẽ được triển khai trong các phiên bản sau.");
                    }}>Tiếp quản</Button>
                </Space>
            ),
        }
    ];

    return {
        data: chats,
        columns,
        update,
        lastUpdateTime,
    };
}
