import express from 'express';
import messagesRouter from "./routers/message";

const app = express();
const port = 8000;

app.use(express.json());

app.use('/', messagesRouter);

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});

