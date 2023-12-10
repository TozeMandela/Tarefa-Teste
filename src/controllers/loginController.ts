import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Login } from '../classes/login';
import { User } from '../classes';
import { WhereOptions } from 'sequelize';
import { isBodyOrQueryOrParam } from '../shared';
import { Logins } from '../databases';



export const register: RequestHandler = async (req, res) => {
	const login = new Login(req.body);
	login.clean();

	if(login._errors.length > 0) return res.json({info: login._errors});

	try {
		const obj = { id: login._body.userId};
		const user = await User.getOne(obj);

		if(!user) return res.status(StatusCodes.BAD_REQUEST).json({ info: 'usuario inexistente'});
		await Login.create(login._body);
	} catch (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({ info: error});
	}

	res.status(StatusCodes.CREATED).json({ info: 'redistrado com sucesso!'});
};

export const ShowOne: RequestHandler = async (req, res) => {
	let data: Logins | null;
	const search: Array<WhereOptions<object> | undefined> = isBodyOrQueryOrParam(req);

	try {
		data = await Login.getOne(search[0]);
	} catch (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({ info: error});
	}

	res.status(StatusCodes.CREATED).json({ info: data});
};