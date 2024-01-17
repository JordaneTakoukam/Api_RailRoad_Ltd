import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';


const userSchema = new mongoose.Schema({
  role: { type: String, default: "client" }, // client, // employed ,  // admin
  email: { type: String, required: true, unique: true },
  pseudo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateRegistration: { type: Date, required: true },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// userSchema.index({ "email": 1 }, { unique: true });

const User = mongoose.model('User', userSchema, "users");

export default User;
