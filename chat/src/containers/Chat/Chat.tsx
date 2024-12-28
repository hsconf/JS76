import { useEffect, useState, useRef } from "react";
import { Message } from "../../types";
import axiosApi from "../../axiosApi";
import Card from "../../components/Card/Card";

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const [lastMessageDate, setLastMessageDate] = useState<string | null>(null);

    const getData = async () => {
        try {
            const url = lastMessageDate ? `/messages?datetime=${lastMessageDate}` : "/messages";
            const { data } = await axiosApi.get<Message[]>(url);
            setMessages(prevMessages => [...prevMessages, ...data]);
            if (data.length > 0) {
                setLastMessageDate(data[data.length - 1].datetime);
            }
        } catch (e) {
            console.error("Some error", e);
        }
    };

    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        getData();
        const interval = setInterval(getData, 3000);
        return () => clearInterval(interval);
    }, [lastMessageDate]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        const data = new URLSearchParams();
        data.set('message', newMessage);
        data.set('author', 'try');

        try {
            await axiosApi.post("/messages", data);

            setNewMessage("");

        } catch (e) {
            console.error("Failed to send message", e);
        }
    };

    const formatDateTime = (datetime: string) => {
        const date = new Date(datetime);
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="h-75">
            <div className="overflow-y-scroll h-50">
                {messages.length === 0 ? (
                    <p>No messages</p>
                ) : (
                    messages.map((message) => (
                        <Card
                            author={message.author}
                            message={message.message}
                            datetime={formatDateTime(message.datetime)}
                            key={message.id}
                        />
                    ))
                )}
                <div ref={messageEndRef} /> {}
            </div>
            <form className="d-flex justify-content-between align-items-center gap-2 my-5" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="form-control"
                    placeholder="Type your message here"
                />
                <button type="submit" className="btn btn-success">Send</button>
            </form>
        </div>
    );
};

export default Chat;

