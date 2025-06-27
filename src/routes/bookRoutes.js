import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js'
import authorizeRole from '../middleware/authorizeRole.js'
import * as bookController from '../controllers/bookController.js';

const bookRouter = express.Router();

// READ
bookRouter.get('/books', bookController.getBooksInPages); // default all books
bookRouter.get('/books/count', bookController.getBooksCount); // default all books
bookRouter.get('/books/search', bookController.searchBook); // ?keyword=...
bookRouter.get('/books/filter', bookController.getBooksWithFilters); // ?genre=...&status=...
bookRouter.get('/books/query', bookController.getBooksWithQuery); // basic query ?genre=...
bookRouter.get('/books/:id', bookController.getBook); // single book by ID

// CREATE
bookRouter.post('/books',authenticateToken, authorizeRole('admin'), bookController.createBook);

// UPDATE
bookRouter.put('/books/:id', authenticateToken, authorizeRole('admin'), bookController.updateBook);

// DELETE
bookRouter.delete('/books/:id', authenticateToken, authorizeRole('admin'), bookController.deleteBook);
bookRouter.delete('/books', authenticateToken, authorizeRole('admin'), bookController.deleteAllBooks);

export default bookRouter;
