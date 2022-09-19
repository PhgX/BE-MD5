
import Post from "../../model/post";
import Like from "../../model/like";
import express, { Request, Response } from "express";
import { Error } from "mongoose";

class PostController {
  updatePost = async (req : any, res: Response) => {
    try {
      const userId = req.user._id;
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("author")
        .exec();
        
      const updatedPosts = posts.map((post) => {
        if (userId) {
            if (post.likes.includes(userId)) {
            post.isLiked = true;
          }
        }
        
        return post;
      });
      res.status(200).json({
        response: {
          posts: updatedPosts,
        },
        message: "Posts fetched successfully.",
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Something went wrong.",
        error: error.message,
      })
    }
  };
  
  getAllPostById = async (req : any, res: any) => {
    try {
      const userId = req.user._id;
      const id = req.params.id;
      const post = await Post.findOne({ _id: id }).populate("author").exec();
      console.log('getAllPostById - post.api.ts', post);
      if(post) {
          if (post.likes.includes(userId)) {
          post.isLiked = true;
        }
      }
      res.status(200).json({
        response: {
          post,
        },
        message: "Post fetched successfully.",
      });
    } catch (error : any) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong.",
        error: error.message,
      });
    }
  };
  
  addNewPost = async (req : any  , res: any) => {
    try {
      const author = {
        name: req.user.name,
        handle: req.user.handle,
        _id: req.user._id,
      };
      const post = new Post({ ...req.body, author });
      
      await post.save();
      res.status(201).json({
        response: {
          post,
        },
        message: "Post created successfully.",
      });
    } catch (error : any) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong.",
        error: error.message,
      });
    }
  };
  
  DeletePostById = async (req : any  , res: any) => {
    try {
      const userId = req.user._id;
      const id = req.params.id;
      const post = await Post.findOneAndDelete({ id, author: userId });
      if (!post) {
        res.status(404).json({
          message: "Post couldn't be found.",
        });
      }
      res.json({
        response: {
          post,
        },
        message: "Post deleted successfully",
      });
    } catch (error : any) {
      res.status(500).json({
        message: "Something went wrong.",
        error: error.message,
      });
    }
  };
  
  // like and unlike a post
  LikeAndUnLikeAPost = async (req : any  , res: any) => {
    try {
      const userId = req.user._id;
      const post = await Post.findOne({ _id: req.body.id });
      if (!post) {
        return res.status(404).json({
          message: "Post couldn't be found.",
        });
      }
      const foundLike = await Like.findOne({ postId: post._id, author: userId });
      if (!foundLike) {
        post.isLiked = true;
        const newLike = new Like({ postId: post._id, author: userId });
        await newLike.save();
        console.log('post - post.api.ts', post)
        // post.likes.push(newLike);
      } else {
        post.isLiked = false;
        await Like.findOneAndDelete({ postId: post._id, author: userId });
        // const foundIndex = post.likes.indexOf(foundLike._id);
        // post.likes.splice(foundIndex, 1);
      }
  
      await post.save();
      res.status(200).json({
        response: { post },
        message: "Post updated successfully.",
      });
    } catch (error : any) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong.",
        error: error.message,
      });
    }
  };
}

export default new PostController;
