import * as React from "react";

interface Props {
    author: string,
    message: string,
    datetime: string
}

const Card: React.FC<Props> = React.memo(({author, message, datetime}) => {
    return (
        <div className="card p-2 mt-2 w-75 d-flex gap-3 mx-auto">
            <div>Author: {author}</div>
            <div>{message}</div>
            <div className="ms-auto">{datetime}</div>
        </div>
    );
});

export default Card;