//@ts-check
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
            //comment id auto generate by mongoose
    userId: { //store which user made a comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
    chapterId: { //store on which chapter comment was made 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
    },
    parentCommentId: {//for threading -> like replying to comment 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
    content: {
        type: String,
        required: true,
    },
    likes: [{ //store which user like this comment
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }],
}, { timestamps: true });//Automatically adds both createdAt and updatedAt fields.

commentSchema.index( {createdAt: 1} );
commentSchema.index( {likes: -1} );
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;