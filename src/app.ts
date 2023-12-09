import express, { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cors from 'cors';
import users from './routes/usersRoute';
import session from 'express-session';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import csrf from 'csurf';
import { errorToken, getToken, sessionOption } from './middlewares';




class App {
	readonly app: Express;

	constructor() {
		this.app = express();
		this.middliewares();
		this.routes();
	}
	middliewares() {
		this.app.use(cors('http://localhost:3333/'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true}));
		this.app.use(session(sessionOption));
		this.app.use(cookieParser());
		this.app.use(helmet());
		this.app.use(csrf());
		this.app.use(getToken);
		this.app.use(errorToken);
	}

	routes() {
		this.app.get('/', (req, res) => {
			console.log(res.locals.token);
			return res.json({ info: 'funcionando...', _csrf: res.locals.token});
		});

		this.app.use('/users', users);
	}
}

export {App};