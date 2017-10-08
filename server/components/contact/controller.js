export default{
    post: function(request, response) {
        console.log('Contact action');
        console.log(request.body);
        setTimeout(function() {
            response.send(JSON.stringify('yeah bruv'));
        }, 3000);
    }
}
