import { useState } from "react";
import { BACKEND_URL } from "../../../env";
import { Button, Input, Modal, notification } from "antd";
import { AuthTrue } from "../../../contexts/AuthProvider";

export function PackageMetadataInterpretationCreateForm({ open, setOpen, update, auth }: {
    open: boolean,
    setOpen: (open: boolean) => void,
    update: () => void,
    auth: AuthTrue,
}) {
    const [fieldName, setFieldName] = useState("");
    const [fieldLocalName, setFieldLocalName] = useState("");
    const [fieldInterpretation, setFieldInterpretation] = useState("");

    const onCreate = () => {
        if (!fieldName || !fieldLocalName || !fieldInterpretation) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        fetch(`${BACKEND_URL}/admin/package-metadata-interpretations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`,
            },
            body: JSON.stringify({
                field_name: fieldName,
                field_local_name: fieldLocalName,
                field_interpretation: fieldInterpretation,
            }),
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                update();
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo thông tin gói cước thành công.',
                });
                setFieldName("");
                setFieldLocalName("");
                setFieldInterpretation("");
                setOpen(false);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tạo thông tin gói cước.',
                });
            }
        });
    };

    const onCancel = () => {
        setOpen(false);
    };

    return <Modal
        title={<p>Tạo thông tin gói cước mới</p>}
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
                placeholder="Mã trường thông tin của gói cước"
                onChange={(e) => setFieldName(e.target.value)}
                value={fieldName}
            />

            <Input
                placeholder="Tên trường thông tin của gói cước"
                onChange={(e) => setFieldLocalName(e.target.value)}
                value={fieldLocalName}
            />

            <Input
                placeholder="Ý nghĩa, giải thích trường thông tin của gói cước"
                onChange={(e) => setFieldInterpretation(e.target.value)}
                value={fieldInterpretation}
            />
        </div>
    </Modal>;
}
