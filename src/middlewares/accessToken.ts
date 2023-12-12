import { Handler, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { User } from '../classes';

type IpropsJWT = {
    id: number
}

export const userRequired: Handler = async (req, res, next: NextFunction) => {
	const {authorization}= req.headers;
	const token: string | undefined = authorization && authorization.split(' ')[1];
	const { JWT_SECREET } = process.env;

	if(!token) return res.status(StatusCodes.LOCKED).json({info: 'faça login'});
	try {
		const { id } = jwt.verify(token, JWT_SECREET ?? '') as IpropsJWT;
		const obj = {id};
		const exist = await User.getOne(obj);
		if(!exist) return res.status(StatusCodes.LOCKED).json({info: 'Token invalido, faça login'});

		res.locals.userLogado = {id};
		next();
	} catch (error) {
		return res.status(StatusCodes.LOCKED).json({info: 'Token invalido, faça login', error});
	}
};