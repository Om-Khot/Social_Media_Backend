import express from 'express';
import { profileManagement } from '../Controller/SettingsController.js';
import uploader from '../Middlewares/MulterMiddleWare.js';

const SettingsRouter = express.Router();

SettingsRouter.post('/profile',uploader.single('prImage'),profileManagement);
export default SettingsRouter;