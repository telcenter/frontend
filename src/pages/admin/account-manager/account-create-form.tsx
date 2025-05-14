import { useState } from "react";
import { AuthTrue } from "../../../contexts/AuthProvider";
import { BACKEND_URL } from "../../../env";
import { Button, Input, Modal, notification, Select } from "antd";

const accountStatuses = [
    'Đang hoạt động',
    'Ngừng hoạt động',
] as const;

type AccountStatus = typeof accountStatuses[number];

export function AccountCreateForm({ open, setOpen, update, auth }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    update: () => void;
    auth: AuthTrue;
}) {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState<AccountStatus>("Đang hoạt động");

    const onCreate = () => {
        if (!fullName || !phoneNumber) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        fetch(`${BACKEND_URL}/admin/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`,
            },
            body: JSON.stringify({
                full_name: fullName,
                phone_number: phoneNumber,
                status,
            }),
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                update();
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo tài khoản thành công.',
                });
                setFullName("");
                setPhoneNumber("");
                setStatus("Đang hoạt động");
                setOpen(false);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tạo tài khoản.',
                });
            }
        });
    };

    const onCancel = () => {
        setOpen(false);
    };

    return <Modal
        title={<p>Tạo tài khoản mới</p>}
        footer={
            <>
                <Button onClick={onCreate} type="primary">Tạo</Button>
                <Button onClick={onCancel}>Hủy</Button>
            </>
        }
        open={open}
        onCancel={onCancel}
    >
        <div style={{
            gap: '16px',
            display: 'flex',
            flexDirection: 'column',
        }}
        >
            <Input
                placeholder="Nhập họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <Input
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <Select
                placeholder="Chọn trạng thái tài khoản"
                showSearch
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                value={status}
                onChange={(value) => setStatus(value as AccountStatus)}
                options={accountStatuses.map((status) => ({
                    label: status,
                    value: status,
                }))}
                style={{ width: '100%' }}
            />
        </div>
    </Modal>
}