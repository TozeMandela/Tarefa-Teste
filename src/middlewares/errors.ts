import { ErrorRequestHandler, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";



export const Errors: ErrorRequestHandler = async (err, req, res, next: NextFunction) => {

	if(err) return res.status(StatusCodes.CONFLICT).json({info: 'error', err});

	next();

};