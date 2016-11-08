import mongoose from 'mongoose';


var ArtistSchema = new mongoose.Schema({
    digital_id: String,
    name: String
});

const ArtistModel = mongoose.model('artists', ArtistSchema);

export default ArtistModel;
