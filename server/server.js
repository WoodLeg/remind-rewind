import express from 'express';
import Schema from './schema';
import graphQLHTTP from 'express-graphql';
import cors from 'cors';

const app = express();

app.use(cors({origin: true, credentials: true}));


app.use('/', graphQLHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

app.listen(8000, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('GraphQL Server is now running on localhost: ', 8000);
});
