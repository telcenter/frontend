import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../env";
import { useAuth } from "../../../contexts/AuthProvider";
import { Button, notification } from "antd";

export function useFaqTable() {
    const [faqList, setFaqList] = useState([]);
    const { auth } = useAuth();

    const update = () => {
        if (!auth.authenticated) return;

        fetch(`${BACKEND_URL}/admin/faqs`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                setFaqList(data);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tải danh sách câu hỏi thường gặp.',
                });
            }
        });
    };

    useEffect(() => {
        update();
    }, [auth]);

    const handleDelete = (record: any) => {
        if (!auth.authenticated) return;

        fetch(`${BACKEND_URL}/admin/faqs/${record.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                setFaqList(faqList.filter((item: any) => item.id !== record.id));
                notification.success({
                    message: 'Thành công',
                    description: 'Xóa câu hỏi thành công.',
                });
                update();
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi xóa câu hỏi.',
                });
            }
        });
    };

    const columns = [
        {
            title: "Câu hỏi",
            dataIndex: "question",
            key: "question",
        },

        {
            title: "Câu trả lời",
            dataIndex: "answer",
            key: "answer",
        },

        {
            title: "Thao tác",
            key: "action",
            render: (_text: string, record: any) => (
                <span>
                    <Button onClick={() => handleDelete(record)}>Xóa</Button>
                </span>
            ),
        },
    ];

    return {
        data: faqList,
        columns,
        update,
    };
}