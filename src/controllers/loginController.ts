import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Login } from '../classes/login';
import { User } from '../classes';
import { WhereOptions } from 'sequelize';
import { isBodyOrQueryOrParam } from '../shared';
import { Logins, Users } from '../databases';


export const gettoken: RequestHandler = async (req, res) => {

	const {id} = res.locals.userLogado;
	console.log('entreiiii', id);
	return res.status(StatusCodes.ACCEPTED).json([{id}]);
};

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


export const login: RequestHandler = async (req, res) => {
	let dataUser: Users | null;
	let dataLogin: Logins | null;
	const {JWT_SECREET} = process.env;

	try {
		const verifydataInTableUser = {phoneNumber: req.body.username};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let verifydataInTableLogin: WhereOptions<any> | undefined;

		dataUser = await User.getOne(verifydataInTableUser);

		if(!dataUser) return res.status(StatusCodes.BAD_REQUEST).json({ info: 'credenciais invalidas'});

		if(dataUser) verifydataInTableLogin = {user_id: dataUser.dataValues.id};
		const { id } = dataUser.dataValues;
		dataLogin = await Login.getOne(verifydataInTableLogin);

		if(!dataLogin) return res.status(StatusCodes.BAD_REQUEST).json({ info: 'credenciais invalidas'});

		const isUserValid = Login.comparePassw(dataLogin.dataValues.password, req.body.password);

		if (!isUserValid) return res.status(StatusCodes.BAD_REQUEST).json({ info: 'credenciais invalidas'});

		const token = jwt.sign({ id }, JWT_SECREET!, {expiresIn: '1h'});

		return res.status(StatusCodes.ACCEPTED).json([{ token, id }]);
	} catch (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({ info: error});
	}
};