import { App } from '../app';
import 'dotenv/config';
const {PORT} = process.env;


new App().app.listen(PORT, () =>{
	console.log('server ligado', PORT);
});