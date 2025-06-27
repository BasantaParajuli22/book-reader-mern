//@ts-check
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Chapter from "../models/Chapter.js";

export async function changeUserRole(id, role) {
    const allowedRoles = ['admin', 'reader'];

    if (!allowedRoles.includes(role)) {
      throw new Error(`Invalid role needs to 'admin' or 'reader'`);
    }
    const user = await User.findByIdAndUpdate(
      id,   //id of user 
      { role }, //update to be made in object
      { new: true } //returns update docs instead of old(default)
    );
    return user
}

export async function likeOrUnlikeBook(userId, bookId) {
  const user = await User.findById(userId);
  if(!user){
    throw new Error('User not found by likeOrUnlikeBook');
  }

  const alreadyLiked =  user?.likedBooks.includes(bookId);
  if(alreadyLiked){
    user.likedBooks.pull(bookId);  // Remove
  }else{
    user.likedBooks.push(bookId);  // add
  } 
  return await user.save();  
}

export async function likeOrUnlikeChapter(userId, chapterId) {
  const user = await User.findById(userId);
  if(!user){
    throw new Error('User not found by likeOrUnlikeChapter');
  }

  const alreadyLiked =  user?.favouriteChapters.includes(chapterId);
  if(alreadyLiked){
    user.favouriteChapters.pull(chapterId);  // Remove
  }else{
    user.favouriteChapters.push(chapterId);  // add
  } 
  return await user.save(); 
}

export async function likeOrUnlikeComment(userId, commentId) {
  const user = await User.findById(userId);
  const comment = await Comment.findById(commentId);
  if(!user || !comment) {
    throw new Error('User or comment not found by likeOrUnlikeComment');
  }

  //updating like for every req not making new one
  const alreadyLiked =  comment.likes?.includes(userId);
  if(alreadyLiked){
    comment.likes.pull(userId);  // Remove userId from comment likes
  }else{
    comment.likes.push(userId);  // add userId from comment likes
  } 
  await user.save(); 
  return comment;
}

export async function addNewComment(userId, chapterId, parentCommentId, content) {
  const user = await User.findById(userId);
  const chapter = await Chapter.findById(chapterId);
  if(!user || !chapter) {
    throw new Error('User or chapter not found by addNewComment');
  }

  const newComment = new Comment({
    content: content,
    userId: userId,
    chapterId: chapterId,
    parentCommentId: parentCommentId
  });
 
  await newComment.save(); 
  return newComment;
}

export async function updateComment(userId, commentId, content) {
  const user = await User.findById(userId);
  if(!user) {
    throw new Error('User or chapter not found by updateComment');
  }
  const updatedComment = await Comment.findByIdAndUpdate(commentId, content, {new: true});
  if(!updatedComment){
    throw new Error('Comment not found by updateComment');
  }
  return updatedComment;
}

export async function deleteComment(userId, commentId) {
  const user = await User.findById(userId);
  if(!user) {
    throw new Error('User or chapter not found by deleteComment');
  }

  const comment = await Comment.findById(commentId);
  if(!comment){
    throw new Error('Comment not found by deleteComment');
  }
  await deleteCommentAndReplies(commentId);
  return comment;
}

// Recursively delete comment and all its child replies
export async function deleteCommentAndReplies(commentId) {
  // Get all direct children which has same Id as this commentId
  const childComments = await Comment.find({ parentCommentId: commentId });
  
  // For each child, delete its children too
  for (const child of childComments) {
    await deleteCommentAndReplies(child._id);
  }
  // Delete the current comment
  await Comment.findByIdAndDelete(commentId);
}

export async function readComments(chapterId){
  const comments = await Comment.find({ chapterId })
    .sort({ createdAt: 1 }) // oldest first by default
    .populate('userId', 'email');
  return comments;
}

export async function findCommentsWithFilters({
  query = {},
  sort = {},
  page = 1,
  limit = 10
} = {}) {
  const skip = (page - 1) * limit;

  const comments = await Comment.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('userId', 'email'); 

  return comments;
}

export async function countComments( query = {}){
  const count = await Comment.countDocuments(query);
  return count;
}