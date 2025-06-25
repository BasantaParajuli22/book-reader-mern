import express from 'express';
import * as chapterController from '../controllers/chapterController.js';
import authenticateToken from '../middleware/authenticateToken.js'
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

// Prefix all chapter routes with `/chapters`
router.get('/chapters/book/:bookId', chapterController.getChaptersByBookId); //get all chapters title and chapterNo
router.get('/chapters/book/:bookId/count', chapterController.countChaptersByBook);//count chapters of book
router.get('/chapters/book/:bookId/top3', chapterController.getTop3ChaptersByBook); //get top 3 of book
router.get('/chapters/book/:bookId/:chapterId', chapterController.getOneChapterByBook); //view specific chapter of book
router.get('/chapters/book/:bookId/:chapterId/nav', chapterController.getChapterWithNavigation);//proper nav 
router.get('/chapters/filter', chapterController.getChaptersWithFilters);// All chapters (optional) filter

router.post('/chapters/book/:bookId',authenticateToken, authorizeRole('admin'), chapterController.createChapter);
router.put('/chapters/book/:bookId/:chapterId',authenticateToken, authorizeRole('admin'), chapterController.updateChapter);

router.delete('/chapters/book/:bookId/:chapterId',authenticateToken, authorizeRole('admin'), chapterController.deleteChapter);
router.delete('/chapters/book/:bookId', authenticateToken, authorizeRole('admin'), chapterController.deleteAllChapters);



export default router;

