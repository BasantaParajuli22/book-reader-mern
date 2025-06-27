import * as bookService from '../services/bookService.js';

// req.params.id  if ID comes from the URL like /books/:id
// req.query.id   if from a query like /books?id=123
// req.body.id    if from POST/PUT body

export async function createBook(req,res){
  try {
    const { title, author, description, genre, status, coverImage } = req.body;
    const userId = req.user.id;//from jwt token after middleware checks we get 

    if (!title || !author ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const savedBook = await bookService.createBook(userId, title, author, description, genre, status, coverImage);
    if (!savedBook) {
      return res.status(500).json({ message: "Failed to create book" });
    }
    res.status(201).json(savedBook);   
  } catch (error) {
    res.status(500).json({ error: error.message }); //if internal error caught
  }
}

export async function updateBook(req,res){
  try {
    const { bookId } = req.params;
    const { title, author, description, genre, status, coverImage } = req.body;
    const userId = req.user.id;

    const updatedBook = await bookService.updateBook(userId,bookId, title, author, description, genre, status, coverImage);
    if (!updatedBook) {
      return res.status(404).json({ message: "Update of book error" });
    }
    res.status(200).json(updatedBook);   
  } catch (error) {
    res.status(500).json({ error: error.message }); //if internal error caught
  }
}

export async function deleteBook(req,res){
  try {
    const { id } = req.params;
    const deletedBook = await bookService.deleteBook(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "deletion of book failed" });
    }
    res.status(201).json(deletedBook);   
  } catch (error) {
    res.status(500).json({ error: error.message }); //if internal error caught
  }
}

export async function deleteAllBooks(req,res){
  try {
    const query =req.query;
    const deletedBook = await bookService.deleteAllBooks(query);
    if (!deletedBook) {
      return res.status(404).json({ message: "deletion of all book failed" });
    }
    res.status(201).json(deletedBook);   
  } catch (error) {
    res.status(500).json({ error: error.message }); //if internal error caught
  }
}

export async function searchBook(req,res){
  try {
   const { keyword } = req.query;
    const searchedBooks = await bookService.findBooksByKeyword(keyword);
    if (!searchedBooks) {
      return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json(searchedBooks);   
  } catch (error) {
    res.status(500).json({ error: error.message }); //if internal error caught
  }
}

export async function getBooksCount(req, res) {
  try {
    const  query = req.query;
    const book = await bookService.countBooks(query);//find single book with id
    if(!book){
     return res.status(404).json({ message: "No books found" });//if not found
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });//if internal error caught
  }
}

export async function getBook(req, res) {
  try {
    const book = await bookService.findBook(req.params.id);//find single book with id
    if(!book){
     return res.status(404).json({ message: "No books found" });//if not found
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });//if internal error caught
  }
}

export async function getBooksInPages(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const books = await bookService.findBooks({ page, limit });
    if(!books){
     return res.status(404).json({ message: "No books found" });//if not found
    }
    res.status(200).json(books);
  } catch (error) {
     res.status(500).json({ error: error.message });//if internal error caught
  }
}


export async function getBooksWithQuery(req, res) {
  try {
    const query = req.query;
    const books = await bookService.findBooksWithQuery(query);//findBooks with  query passed
    if(!books){
     return res.status(404).json({ message: "No books found" });//if not found
    }
    res.status(200).json(books);
  } catch (error) {
     res.status(500).json({ error: error.message });//if internal error caught
  }
}

export async function getBooksWithFilters(req, res) {
  try {

    const { genre, status, title, page, limit, sortBy, order } = req.query;
    const query ={}; //define empty

    if(genre) query.genre = genre; //if genre exists in req.query 
    if(status) query.status = status;
    if(title) query.title = { $regex : title, $options : 'i'};

    const sort = sortBy ? { [sortBy]: order === 'asc' ? 1 : -1 } : {};

    const books = await bookService.findBooksWithFilters(
      {
        query,
        sort,
        page : parseInt(page) || 1,
        limit: parseInt(limit) || 0,
      }
    );
    if(!books){
     return res.status(404).json({ message: "No books found" });//if not found
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });//if internal error caught
  }
}