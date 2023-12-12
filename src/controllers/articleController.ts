import { RequestHandler } from 'express';
import { StatusCodes as stc } from 'http-status-codes';
import { WhereOptions } from 'sequelize';
import { isBodyOrQueryOrParam } from '../shared';
import { Articles, IBodyProps } from '../classes/article';
import { Photo } from '../classes/photo';

export const cadastrosPage: RequestHandler = (req, res) => {
	console.log(res.locals.token);
	return res.json({ info: 'funcionando...', _csrf: res.locals.token});
};

export const saveP: RequestHandler = async (req, res) => {

	if(!req.file) return res.status(stc.CONFLICT).json({Errors: 'problemas ao salvar a photo, verifique se está a inserir ela corretamente!'});

	try {
		const { fieldname, originalname, mimetype, size, destination, filename, path } = req.file;

		const qtdExist = await Photo.getAll({articleId: res.locals.userLogado.id});

		if(qtdExist.length > 4) return res.json({ info: 'excedeu o total de photos para este artigo...'});

		const idArticle = {id: req.params.id};

		const article = Articles.getOne(idArticle);

		if(!article) return res.json({ info: 'impossivel postar'});

		const photo = {...{ fieldname, originalname, mimetype, size, destination, filename, path }, articleId: req.params.id};

		await Photo.save(photo);

		return res.json({ info: 'imagem salva com sucesso...'});

	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'problemas ao salvar a photo, verifique se está a inserir ela corretamente!', error});
	}

};


export const cadastros: RequestHandler<object, object, IBodyProps> = async (req, res) => {
	req.body.userId = res.locals.userLogado.id;
	const article = new Articles(req.body);
	article.clean();
	if(article._errors.length !== 0) return res.status(stc.CONFLICT).json({Errors: article._errors});

	try {
		await Articles.save(article._body);
	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'erro ao salvar na bd', error});
	}

	return res.status(stc.CREATED).json({info: `O ${article._body.title} salvo com sucesso!!!`});
};

export const pesquisarOne: RequestHandler = async (req, res) => {
	let article: object | null;
	const search: Array<WhereOptions<object> | undefined> = isBodyOrQueryOrParam(req);

	try {
		article = await Articles.getOne(search[0]);
	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'erro ao buscar o artigo... na bd ', error});
	}

	return res.status(stc.CREATED).json({article});
};

export const pesquisar: RequestHandler = async (req, res) => {

	let articles: Array<object>;
	try {
		articles = await Articles.getAll();
	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'erro ao buscar os artigos... na bd', error});
	}

	return res.status(stc.CREATED).json({userLogado: res.locals.userLogado, articles});
};

export const remover: RequestHandler = async (req, res) => {
	let article: number | null;
	const search: Array<WhereOptions<object> | undefined> = isBodyOrQueryOrParam(req);

	try {
		article = await Articles.remove(search[0]);
	} catch (error) {
		return res.status(stc.CONFLICT).json({Errors: 'erro ao eliminar o ... na bd ', error});
	}

	return res.status(stc.CREATED).json({article});
};

