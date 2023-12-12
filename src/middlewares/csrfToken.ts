import { ErrorRequestHandler, RequestHandler} from 'express';


export const getToken: RequestHandler = (req, res, next) => {
	res.locals.token = req.csrfToken();
	next();
};

export const errorToken: ErrorRequestHandler = (err, req, res, next) => {
	if(err === 'EBADCSRFTOKEN') return res.json({'Errors': err});

	next();
};

export const sessionOption =  {
	secret : 'keyboard cat' ,
	resave : false ,
	saveUninitialized : true ,
	cookie : {  secure : true  }
};

