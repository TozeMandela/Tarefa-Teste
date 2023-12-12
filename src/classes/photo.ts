import { Photos} from '../databases';
import { Optional, WhereOptions } from 'sequelize';


class Photo {

	static async save(obj: Optional<any, string>) {
		await Photos.create(obj);
	}

	static async getAll(id: Optional<any, string>) {
		return await Photos.findAll({
			where: id,
		});
	}

	static async getOne(id: WhereOptions<object> | undefined) {
		return await Photos.findOne({
			where: id,
		});
	}

	static async remove(id: WhereOptions<object> | undefined) {
		return await Photos.destroy({
			where: id,
		});
	}

	static async updated(newValue: WhereOptions<object> | undefined, id: WhereOptions<object> | undefined) {
		return await Photos.update({...newValue}, {
			where: {...id}
		});
	}
}

export { Photo };