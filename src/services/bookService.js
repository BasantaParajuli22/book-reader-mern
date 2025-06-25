import Book from "../models/Book.js";
import Chapter from "../models/Chapter.js";

export async function createBook(bookData){
    const newBook = new Book(bookData); //creating new book Object and save 
    const savedBook = await newBook.save();
    return savedBook;   
}


//findByIdAndUpdate mongoose fn 
export async function updateBook(bookId, updates) {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {new : true}); 
    return updatedBook;
}

export async function deleteBook(bookId) {
    const deletedChapter = await Chapter.deleteMany({ bookId: bookId });//delete chapters
    const deletedBook = await Book.findByIdAndDelete( bookId );//delete that book
    return deletedBook;
}

export async function deleteAllBooks(query = {} ) {
    const deletedChapter = await Chapter.deleteMany();//delete all chapters
    const deletedBook =await Book.deleteMany(query);//delete all books
    return deletedBook;
}

export async function countBooks(query = {}) {
  return await Book.countDocuments(query);
}

export async function findBook(id) {
   const result = await Book.findOne( {_id: id} );
    return result;
}

//all books in pages 
export async function findBooks({ page = 1, limit = 10 }) {
   const skip = (page - 1) * limit;
  return await Book.find().skip(skip).limit(limit);
}

//find by using keywords full search on title and description possible by indexing
//Used when you have created a text index
// $text  Full-Text Search
export async function findBooksByKeyword(keyword) {
    const result = await Book.find(
        {$text :{$search :keyword} }     
    );
    return result;
}


//find queires  
//this is flexible u can pass only query as parameters
//eg::

//Find by genre:
// findBooks({ genre: 'fiction' })

//Find by status:
//findBooks({ status: 'completed' })

//Find by title (regex):
//findBooks({ title: { $regex: 'king', $options: 'i' } })

//Find by multiple:
//findBooks({ genre: 'fiction', status: 'completed' })
export async function findBooksWithQuery(query = {} ) {
   const result = await Book.find(query);
    return result;
}



// // flexible findBooks  queries examples

// // 1. No arguments (safe because of = {})
// await findBooks(); 
// // --> works, returns all books

// // 2. Pass only query
// await findBooks({ query: { genre: 'fiction' } });
// // --> returns all fiction books

// // 3. Top 5 sorted by readCount
// await findBooks({ query: {}, sort: { readCount: -1 }, limit: 5 });

// // 4. Page 2, 10 books per page
// await findBooks({ query: { status: 'completed' }, page: 2, limit: 10 });
export async function findBooksWithFilters(
    {
    query = {}, //default query
    sort = {},  //random or no sorting 
    page = 1,//default page number
    limit = 0 //default limit 0
    } = {} //default value for whole object
    ) {

    const skip = (page-1) * limit;
        
   const result = await Book.find(query)
        .sort(sort)
        .skip(skip) //if limit skip 10 results else skip 0
        .limit(limit);
    return result;
}