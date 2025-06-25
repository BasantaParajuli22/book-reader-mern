import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({//creating mongoose schema 
    title: {    
       type: String,
       required: true,
       trim: true,
       maxLength: 50,
    },
    author: {  
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false, // by default required is false 
       trim: true,
       maxLength: 200,
    },
    genre:[     //this is array means 1 book can multiple genres
        {
            type: String,
            enum: ["fiction", "horror", "action", "adventure"],
            default:"horror",
        }
    ],  
    totalChapter:{
        type: Number,
        default: 0,
    },
    status:  {
        type: String,
        enum: ["completed", "ongoing", "drafted" ],
        default: "drafted",
    }, 
    coverImage: {
        type: String, // URL to cover image 
    }, 
    readCount: {
        type: Number,
        default: 0,
    },
    }, { timestamps: true });

// index() -> Creates Fast lookup table for finding documents   
//1 => asc -1 => desc  Internal organization (asc or desc), not your result order

// Indexes for better query performance
bookSchema.index( { genre: 1});
bookSchema.index( { status: 1});
bookSchema.index( { readCount: -1});
bookSchema.index( { title: "text", description: "text" });

const Book = mongoose.model("Book", bookSchema);
export default Book;

/**
 * 
 * const dragonBooks = await Book.find({ 
  $text: { $search: "dragon wizard magic" } 
});

MongoDB searches for: title and description
Books containing "dragon" OR
Books containing "wizard" OR
Books containing "magic" OR
Any combination of these words

 */