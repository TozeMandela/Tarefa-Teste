import validator from 'validator';
import { Article } from '../databases';
import { WhereOptions } from 'sequelize';

interface IBodyProps {
    title: string;
	descrition: string;
	isPromotion: boolean;
	priceOrininal: number;
	pricePromotional: number;
	quantityInitial: string;
	quantityBuy: string;
	userId: number;
    _csrf: string;
}

class Articles {
	private body: IBodyProps;
	private readonly errors: string[];
	private  aux: number = 0;

	constructor (_body: IBodyProps) {
		this.body = _body;
		this.errors = [];
	}

	get _errors () {
		return this.errors;
	}

	get _body () {
		return this.body;
	}

	clean() {
		this.isValidData(this.body);
	}

	private isValidData(data: IBodyProps) {

		for (const key in data) {
			switch (key) {
			case 'title':
				if(validator.isEmpty(data[key]) || !validator.isLength(data[key], {min: 6, max: 50})) this.errors.push('precisa titulo do seu artigo e o titulo deve ser impactante');

				break;

			case 'descrition':
				if(validator.isEmpty(data[key]) || !validator.isLength(data[key], {min: 10})) this.errors.push('é sempre bom descrever um pouco o produto');

				break;

			case 'priceOrininal':
				if(isNaN(data[key])) this.errors.push('forneça o preço do produto');

				break;

			case 'quantityInitial':
				// eslint-disable-next-line no-case-declarations
				const aux = Number(data[key]);
                
				if(validator.isEmpty(data[key]) || Number.isNaN(aux)) this.errors.push('precisa fornecer a quantidade');

				break;

			case 'userId':
				if(isNaN(data[key])) this.errors.push('usuario requerido');

				break;
			}
		}
	}


	static async save(obj: Omit<IBodyProps, '_csrf'>) {
		await Article.create(obj);
	}

	static async getAll() {
		return await Article.findAll({
			attributes: ['title','descrition', 'isPromotion','priceOrininal', 'priceOrininal', 'pricePromotional', 'quantityInitial', 'quantityInitial','quantityInitial', 'quantityBuy'],
			order: [['created_at', 'DESC']],

		});
	}

	static async getOne(id: WhereOptions<object> | undefined) {
		return await Article.findOne({
			where: id,
		});
	}

	static async remove(id: WhereOptions<object> | undefined) {
		return await Article.destroy({
			where: id,
		});
	}

	static async updated(newValue: WhereOptions<object> | undefined, id: WhereOptions<object> | undefined) {
		return await Article.update({...newValue}, {
			where: {...id}
		});
	}
}

export { Articles, IBodyProps };