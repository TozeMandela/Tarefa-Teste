import validator from 'validator';
import { Users } from '../databases';
import { WhereOptions } from 'sequelize';

interface IBodyProps {
    name: string;
	gender: string;
	email: string;
	phoneNumber: string;
	phoneNumberAlternative: string;
	location: string;
	nationality: string;
	numberIdentity: string;
    _csrf: string;
}

class User {
	private body: Omit<IBodyProps, '_csrf'>;
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

	private isValidData(data: Omit<IBodyProps, '_csrf'>) {

		for (const key in data) {
			switch (key) {
			case 'name':
				if(validator.isEmpty(data[key]) || !validator.isLength(data[key], {min: 6, max: 50})) this.errors.push('precisa fornecer seu nome completo');

				break;

			case 'gender':
				if(validator.isEmpty(data[key]) || !validator.isLength(data[key], {min: 1, max:1})) this.errors.push('forneça-nos o seu sexo (M|F)');

				break;

			case 'email':
				if(validator.isEmpty(data[key]) || !validator.isEmail(data[key])) this.errors.push('o e-mail precisa ser valido');

				break;

			case 'phoneNumber':
				this.aux = Number(data[key]);
				if(validator.isEmpty(data[key]) || !validator.isLength(data[key], {min: 9, max: 17}) || isNaN(this.aux)) this.errors.push('precisa fornecer seu contacto para poderem entrar em contacto contigo');

				break;

			case 'phoneNumberAlternative':
				this.aux = Number(data[key]);
				if(!validator.isEmpty(data[key]) && !validator.isLength(data[key], {min: 9, max: 17})) this.errors.push('o contacto alternativo está errado');

				break;

			case 'location':
				if(validator.isEmpty(data[key]) || !validator.isLength(data[key], {min: 5})) this.errors.push('forneça sua morada');

				break;

			case 'numberIdentity':
				if(validator.isEmpty(data[key]) || !validator.isLength(data[key], {min: 14})) this.errors.push('precisa fornecer o seu numero de identidade');

				break;
			}
		}
	}


	async save(obj: Omit<IBodyProps, '_csrf'>) {
		await Users.create(obj);
	}

	static async getAll() {
		return await Users.findAll({
			attributes: ['name','gender', 'email','phoneNumber', 'phoneNumberAlternative', 'location', 'nationality', 'numberIdentity',],
			order: [['created_at', 'DESC']],

		});
	}

	static async getOne(id: WhereOptions<object> | undefined) {
		return await Users.findOne({
			where: id,
		});
	}

	static async remove(id: WhereOptions<object> | undefined) {
		return await Users.destroy({
			where: id,
		});
	}

	static async updated(newValue: WhereOptions<object> | undefined, id: WhereOptions<object> | undefined) {
		return await Users.update({...newValue}, {
			where: {...id}
		});
	}
}

export { User, IBodyProps };