import mongoose from 'mongoose';


var ArtistSchema = new mongoose.Schema({
    spotify_id: String,
    name: String,
    featured: Boolean
});

const ArtistModel = mongoose.model('artists', ArtistSchema);

export default ArtistModel;
