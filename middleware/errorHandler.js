const {constants} = require("../constants")

const errorHandler = (err,req,res,next)=>{
    const statusCode  = res.statusCode ? res.statusCode : 500;

    switch (statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
            title: "Validation failed",
            message: err.message, 
            stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "NOT FOUND",
                message: err.message, 
                stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Un authorized",
                message: err.message, 
                stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message, 
                stackTrace: err.stack});
            break;
        case constants.SERVER_EROOR:
            res.json({
                title: "Server Error",
                message: err.message, 
                stackTrace: err.stack});

        default:
            console.log("No error, all good!");
            break;
        

    }
}
    

module.exports = errorHandler;