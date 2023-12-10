import bcript from 'bcryptjs';
import validator from 'validator';
import { Logins } from '../databases';
import { WhereOptions } from 'sequelize';

interface ILoginProps {
    password: string;
	passwordConfirm: string;
	userId: number;
    _csrf: string;
}

class Login {
	private readonly errors: Array<string>;
	private body: ILoginProps;

	constructor(data: ILoginProps) {
		this.errors = [];
		this.body = data;
	}

	get _errors() {
		return this.errors;
	}

	get _body() {
		return this.body;
	}

	clean(){
		this.isValidData(this.body);

		if(this.errors.length > 0) return this.errors;

		const salt = bcript.genSaltSync(10);
		this.body['password'] = bcript.hashSync(this.body.password, salt);
	}

	private isValidData(data: ILoginProps) {
		for (const key in data) {

			switch(key){
			case 'password':
				if(validator.isEmpty(data[key]) && !validator.isLength(data[key], {min: 6, max: 25})) this.errors.push('forneça uma senha valida!');

				break;
			case 'passwordConfirm':
				if(validator.isEmpty(data[key]) && data[key] !== data['password']) this.errors.push('forneça a senha de confirmação e ela ñ pode ser diferente da senha acima!');
				break;
			case 'userId':
				if(!data[key] && isNaN(data[key])) this.errors.push('usuario é requerido!');
				break;
			}
		}
	}


	static async create(data: Omit<ILoginProps, '_csrf'>) {
		await Logins.create(data);
	}

	static async getAll() {
		return await Logins.findAll({
			attributes: ['password', 'userId'],
			order: [['created_at', 'DESC']],

		});
	}

	static async getOne(id: WhereOptions<object> | undefined) {
		return await Logins.findOne({
			where: id,
		});
	}
}

export {Login};