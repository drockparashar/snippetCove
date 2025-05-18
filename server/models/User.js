import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    githubId: { type: String },
    savedSnippets: [{ type: Schema.Types.ObjectId, ref: "Snippet" }],
    createdSnippets: [{ type: Schema.Types.ObjectId, ref: "Snippet" }],
  },
  { timestamps: true }
);

export default model("User", UserSchema);
