/* import mongoose from "mongoose";
var Schema = mongoose.Schema;

var user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  since: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

var User = mongoose.model("User", user);

export default User;
 */

import { Schema, model, models } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface User {
  name: string;
  email: string;
}

// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

// 3. Create a Model.
const UserModel = models.User || model<User>("User", schema);

/* const UserModel = model<User>("User", schema); */

export default UserModel;
