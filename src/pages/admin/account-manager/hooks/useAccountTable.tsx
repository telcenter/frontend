import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../../env";
import { Button, notification, Space } from "antd";
import { Format } from "../../../../utils/format";
import { useAuth } from "../../../../contexts/AuthProvider";
import { useLocation } from "react-router";

export function useAccountTable() {
    const [accounts, setAccounts] = useState<any[]>([]);
    const { auth } = useAuth();
    const location = useLocation();

    const update = () => {
        if (!auth.authenticated) return;

        fetch(`${BACKEND_URL}/admin/accounts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.accessToken}`,
            },
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                setAccounts(data);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tải danh sách tài khoản.',
                });
            }
        });
    };

    useEffect(() => {
        if (location.pathname !== "/admin/account-manager") {
            return;
        }
        update();
    }, [auth, location]);

    const handleDelete = (record: any) => {
        if (!auth.authenticated) return;

        fetch(`${BACKEND_URL}/admin/accounts/${record.id}`, {
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
                    description: 'Xóa tài khoản thành công.',
                });
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi xóa tài khoản.',
                });
            }
        });
    };

    const handleBalanceChange = (record: any) => {
        if (!auth.authenticated) return;

        let newBalance: number;
        
        for (;;) {
            const newBalanceRaw = prompt("Nhập số dư mới:", record.balance.toString());
            if (newBalanceRaw === null) {
                return;
            }
            newBalance = parseFloat(newBalanceRaw);
            if (!isNaN(newBalance) && newBalance >= 0) {
                break;
            }
            alert("Số dư không hợp lệ. Vui lòng nhập lại.");
        }
        

        fetch(`${BACKEND_URL}/admin/accounts/${record.id}/balance`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`,
            },
            body: JSON.stringify({
                balance: newBalance,
            }),
        }).then(async res => {
            const data = await res.json();
            if (res.ok) {
                update();
                notification.success({
                    message: 'Thành công',
                    description: 'Cập nhật số dư thành công.',
                });
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi cập nhật số dư.',
                });
            }
        });
    };

    const columns = [
        {
            title: "Số thuê bao",
            dataIndex: "phone_number",
            key: "phone_number",
        },

        {
            title: "Họ và tên chủ tài khoản",
            dataIndex: "full_name",
            key: "full_name",
        },

        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
            render: Format.datetime,
        },

        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },

        {
            title: "Số dư",
            dataIndex: "balance",
            key: "balance",
        },

        {
            title: "Thao tác",
            key: "action",
            render: (_text: any, record: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleBalanceChange(record)}>Cập nhật số dư</Button>
                    <Button onClick={() => handleDelete(record)}>Xóa</Button>
                </Space>
            ),
        }
    ];

    return {
        data: accounts,
        columns,
        update,
    };
}
