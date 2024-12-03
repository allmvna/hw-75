import express from "express";
import {Message} from "../types";
const { Cipher, Decipher } = require('caesar-salad').Vigenere;

const messageRouter = express.Router();

messageRouter.post('/encode', async (req, res) => {
    const { password, message } = req.body;
    const encoded: Message = Cipher(password).crypt(message);
    res.send({ encoded });
});

messageRouter.post('/decode', async (req, res) => {
    const { password, message } = req.body;
    const decoded: Message = Decipher(password).crypt(message);
    res.send({ decoded });
});

export default messageRouter;

