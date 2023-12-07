import express, { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cors from 'cors';
import helmet from 'helmet';



class App {
	readonly app: Express;

	constructor() {
		this.app = express();
		this.middliewares();
		this.routes();
	}
	middliewares() {
		this.app.use(helmet());
		this.app.use(cors('http://localhost:3333/'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false}));
	}
	routes() {
		this.app.get('/', (req, res) => {
			return res.json({ info: 'funcionando...' });
		});
	}
}

export {App};