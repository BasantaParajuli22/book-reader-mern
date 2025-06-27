//@ts-check
import * as userService from '../services/userService.js';

//by default role is set to reader in User model
//so changing the role 
export async function changeUserRole(req, res) {
  try {
    const { role } = req.body;
    const userId = req.user.id;//getting userId from middleware which decodes jwt
    
    const user = await userService.changeUserRole(userId, role); 
    res.json({ message: 'Role updated', changedUser: user });
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}

export async function likeOrUnlikeBook(req, res) {
  try {
    const { bookId } = req.params;//get from params
    const userId = req.user.id;

    await userService.likeOrUnlikeBook(userId, bookId);
    res.json( {message: 'success'} );
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}

export async function likeOrUnlikeChapter(req, res) {
  try {
    const { chapterId } = req.params;//get from params
    const userId = req.user.id;

    await userService.likeOrUnlikeChapter(userId, chapterId);
    res.json( {message: 'success'} );
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}


//comments
export async function likeOrUnlikeComment(req, res) {
  try {
    const { commentId } = req.params;//get from params
    const userId = req.user.id;

    await userService.likeOrUnlikeComment(userId, commentId );
    res.json( {message: 'success'} );
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}

//needs chapterId params
//needs userId content from body
export async function addNewComment(req, res) {
  try {
    const { chapterId } = req.params;//get from params
    const { content, parentCommentId = null  } = req.body;
    const userId = req.user.id;

    const comment = await userService.addNewComment(userId, chapterId, parentCommentId, content);
    res.json( {message: 'success', comment: comment} );
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}

export async function updateComment(req, res) {
  try {
    const { commentId } = req.params;//get from params
    const { content } = req.body; //parentComponentId will not be updated only content
    const userId = req.user.id;
    const comment = await userService.updateComment(userId, commentId, content );
    res.json( {message: 'success', comment: comment} );
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}

export async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await userService.deleteComment(userId, commentId);
    res.json( {message: 'success', comment: comment} );
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}

export async function readComments(req, res) {
  try {
    const { chapterId } = req.params;
    const comments = await userService.readComments(chapterId);
    res.json( {message: 'success', comment: comments} );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function readCommentsWithFilters(req, res) {
  try {
    const { chapterId } = req.params;
    const { sortBy, order, createdAt, likes, page, limit } = req.query;

     const query = {};
    if (chapterId) query.chapterId = chapterId;
    if (createdAt) query.createdAt = { $gte: new Date(createdAt) };
    if (likes) query.likes = { $in: [likes] }; //likes store userId not count so//

    const sort = {};
    if (sortBy === 'likes') {
    } else if (sortBy) {
      sort[sortBy] = order === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = 1;
    }
     const comments = await userService.findCommentsWithFilters({
      query,
      sort,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10
    });

    const total = await userService.countComments(query);//count comments

    res.json( {message: 'success', comment: comments, total} );
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}
