import express, { Router } from 'express';
import { BioController } from '../controllers/bioController';

const router: Router = express.Router();
const bioController = new BioController();

const checkQuery = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.query.query) {
    return bioController.getArticlesByQuery(req, res);
  }
  next();
};

router.get('/articles/:id', bioController.getArticlesById);
router.get('/articles', checkQuery, bioController.getAllArticles);
router.get('/bio/:id', bioController.getBioById);
router.get('/bio', checkQuery, bioController.getAllBio);
router.get('/biosk/:id', bioController.getBioSkincareById);
router.get('/biosk', checkQuery, bioController.getAllBioSkincare);

export default router;