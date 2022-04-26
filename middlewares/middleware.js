module.exports.useMiddlewares = async( express, app ) => {
    const allowCrossDomain = function(req, res, next){
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers','*');
        next();
    }   
    app.use(allowCrossDomain)
    require('dotenv').config()
    app.use(require('morgan')('tiny'))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use('/api/user', require('../routes/user'))
    app.use('/api/chat', require('../routes/chat'))
    app.use(express.static('public'));
    app.use('/uploads',  express.static(__dirname + '/public/uploads'))
}