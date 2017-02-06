import Lokka from 'lokka';
import { Transport } from 'lokka-transport-http';

const options = {
    mode: 'no-cors'
};

export default new Lokka({
    transport: new Transport('http://localhost:8000/graphql', options)
});
