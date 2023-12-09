import 'dotenv/config';
import { App } from '../app';
import {db} from '../databases/models/';

const {app} = new App();
const {PORT} = process.env;


db.authenticate().then(() =>{
	console.log('database connected');
	app.emit('on');
}).catch(err =>{
	console.log('\n\n\nerro ao ligar o servidor, pois a base de dados encontra-se offiline\n\n\n', err);
});

app.on('on', () =>{
	app.listen(PORT, () =>{
		console.log('server ligado', PORT);
	});
});