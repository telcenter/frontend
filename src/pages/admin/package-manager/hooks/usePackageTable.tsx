import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../../contexts/AuthProvider";
import { notification } from "antd";
import { BACKEND_URL } from "../../../../env";
import { Format } from "../../../../utils/format";
import { useLocation } from "react-router";

export function usePackageTable() {
    const [packages, _setPackages] = useState<any[]>([]);
    const [packageMetadataInterpretations, setPackageMetadataInterpretations] = useState<any[]>([]);
    const { auth } = useAuth();

    const location = useLocation();

    const setPackages = (data: any[]) => {
        const newData = data.map(item => {
            const metadata = JSON.parse(item.metadata);
            const newItem = { ...item };
            // delete newItem.metadata;

            for (const key in metadata) {
                if (metadata.hasOwnProperty(key)) {
                    newItem[key] = metadata[key];
                }
            }

            return newItem;
        });

        _setPackages(newData);
    };

    const update = () => {
        if (!auth.authenticated) return;

        fetch(`${BACKEND_URL}/admin/packages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                setPackages(data);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tải danh sách gói cước.',
                });
            }
        });

        fetch(`${BACKEND_URL}/admin/package-metadata-interpretations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                setPackageMetadataInterpretations(data);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tải danh sách thông tin gói cước.',
                });
            }
        });
    };

    useEffect(() => {
        if (location.pathname !== '/admin/package-manager') return;
        update();
    }, [auth, location]);

    const handleDelete = (record: any) => {
        if (!auth.authenticated) return;

        fetch(`${BACKEND_URL}/admin/packages/${record.id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                setPackages(packages.filter((item: any) => item.id !== record.id));
                notification.success({
                    message: 'Thành công',
                    description: 'Xóa gói cước thành công.',
                });
                update();
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi xóa gói cước.',
                });
            }
        });
    };

    const columns = useMemo(() => {
        return [
            {
                title: "Tên gói cước",
                dataIndex: "name",
                key: "name",
            },

            {
                title: "Ngày tạo",
                dataIndex: "created_at",
                key: "created_at",
                render: Format.datetime,
            },

            ...packageMetadataInterpretations.map(intp => {
                return {
                    title: intp.field_local_name,
                    dataIndex: intp.field_name,
                    key: intp.field_name,
                };
            }),

            {
                title: "Thao tác",
                key: "action",
                render: (_text: string, record: any) => (
                    <span>
                        <a onClick={() => handleDelete(record)}>Xóa</a>
                    </span>
                ),
            },
        ];
    }, [packageMetadataInterpretations]);

    return {
        data: packages,
        columns,
        update,
        packageMetadataInterpretations,
    };
}
