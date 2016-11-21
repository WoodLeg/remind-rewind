import express from 'express';
import User from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';

var router = express.Router();


router.post('/signin', function(request, response){
    console.log(request.body);
    // FndOne by FacebookID
    User.findOne({email: request.body.email}, '-_id').exec()
    .then(function(user){
        if(!user){
            response.status(404).json({msg: 'User not found'});
            // Créer le user en bdd
        } else {
            var token = jwt.encode(user, 'secretdefou');
            user = user.toObject();
            console.log(user);
            request.body.isAdmin = user.isAdmin;
            request.body.isModerator = user.isModerator;
            response.status(200).json({user: request.body, token: token});
        }
    }).catch(function(err){
        response.status(500).json(err);
    })
});


module.exports = router;
