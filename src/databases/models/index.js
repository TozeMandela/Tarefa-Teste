import {Sequelize} from 'sequelize';
import config from '../../configs/dbConfigs.js';

const db = new Sequelize(config);



export {db};
