import { RequestHandler } from 'express';
import { StatusCodes as stc } from 'http-status-codes';
import { IBodyProps, User } from '../classes';
import { WhereOptions } from 'sequelize';
import { isBodyOrQueryOrParam } from '../shared';

export const cadastrosPage: RequestHandler = (req, res) => {
	console.log(res.locals.token);
	return res.json({ info: 'funcionando...', _csrf: res.locals.token});
};

export const cadastros: RequestHandler<object, object, IBodyProps> = async (req, res) => {
	const user = new User(req.body);
	user.clean();
	if(user._errors.length !== 0) return res.status(stc.CONFLICT).json({Errors: user._errors});

	try {
		await user.save(user._body);
	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'erro ao salvar na bd', error});
	}

	return res.status(stc.CREATED).json({info: `O ${user._body.name} salvo com sucesso!!!`});
};

export const pesquisarOne: RequestHandler = async (req, res) => {
	let user: object | null;
	const search: Array<WhereOptions<object> | undefined> = isBodyOrQueryOrParam(req);

	try {
		user = await User.getOne(search[0]);
	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'erro ao buscar o ... na bd ', error});
	}

	return res.status(stc.CREATED).json({user});
};

export const pesquisar: RequestHandler = async (req, res) => {
	let users: Array<object>;
	try {
		users = await User.getAll();
	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'erro ao buscar os ... na bd', error});
	}

	return res.status(stc.CREATED).json({users});
};

export const remover: RequestHandler = async (req, res) => {
	let user: number | null;
	const search: Array<WhereOptions<object> | undefined> = isBodyOrQueryOrParam(req);

	try {
		user = await User.remove(search[0]);
	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'erro ao eliminar o ... na bd ', error});
	}

	return res.status(stc.CREATED).json({user});
};

export const actualizar: RequestHandler = async (req, res) => {
	const search: Array<WhereOptions<object> | undefined> = isBodyOrQueryOrParam(req);
	const user = new User(req.body);
	user.clean();

	if(user._errors.length !== 0) return res.status(stc.CONFLICT).json({Errors: user._errors});

	try {
		await User.updated(user._body, search[1]);
	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'erro ao actualizar o ... na bd ', error});
	}

	return res.status(stc.CREATED).json({info: 'dados actualizados com sucesso!!!'});
};