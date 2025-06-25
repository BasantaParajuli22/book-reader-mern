
import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({//creating mongoose schema 
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", //reference to Book 
        required: true
    },
    title: {    
       type: String,
       trim: true,
       maxLength: 50
    },  
    chapterNumber:{
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    order: { 
        type: Number,
        required: true
    }
    }, { timestamps: true });

chapterSchema.index({ bookId: 1, chapterNumber: 1 }); // Compound index
chapterSchema.index({ bookId: 1, order: 1 }); // For ordered chapters

const Chapter = mongoose.model("Chapter", chapterSchema);
export default Chapter;