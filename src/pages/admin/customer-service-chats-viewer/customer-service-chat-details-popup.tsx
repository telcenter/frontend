import { Button, Modal } from "antd";

export type ChatDetails = {
    summary: string;
    lastUpdateTime: string;
}

export function CustomerServiceChatDetailsPopup({ open, setOpen, chatDetails }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    chatDetails: ChatDetails;
}) {
    const onCancel = () => {
        setOpen(false);
    };

    return <Modal
        title={<p>Tóm tắt cuộc trò chuyện</p>}
        footer={
            <>
                <Button onClick={onCancel} type="primary">Đóng</Button>
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
            <h1>Tóm tắt cuộc trò chuyện</h1>
            <textarea
                style={{
                    width: '100%',
                    height: '300px',
                    resize: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                }}
                value={chatDetails.summary}
                readOnly
            />
            <p>Lần cuối cập nhật: {chatDetails.lastUpdateTime}</p>
        </div>
    </Modal>;
}
