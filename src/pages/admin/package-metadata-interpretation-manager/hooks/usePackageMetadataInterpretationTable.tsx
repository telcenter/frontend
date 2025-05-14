import { Button, notification, Space } from "antd";
import { BACKEND_URL } from "../../../../env";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/AuthProvider";

export function usePackageMetadataInterpretationTable() {
    const [data, setData] = useState([]);
    const { auth } = useAuth();

    const update = () => {
        if (!auth.authenticated) return;

        fetch(`${BACKEND_URL}/admin/package-metadata-interpretations`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                setData(data);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tải danh sách thông tin gói cước.',
                });
            }
        });
    };

    useEffect(() => {
        update();
    }, [auth]);

    const handleDelete = (record: any) => {
        if (!auth.authenticated) return;

        fetch(`${BACKEND_URL}/admin/package-metadata-interpretations/${record.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                update();
                notification.success({
                    message: 'Thành công',
                    description: 'Xóa thông tin gói cước thành công.',
                });
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi xóa thông tin gói cước.',
                });
            }
        });
    };

    const columns = [
        {
            title: "Mã trường",
            dataIndex: "field_name",
            key: "field_name",
        },

        {
            title: "Tên trường",
            dataIndex: "field_local_name",
            key: "field_local_name",
        },

        {
            title: "Giải thích, ý nghĩa",
            dataIndex: "field_interpretation",
            key: "field_interpretation",
        },

        {
            title: "Thao tác",
            key: "action",
            render: (_text: any, record: any) => (
                <Space size="middle">
                    <Button onClick={() => handleDelete(record)}>Xóa</Button>
                </Space>
            ),
        }
    ];

    return {
        data,
        columns,
        update,
    };
}
