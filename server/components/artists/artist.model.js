import mongoose from 'mongoose';


var ArtistSchema = new mongoose.Schema({
    spotify_id: String,
    name: String
});

const ArtistModel = mongoose.model('artists', ArtistSchema);

export default ArtistModel;
