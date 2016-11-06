import express from 'express';
import Schema from './schema';
import graphQLHTTP from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import headers from './middlewares/headers';
import userRouter from './components/users/routes';

const app = express();

mongoose.connect('mongodb://localhost/graphql', function (error) {
    if (error) console.error(error)
    else console.log('mongo connected')
});

app.use(morgan('dev'));

app.use('/graphql', graphQLHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

app.use(bodyParser.json());
app.use(headers.default);
app.use(headers.options);

app.use('/users', userRouter);

app.listen(8080, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('GraphQL Server is now running on localhost: ', 8080);
});
