global.__base = __dirname;

import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import UserModel from './components/users/user.model';
import schema from './schema';

const app = express();

const db = mongoose.connect('mongodb://localhost/graphql');
const state = db.connection;
state.on('open', (err) => {
    console.log('Connection to the database successfull');
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
    pretty: true
}));

app.listen(8000);
