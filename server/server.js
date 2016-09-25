import express from 'express';
import Schema from './schema';
import graphQLHTTP from 'express-graphql';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost/graphql', function (error) {
    if (error) console.error(error)
    else console.log('mongo connected')
});

app.use('/', graphQLHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

app.listen(8080, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('GraphQL Server is now running on localhost: ', 8080);
});
