import { Image } from "antd";
import { useMemo } from "react";

export type MessageData = {
    id: number;
    chat_id: number;
    text_content: string;
    emotion: string;
    created_at: string;
    sender: string;
};

export type MessageDataSubset = {
    id: number | string;
    text_content: string;
    emotion: string;
    created_at: string;
    sender: string;
};

export function Message({ message }: { message: MessageDataSubset }) {
    const sentByUser = message.sender === 'người dùng';
    const avatarSrc = sentByUser ? '/images/user.png' : '/images/viettel.png';
    const senderName = sentByUser ? 'Bạn' : 'Viettel';
    const content = useMemo(() => {
        return message.text_content.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    }, [message.text_content]);

    return (
        <div className={`flex flex-col mb-4 ${sentByUser ? 'items-end ml-20' : 'items-start mr-20'}`} key={message.id}>
            <div className={`flex items-center mb-1 ${sentByUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <Image
                    src={avatarSrc}
                    alt={`${senderName}'s avatar`}
                    width={24}
                    height={24}
                    className={`rounded-full ${sentByUser ? 'ml-2' : 'mr-2'}`}
                />
                <span className={`text-sm font-medium text-gray-700 ${sentByUser ? 'mr-2' : 'ml-2'}`}>{senderName}</span>
            </div>
            <div className={`p-3 rounded-lg break-words inline-block ${sentByUser ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                <p className={`${sentByUser ? 'text-white' : 'text-gray-800'}`} style={{
                    textAlign: 'left',
                }}>
                    {content}
                </p>
            </div>
        </div>
    );
}
