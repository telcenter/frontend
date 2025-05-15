import { useEffect, useRef, useState } from "react";

export const MessageInput = ({ sendMessage }: {
    sendMessage: (message: string) => void;
}) => {
    const [inputMessage, setInputMessage] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const [_isOneLine, setIsOneLine] = useState(true);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
            setInputMessage("");
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const newHeight = Math.min(textareaRef.current.scrollHeight, 127);
            textareaRef.current.style.height = `${newHeight}px`;
            // setIsOneLine(newHeight <= 47);
        }
    }, [inputMessage]);

    useEffect(() => {
        // Autofocus on page load
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (<>
        <div className="max-w-4xl mx-auto relative flex items-end">
            <div className="relative flex-grow">
                <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full p-3 pl-5 pr-16 border rounded-3xl resize-none overflow-hidden focus:border-gray-400 focus:outline-none"
                    placeholder="Nhập tin nhắn..."
                    rows={1}
                    style={{ minHeight: '47px', maxHeight: '127px' }}
                />
                <button type="button"
                    onClick={handleSendMessage}
                    className={`absolute right-1 bottom-1 w-10 h-10 bg-black rounded-full flex items-center justify-center`}
                    style={{
                        borderRadius: '100%',
                        transform: 'translateY(-8%)',
                    }}
                >
                    <div className="opacity-100">
                        <svg viewBox="0 0 24 24" fill="none" height="1.25em" color="white">
                            <path d="M3.113 6.178C2.448 4.073 4.64 2.202 6.615 3.19l13.149 6.575c1.842.921 1.842 3.55 0 4.472l-13.15 6.575c-1.974.987-4.166-.884-3.501-2.99L4.635 13H9a1 1 0 1 0 0-2H4.635z" fill="currentColor" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    </>);
};
