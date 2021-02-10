import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    //** 同じユーザ名は使えない */
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
});
