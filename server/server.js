import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './components';

const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(routes.contact);

app.listen(8000, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('Server is now running on localhost: ', 8000);
});
