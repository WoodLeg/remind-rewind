import Lokka from 'lokka';
import { Transport } from 'lokka-transport-http';

const options = {
    mode: 'no-cors'
};

export default new Lokka({
    transport: new Transport('http://api.remind-rewind.com/graphql', options)
});
