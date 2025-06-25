import Chapter from "../models/Chapter.js";

//create new  chapter using bookId and data
export async function createChapter(bookId, ChapterData){
    const newChapter = new Chapter({ ...ChapterData, bookId });
    const savedChapter = await newChapter.save();
    return savedChapter;   
}

//update chapter using bookId chapterId and data
export async function updateChapter(bookId, chapterId, updates) {
    const updatedChapter = await Chapter.findOneAndUpdate(
        { _id: chapterId, bookId },
        updates,
        {new: true}
    ); 
    return updatedChapter;
}

//delete all chapters by bookId
export async function deleteAllChapters(bookId) {
    const deletedChapter =await Chapter.deleteMany({ bookId });
    return deletedChapter;
}

//delete one chapter by bookId and chapterId
export async function deleteChapter(bookId, chapterId) {
    const deletedChapter = await Chapter.findOneAndDelete( {_id: chapterId, bookId  } );
    return deletedChapter;
}

export async function countChaptersByBook(bookId) {
  return await Chapter.countDocuments({ bookId });
}

//find all chapters id title and chapterNo by bookId
export async function findAllChapterByBookId(bookId) {
    return await Chapter.find({ bookId })
        .select('_id title chapterNumber')
        .sort({ order: -1 });
}


//top 3 chapters of bookId and book
export async function findTop3ChapterByBookId(bookId) {
   const result = await Chapter.find({ bookId })
    .sort( {order: -1} )
    .limit(3)
    .populate('bookId'); 
    return result;
}

// //top 3 chapters of all books and book
// export async function findTop3ChaptersOfAll() {
//    const result = await Chapter.find(
//     {  }.sort( {order: -1} ).limit(3).populate('bookId')
//    ); 
//     return result;
// }

//find one chapter by bookId and chapterId
export async function findOneChapterByBookId(bookId, chapterId) {
   const result = await Chapter.findOne( { _id: chapterId, bookId } ).populate('bookId');
    return result;
}

export async function findChaptersWithFilters(
    {
    query = {}, //default query
    sort = {},  //random or no sorting 
    page = 1,//default page number
    limit = 0 //default limit 0
    } = {} //default value for whole object
    ) {

    const skip = (page-1) * limit;    
    const result = await Chapter.find(query)
        .sort(sort)
        .skip(skip) //if limit skip 10 results else skip 0
        .limit(limit);
    return result;
}