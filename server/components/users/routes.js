import express from 'express';
import User from './user.model';

var router = express.Router();


router.post('/signin', function(request, response){
    User.findOne({email: request.body.email}).exec()
    .then(function(user){
        if(!user){
            response.status(404).json({msg: 'User not found'});
        } else {
            response.status(200).json(user);
        }
    }).catch(function(err){
        response.status(500).json(err);
    })
});


module.exports = router;
