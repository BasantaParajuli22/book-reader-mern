import Book from "../models/Book.js";
import Chapter from "../models/Chapter.js";
import { items } from "./seedData.js";

// Checks if books collection is empty; if yes, seeds data
export async function checkAndSeedDatabase() {
  try {
    const count = await Book.countDocuments();
    if (count === 0) {
      console.log("No books found in database. Seeding now...");
      await seedDatabase();
    } else {
      console.log(" Database already has books. Skipping seed.");
    }
  } catch (error) {
    console.error("Error checking database:", error);
  }
}


// Seeds the database: clears existing data and adds sample data
export async function seedDatabase() {
  try {
    // Clear existing books and chapters
    await Book.deleteMany({});
    await Chapter.deleteMany({});
    console.log("Cleared existing books and chapters.");

    // Loop through each item in data
    for (const item of items) {
      // Create and save a new Book document
      const book = new Book({
        title: item.title,
        author: item.author,
        description: item.description,
        genre: item.title.toLowerCase().includes("fantasy") ? ["fantasy"]
          : item.title.toLowerCase().includes("sci-fi") ? ["sci-fi"]
          : ["fiction"],
        totalChapter: item.chapters.length,
        status: "completed",
      });

      const savedBook = await book.save();
      console.log(`Created book: ${savedBook.title}`);

      // Create chapters related to the saved book
      for (const chapterData of item.chapters) {
        const chapter = new Chapter({
          bookId: savedBook._id,
          title: chapterData.title,
          chapterNumber: chapterData.order,
          content: chapterData.content,
          order: chapterData.order,
        });

        await chapter.save();
        console.log(`  Created chapter: ${chapter.title}`);
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

