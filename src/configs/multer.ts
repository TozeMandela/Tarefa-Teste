import multer from 'multer';
import { resolve } from 'path';

console.log(resolve(__filename));

export const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, resolve(__dirname, '..', 'uploads'));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, file.fieldname + '-' + uniqueSuffix + file.mimetype.replace('/', '.'));
	}
});

