import { Request } from 'express';
import { WhereOptions } from 'sequelize';

export const isBodyOrQueryOrParam = (req: Request) => {
	const search: Array<WhereOptions<object> | undefined> = [];

	if(Object.keys(req.body).length > 0) search.push(req.body);

	if(Object.keys(req.params).length > 0) search.push(req.params);

	if(Object.keys(req.query).length > 0) search.push(req.query);
	console.log(search);

	return search;

};