import { Router } from 'express';
const route = Router();
import { cadastros, remover, pesquisar, cadastrosPage, pesquisarOne, saveP } from '../controllers/articleController';
import { userRequired } from '../middlewares';

import { storage } from '../configs/multer';
import multer from 'multer';

const upload = multer({ storage: storage });


route.post('/add/photos/:id', userRequired, upload.single('photo'), saveP);
route.get('/pesquisar', userRequired,pesquisar);
route.get('/pesquisar/o/:id', userRequired, pesquisarOne);
route.get('/pesquisar/o/', userRequired, pesquisarOne);
route.get('/cadastrar', userRequired, cadastrosPage);
route.post('/cadastrar', userRequired, cadastros);
route.delete('/remover/', userRequired, remover);
route.delete('/remover/:id', userRequired, remover);
// route.put('/actualizacao/:id', userRequired, actualizar);

export default route;