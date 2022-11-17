const Post = require("../models/Post");
const User = require("../models/User");
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


// Tengo que poner el autorID en el esquema de comentario y relacionarlo al crear el comentario





        // async getCommentsOnPost(req, res) {
        //     try {
        //         const post = await Post.findById(req.params.post_id);
        //         if(!post) {
        //             return res.status(400).send({ message: `There is no post with id ${req.params.post_id}`})
        //         }
        //         const comments = await Comment.find({ postId: req.params.post_id})
        //         res.status(201).send({message: `Comments in post ${req.params.post_id}`, comments})
        //     } catch (error) {
        //         console.error(error)
        //         res.status(500).send({ message: 'There was a problem creating the post', error })
        //     }
        // },



        // async createComment(req, res) {
        //     try {
        //         const post = await Post.findById(req.params.post_id);
        //         if(!post) {
        //             return res.status(400).send({ message: `There is no post with id ${req.params.post_id}`})
        //         }
        //         const comment = await Comment.create({ ...req.body, postId: req.params.post_id, userId: req.user._id})
        //         await Post.findByIdAndUpdate(req.params.post_id, { $push: {commentIds: comment._id}})
        //         res.status(201).send({message: "Post created", comment})
        //     } catch (error) {
        //         console.error(error)
        //         res.status(500).send({ message: 'There was a problem creating the post', error })
        //     }
        // },


module.exports = CommentController;
