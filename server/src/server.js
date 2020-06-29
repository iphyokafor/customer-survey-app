import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes'
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Mongodb connection string
mongoose.connect(
    process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    (err) => {
        if (err) throw err;
        else console.log('connected to db!')
    });

app.use(routes);

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})

export default app;