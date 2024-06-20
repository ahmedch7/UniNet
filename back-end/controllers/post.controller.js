import Post from "../models/post.js";
import { validationResult } from "express-validator";

// Create Post
export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single Post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!post)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// like Post

export const likePost = async (req, res, next) => {
  const {postId}=req.params
  const {userId}=req.body
  try{
    const post=await Post.findById(postId)
    if(!post){
      throw new CustomError("Post not found!", 404)
    }
    const user=await user.findById(userId)
    if(!user){
      throw new CustomError("Post not found!", 404)
    }
    if(post.likes.includes(userId)){
       throw new CustomError("You have already liked this post", 404)
    }
    post.likes.push(userId)
    await post.save()
    res.status(200).json({message: "Post liked successfully!", post})

  }
  catch(error) {
     next(error)
}
};


// Dislike Post

export const dislikePost = async (req, res, next) => {
  const {postId}=req.params
  const {userId}=req.body
  try{
    const post=await Post.findById(postId)
    if(!post){
      throw new CustomError("Post not found!", 404)
    }
    const user=await user.findById(userId)
    if(!user){
      throw new CustomError("Post not found!", 404)
    }
    if(post.likes.includes(userId)){
      throw new CustomError("You have not liked this post", 404)
   }
    post.likes=post.likes.filter(id=>id.toString()==userId)
    await post.save()
    res.status(200).json({message: "Post disliked successfully!", post})

  }
  catch(error) {
     next(error)
}
};

