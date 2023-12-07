import {Sequelize} from 'sequelize';
import {config} from '../../configs/dbConfigs';

const db = new Sequelize(config);



export {db};
