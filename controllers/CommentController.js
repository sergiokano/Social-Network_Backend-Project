const Post = require("../models/Post");
const Comment = require("../models/Comment");

const CommentController = {
    async createComment (req, res) {
        try {
          const comment = await Comment.create({...req.body, postId:req.params._id });        
            await Post.findByIdAndUpdate(req.params._id, { $push: {comments: comment._id}})
            res.status(201).send({msg: 'Comment posted' , comment});
          } catch (error) {
            console.error(error);
            res.status(500).send({ msg: "Error: Unable to create a comment", error });
          }
    }
}

module.exports = CommentController;
