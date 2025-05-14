import { useState } from "react";
import { useCustomerServiceChatsTable } from "./hooks/useCustomerServiceChatsTable";
import { ChatDetails, CustomerServiceChatDetailsPopup } from "./customer-service-chat-details-popup";
import { AdminAuthProtected } from "../../../components/AdminAuthProtected";
import { Table } from "antd";

export default function CustomerServiceChatsViewerPage() {
    const [chatDetails, setChatDetails] = useState<ChatDetails>({
        summary: "",
        lastUpdateTime: "",
    });
    const [chatDetailsOpen, setChatDetailsOpen] = useState(false);
    const [currentChatIdInDetails, setCurrentChatIdInDetails] = useState<number | null>(null);

    const { data, columns, lastUpdateTime } = useCustomerServiceChatsTable({
        setChatDetails,
        setChatDetailsOpen,
        currentChatIdInDetails,
        setCurrentChatIdInDetails,
    });

    return <AdminAuthProtected props={{}} component={() => (
        <>
            <CustomerServiceChatDetailsPopup
                open={chatDetailsOpen}
                setOpen={setChatDetailsOpen}
                chatDetails={chatDetails}
            />

            <div>
                <h1>Theo dõi cuộc trò chuyện với khách hàng</h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    marginBottom: '16px',
                }}>
                    <p style={{ marginRight: '16px' }}>Lần cuối cập nhật: {lastUpdateTime}</p>
                </div>

                <Table
                    dataSource={data}
                    columns={columns}
                />
            </div>
        </>
    )} />;
}
