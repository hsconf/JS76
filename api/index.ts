import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

const run = async () => {

    app.listen(port, () => {
        console.log('Server running http://localhost:' + port);
    })
};

void run();