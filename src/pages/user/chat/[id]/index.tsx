import { useEffect, useRef, useState } from "react";
import { PhoneNumberProtected } from "../../../../components/PhoneNumberProtected";
import { useLocation, useParams } from "react-router";
import { BACKEND_URL } from "../../../../env";
import { notification } from "antd";
import { Message, MessageData, MessageDataSubset } from "../../../../components/Message";
import { MessageInput } from "../../../../components/MessageInput";
import { sendMessage } from "../../../../utils/sendMessage";

export default function ChatPage() {
    return <PhoneNumberProtected props={{}} component={({ user }) => {
        const [messages, setMessages] = useState<MessageDataSubset[]>([]);
        const [lastMessage, setLastMessage] = useState<MessageDataSubset | null>(null);
        const location = useLocation();
        const { id: rawId } = useParams<{ id: string }>();
        const id = parseInt(rawId || '0', 10);

        useEffect(() => {
            if (location.pathname !== `/user/chat/${id}`) {
                return;
            }

            fetch(`${BACKEND_URL}/end-user/chats/${id}/messages`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${user.accountId}`,
                },
            }).then(async res => {
                const data: MessageData[] = await res.json();
                if (res.ok) {
                    setMessages(data);
                } else {
                    console.error(data);
                    notification.error({
                        message: 'Lỗi',
                        description: 'Có lỗi xảy ra khi tải cuộc trò chuyện.',
                    });
                }
            });
        }, [location.pathname, id]);

        const isMobile = window.innerWidth <= 768;

        const [waitingForFirstResponseByte, setWaitingForFirstResponseByte] = useState(false);

        const messagesEndRef = useRef<HTMLDivElement>(null);

        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        const handleSendMessage = async (message: string) => {
            setMessages([
                ...messages,
                {
                    id: `${Date.now()}-${Math.random()}`,
                    text_content: message,
                    emotion: "",
                    created_at: new Date().toISOString(),
                    sender: "người dùng",
                },
            ]);

            setWaitingForFirstResponseByte(true);

            const lastMessageLocal: MessageDataSubset = {
                id: `${Date.now()}-${Math.random()}`,
                text_content: "",
                emotion: "",
                created_at: new Date().toISOString(),
                sender: "nhân viên",
            };
            sendMessage(
                {
                    chat_id: id,
                    ser_emotion: undefined,
                    text_content: message,
                },

                chunk => {
                    setWaitingForFirstResponseByte(false);
                    scrollToBottom();
                    if (chunk.error) {
                        notification.error({
                            message: 'Lỗi',
                            description: 'Có lỗi xảy ra khi gửi tin nhắn.',
                        });
                        setLastMessage(null);
                        return;
                    }
                    lastMessageLocal.text_content += chunk.data;
                    if (chunk.is_finished) {
                        setLastMessage(null);
                        setMessages(prev => [
                            ...prev,
                            lastMessageLocal,
                        ]);
                    } else {
                        setLastMessage(lastMessageLocal);
                    }
                },
            );
        };

        useEffect(() => {
            scrollToBottom();
        }, [messages]);

        return <div className="flex flex-col h-screen" style={{
            maxHeight: '80vh',
        }}>
            <div className="flex flex-col h-full max-w-4xl w-full mx-auto relative">
                <div className="relative overflow-y-auto mb-20" style={{
                    height: '90%',
                }}>
                    <div className={`flex-grow overflow-y-auto p-4 ${isMobile ? 'mt-16' : ''}`}>
                        {messages.map(message => (
                            <Message
                                message={message}
                            />
                        ))}

                        {waitingForFirstResponseByte && (
                            <div className="flex items-center space-x-1 mt-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounceCustom"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounceCustom" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounceCustom" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        )}

                        {lastMessage && <Message message={lastMessage} />}

                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="w-full absolute bottom-0">
                    <div className="p-4 w-full">
                        <MessageInput sendMessage={handleSendMessage} />
                    </div>
                </div>
            </div>
        </div>
    }} />;
}
