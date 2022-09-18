import { Schema, model } from "mongoose";
const postSchema = new Schema({
        text: {
          type: String,
          required: true,
          maxlength: 280,
          minlength: 5,
        },
        author: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        likes: [
          {
            type: Schema.Types.ObjectId,
            ref: "Like",
          },
        ],
        comments: [
          {
            type: Schema.Types.ObjectId,
            ref: "Comment",
          },
        ],
        isLiked: {
          type: Boolean,
          default: false,
        },
        commentsCount: {
          type: Number,
          default: 0,
        },
        likesCount: {
          type: Number,
          default: 0,
        },
        imageUrl: {
          type: String,
        },
}, { timestamps: true })

const Post = model('Post', postSchema);
export default Post;


