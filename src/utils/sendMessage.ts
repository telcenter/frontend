import { io } from 'socket.io-client';
import { BACKEND_URL } from '../env';

export type UserMessagePayload = {
    ser_emotion: string | undefined;
    chat_id: number;
    text_content: string;
};

export type MessageReplyChunk = {
    error: boolean;
    is_finished: boolean;
    data: string;
};

export function sendMessage(payload: UserMessagePayload, callback: (chunk: MessageReplyChunk) => any) {
    const socket = io(`${BACKEND_URL}`, {
        transports: ['websocket'],
    });

    socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        callback({ is_finished: true, error: true, data: 'Connection error: ' + error });
        socket.disconnect();
    });

    socket.on('connect', () => {
        socket.emit('message', payload);
    });

    socket.on('message', (output: MessageReplyChunk) => {
        callback(output);

        if (output.is_finished) {
            socket.disconnect();
        }
    });

    socket.on('error', (error: Error) => {
        console.error('Socket error:', error);
    });
}
