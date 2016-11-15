import express from 'express';
import Schema from './schema';
import graphQLHTTP from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import headers from './middlewares/headers';
import authorization from './middlewares/authorization';
import userRouter from './components/users/routes';

import config from './config';


const app = express();

mongoose.connect('mongodb://localhost/graphql', function (error) {
    if (error) console.error(error)
    else console.log('mongo connected')
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(headers.default);
app.use(headers.options);
app.use(authorization.verifyJWT);

app.use('/graphql', graphQLHTTP((request) => ({
    schema: Schema,
    pretty: true,
    rootValue: { token: request._token },
    graphiql: config.GRAPHQL.gui
})));


app.use('/users', userRouter);

app.listen(config.SERVER.PORT, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('GraphQL Server is now running on localhost: ', 8080);
});
