export interface Message {
    message: string;
    author: string;
    datetime: string;
}

export interface Messages extends Message {
    id: string;
}