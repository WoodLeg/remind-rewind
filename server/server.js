import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/contact', function(request, response) {
  console.log('Contact action');
  console.log(request.body);
  setTimeout(function() {
      response.send(JSON.stringify('yeah bruv'));
  }, 3000);
});

app.listen(8000, (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('Server is now running on localhost: ', 8000);
});
