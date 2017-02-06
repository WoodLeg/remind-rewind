import express from 'express';
import Schema from './schema';
import graphQLHTTP from 'express-graphql';
import cors from 'cors';

const app = express();

app.use(cors({origin: true, credentials: true}));


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

app.listen(8000, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('GraphQL Server is now running on localhost: ', 8000);
});
