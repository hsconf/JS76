import {promises as fs} from "fs"
import crypto from "crypto";
import {Message, Messages} from "./types";

const dbFile = 'dbFile.json';
let messages: Messages[] = [];

const db = {
    async init() {
        try {
            const rd = await fs.readFile(dbFile);
            messages = JSON.parse(rd.toString());
        } catch (error) {
            console.log(error);
        }
    },
    async getAll() {
        await this.init()
        return messages;
    },
    async add(message: Message) {
        const userId = crypto.randomUUID();
        messages.push({...message, id: userId});
        await this.save()
    },
    save() {
        return  fs.writeFile(dbFile, JSON.stringify(messages))
    }
}

export default db;