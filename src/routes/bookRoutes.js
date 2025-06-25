import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js'
import authorizeRole from '../middleware/authorizeRole.js'
import * as bookController from '../controllers/bookController.js';

const router = express.Router();

// READ
router.get('/books', bookController.getBooksInPages); // default all books
router.get('/books/count', bookController.getBooksCount); // default all books
router.get('/books/search', bookController.searchBook); // ?keyword=...
router.get('/books/filter', bookController.getBooksWithFilters); // ?genre=...&status=...
router.get('/books/query', bookController.getBooksWithQuery); // basic query ?genre=...
router.get('/books/:id', bookController.getBook); // single book by ID

// CREATE
router.post('/books',authenticateToken, authorizeRole('admin'), bookController.createBook);

// UPDATE
router.put('/books/:id', authenticateToken, authorizeRole('admin'), bookController.updateBook);

// DELETE
router.delete('/books/:id', authenticateToken, authorizeRole('admin'), bookController.deleteBook);
router.delete('/books', authenticateToken, authorizeRole('admin'), bookController.deleteAllBooks);

export default router;
