import express from 'express';
import User from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';

var router = express.Router();


router.post('/signin', function(request, response){
    User.findOne({email: request.body.email}, '-_id').exec()
    .then(function(user){
        if(!user){
            response.status(404).json({msg: 'User not found'});
        } else {
            bcrypt.compare(request.body.password, user.password, function(err, res){
                if (res) {
                    var token = jwt.encode(user, 'secretdefou');
                    user = user.toObject();
                    delete(user.password);
                    response.status(200).json({user: user, token: token});
                } else {
                    response.status(401).json({msg: 'Not authorized'});
                }
            });
        }
    }).catch(function(err){
        response.status(500).json(err);
    })
});


module.exports = router;
