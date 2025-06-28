// @ts-check
import Chapter from '../models/Chapter.js';
import * as chapterService from '../services/chapterService.js';

// Create a chapter for a specific book
export async function createChapter(req, res) {
  try {
    const { bookId } = req.params;
    const { title, chapterNumber, content, order } = req.body;

    if( !content || !order || !chapterNumber){
       return res.status(400).json({ message: "Missing required fields" });
    }
    const savedChapter = await chapterService.createChapter(bookId, title, chapterNumber, content, order);
    res.status(201).json(savedChapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a chapter by bookId and chapterId
export async function updateChapter(req, res) {
  try {
    const { bookId, chapterId } = req.params;
    const { title, chapterNumber, content, order } = req.body;
 
    if( !content || !order || !chapterNumber){
      return res.status(400).json({ message: "Missing required fields" });
    }
    const updated = await chapterService.updateChapter(bookId, chapterId, title, chapterNumber, content, order);
    if (!updated) return res.status(404).json({ message: 'Chapter not found or book mismatch' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete one chapter by bookId and chapterId
export async function deleteChapter(req, res) {
  try {
    const { bookId, chapterId } = req.params;
    const deleted = await chapterService.deleteChapter(bookId, chapterId);
    if (!deleted) return res.status(404).json({ message: 'Chapter not found or book mismatch' });
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete all chapters by bookId
export async function deleteAllChapters(req, res) {
  try {
    const { bookId } = req.params;
    const result = await chapterService.deleteAllChapters(bookId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Count total chapters of a book
export async function countChaptersByBook(req, res) {
  try {
    const { bookId } = req.params;
    const count = await chapterService.countChaptersByBook(bookId);
    res.status(200).json({ totalChapters: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all chapters id title and chapterNo of a book (ordered)
export async function getChaptersByBookId(req, res) {
  try {
    const { bookId } = req.params;
    const chapters = await chapterService.findAllChapterByBookId(bookId);
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Get top 3 chapters of a book
export async function getTop3ChaptersByBook(req, res) {
  try {
    const { bookId } = req.params;
    const chapters = await chapterService.findTop3ChapterByBookId(bookId);
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// // Get top 3 chapters from all books
// export async function getTop3ChaptersOfAll(req, res) {
//   try {
//     const chapters = await chapterService.findTop3ChaptersOfAll();
//     res.status(200).json(chapters);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// Get a specific chapter from a book
export async function getOneChapterByBook(req, res) {
  try {
    const { bookId, chapterId } = req.params;
    const chapter = await chapterService.findOneChapterByBookId(bookId, chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get chapters with filters, pagination
export async function getChaptersWithFilters(req, res) {
  try {
    const {
      genre,
      status,
      title,
      bookId,
      page,
      limit,
      sortBy,
      order //-> asc desc
    } = req.query;

    const query = {};
    if (bookId) query.bookId = bookId;
    if (genre) query.genre = genre;
    if (status) query.status = status;
    if (title) query.title = { $regex: title, $options: 'i' };

    const sort = sortBy ? { [sortBy]: order === 'asc' ? 1 : -1 } : {};

    const result = await chapterService.findChaptersWithFilters({
      query,
      sort,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 0
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Get current chapter
// Get previous and next chapters by order field
export async function getChapterWithNavigation(req, res) {
  try {
    const { bookId, chapterId } = req.params;

    const current = await Chapter.findOne({ _id: chapterId, bookId });
    if (!current) return res.status(404).json({ message: 'Chapter not found' });

    const previous = await Chapter.findOne({
      bookId,
      order: { $lt: current.order }
    }).sort({ order: -1 });

    const next = await Chapter.findOne({
      bookId,
      order: { $gt: current.order }
    }).sort({ order: 1 });

    res.status(200).json({ current, previous, next });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

