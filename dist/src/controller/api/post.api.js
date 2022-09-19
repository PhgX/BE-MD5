"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("../../model/post"));
const like_1 = __importDefault(require("../../model/like"));
class PostController {
    constructor() {
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const posts = yield post_1.default.find()
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
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong.",
                    error: error.message,
                });
            }
        });
        this.getAllPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const id = req.params.id;
                const post = yield post_1.default.findOne({ _id: id }).populate("author").exec();
                console.log('getAllPostById - post.api.ts', post);
                if (post) {
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
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Something went wrong.",
                    error: error.message,
                });
            }
        });
        this.addNewPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const author = {
                    name: req.user.name,
                    handle: req.user.handle,
                    _id: req.user._id,
                };
                const post = new post_1.default(Object.assign(Object.assign({}, req.body), { author }));
                yield post.save();
                res.status(201).json({
                    response: {
                        post,
                    },
                    message: "Post created successfully.",
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Something went wrong.",
                    error: error.message,
                });
            }
        });
        this.DeletePostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const id = req.params.id;
                const post = yield post_1.default.findOneAndDelete({ id, author: userId });
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
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong.",
                    error: error.message,
                });
            }
        });
        // like and unlike a post
        this.LikeAndUnLikeAPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user._id;
                const post = yield post_1.default.findOne({ _id: req.body.id });
                if (!post) {
                    return res.status(404).json({
                        message: "Post couldn't be found.",
                    });
                }
                const foundLike = yield like_1.default.findOne({ postId: post._id, author: userId });
                if (!foundLike) {
                    post.isLiked = true;
                    const newLike = new like_1.default({ postId: post._id, author: userId });
                    yield newLike.save();
                    console.log('post - post.api.ts', post);
                    // post.likes.push(newLike);
                }
                else {
                    post.isLiked = false;
                    yield like_1.default.findOneAndDelete({ postId: post._id, author: userId });
                    // const foundIndex = post.likes.indexOf(foundLike._id);
                    // post.likes.splice(foundIndex, 1);
                }
                yield post.save();
                res.status(200).json({
                    response: { post },
                    message: "Post updated successfully.",
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "Something went wrong.",
                    error: error.message,
                });
            }
        });
    }
}
exports.default = new PostController;
