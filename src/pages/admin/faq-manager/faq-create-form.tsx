import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { BACKEND_URL } from "../../../env";
import { AuthTrue } from "../../../contexts/AuthProvider";

export function FaqCreateForm({ open, setOpen, update, auth }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    update: () => void;
    auth: AuthTrue;
}) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const onCreate = () => {
        if (!question || !answer) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        fetch(`${BACKEND_URL}/admin/faqs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.accessToken}`,
            },
            body: JSON.stringify({
                question,
                answer,
            }),
        }).then(async res => {
            const data = await res.json();

            if (res.ok) {
                update();
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo câu hỏi thành công.',
                });
                setQuestion("");
                setAnswer("");
                setOpen(false);
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: data.message || 'Đã xảy ra lỗi khi tạo câu hỏi.',
                });
            }
        });
    };

    const onCancel = () => {
        setOpen(false);
    };

    return <Modal
        title={<p>Loading Modal</p>}
        footer={
            <>
                <Button onClick={onCreate} type="primary">Tạo</Button>
                <Button onClick={onCancel}>Hủy</Button>
            </>
        }
        open={open}
        onCancel={() => setOpen(false)}
    >
        <div style={{
            gap: '16px',
            display: 'flex',
            flexDirection: 'column',
        }}
        >
            <Input
                placeholder="Nhập câu hỏi"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
            />

            <Input
                placeholder="Nhập câu trả lời"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
            />
        </div>
    </Modal>;
}
