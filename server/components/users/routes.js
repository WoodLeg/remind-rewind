import express from 'express';
import User from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';

var router = express.Router();


router.post('/signin', function(request, response){
    User.findOne({facebookId: request.body.id}, '-_id').exec()
    .then(function(user){
        if(!user){
            let newUser = new User({
                firstName: request.body.name.split(' ')[0],
                lastName: request.body.name.split(' ')[1],
                email: request.body.email,
                isAdmin: false,
                isModerator: false,
                facebookId: request.body.id
            });
            newUser.id = newUser._id;
            newUser.save((err, result) => {
                result.picture = request.body.picture;
                var token = jwt.encode(result, 'secretdefou');
                response.status(200).json({user: result, token: token});
            });
            // Créer le user en bdd
        } else {
            var token = jwt.encode(user, 'secretdefou');
            user = user.toObject();
            response.status(200).json({user: user, token: token});
        }
    }).catch(function(err){
        response.status(500).json(err);
    })
});


module.exports = router;
