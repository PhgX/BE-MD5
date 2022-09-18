import{Schema,model} from "mongoose";
export const commentSchema = new Schema({
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = model('Comment',commentSchema);
export default Comment;



