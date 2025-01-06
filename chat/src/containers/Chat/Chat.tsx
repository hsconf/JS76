import {useEffect, useState, useCallback} from "react";
import {Message, Messages} from "../../types";
import axiosApi from "../../axiosApi";
import dayjs from "dayjs";
import {Button, Card, CardContent, Grid2, TextField, Typography} from "@mui/material";
import * as React from "react";

const Chat = () => {
    const currentDate = dayjs();
    const formattedDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
    const [messages, setMessages] = useState<Message>({
        message: '',
        author: '',
        datetime: formattedDate
    });
    const [msgs, setMsgs] = useState<Messages[]>([]);

    const getMsgs = useCallback(async () => {
        try {
            const {data: response} = await axiosApi.get("/chat");
            setMsgs(response);
        } catch (e) {
            console.log(e);
        }
    }, [])


    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessages(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (messages.author.trim() && messages.message.trim()) {
            try {
                await axiosApi.post('/chat', JSON.stringify(messages), {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setMessages(prev => ({...prev, message: ''}));
            } catch (e) {
                console.log(e);
            }
        } else {
            alert("Author and message cannot be empty");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            void getMsgs();
        }, 3000);

        return () => clearInterval(interval);
    }, [getMsgs]);

    useEffect(() => {
        void getMsgs();
    }, [getMsgs]);

    const drawMessages = msgs.slice(0, 30);

    return (
        <div>
            <Grid2 container justifyContent="center">
                <Grid2 size={10} sx={{overflowY: 'scroll', height: '80vh'}}>
                    {msgs.length > 0 ? drawMessages.reverse().map((msg: Messages) => (
                        <Card sx={{ minWidth: 275, marginTop: 1}} key={msg.id}>
                            <CardContent>
                                <Grid2 sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <Typography variant="h5"  sx={{ color: '#000'}}>
                                        Author: {msg.author}
                                    </Typography>
                                    <Typography>Date: {msg.datetime}</Typography>
                                </Grid2>
                                <Typography sx={{fontSize: 20, marginTop: 1}}>
                                    Message: {msg.message}
                                </Typography>
                            </CardContent>
                        </Card>
                    )) : 'No messages'}
                </Grid2>
            </Grid2>
            <form onSubmit={handleSubmit} style={{position: 'absolute', bottom: 15, right: 50, left: 50}}>
                <Grid2 container spacing={1} alignItems="center">
                    <Grid2 size={2}>
                        <TextField label="Author" variant="outlined" name="author" value={messages.author} onChange={onHandleChange} />
                    </Grid2>
                    <Grid2 size="grow">
                        <TextField label="Message" variant="outlined" fullWidth name="message" onChange={onHandleChange} value={messages.message} />
                    </Grid2>
                    <Grid2 size="auto">
                        <Button type="submit" variant="contained" color="success" size="large">Send</Button>
                    </Grid2>
                </Grid2>
            </form>
        </div>
    );
};

export default Chat;

