export const errorHandler = (statusCode, message)=> {   // creating and exporting errorhandle function
    const error = new Error()               //using js constructor =Error
    error.statusCode = statusCode;
    error.message = message;
    return error;
};