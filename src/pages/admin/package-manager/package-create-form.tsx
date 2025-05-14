import { useState } from "react";
import { AuthTrue } from "../../../contexts/AuthProvider";
import { Button, Input, Modal, notification } from "antd";
import { BACKEND_URL } from "../../../env";

export function PackageCreateForm({ open, setOpen, update, auth, packageMetadataInterpretations }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    update: () => void;
    auth: AuthTrue;
    packageMetadataInterpretations: any[];
}) {
    const [packageName, setPackageName] = useState("");
    const [metadata, setMetadata] = useState<Record<string, string>>({});

    const onCreate = () => {
        if (!packageName) {
            alert("Vui lòng nhập tên gói cước.");
            return;
        }

        fetch(`${BACKEND_URL}/admin/packages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`,
            },
            body: JSON.stringify({
                name: packageName,
                metadata: JSON.stringify(metadata),
            }),
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                update();
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo gói cước thành công.',
                });
                setPackageName("");
                setMetadata({});
                setOpen(false);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tạo gói cước.'
                });
            }
        })
    };

    const onCancel = () => {
        setOpen(false);
    };

    return <Modal
        title={<p>Tạo gói cước mới</p>}
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
        }}>
            <Input
                placeholder="Nhập tên gói cước"
                onChange={(e) => setPackageName(e.target.value)}
                value={packageName}
            />

            {
                packageMetadataInterpretations.map((intp, index) => {
                    return <Input
                        key={index}
                        placeholder={intp.field_local_name}
                        onChange={(e) => {
                            setMetadata({
                                ...metadata,
                                [intp.field_name]: e.target.value,
                            });
                        }}
                        value={metadata[intp.field_name]}
                    />;
                })
            }
        </div>
    </Modal>
}
