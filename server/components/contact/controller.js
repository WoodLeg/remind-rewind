export default{
    post: function(request, response) {
        console.log('Contact action');
        console.log(request.body);
        setTimeout(function() {
            response.status(200);
        }, 3000);
    }
}
