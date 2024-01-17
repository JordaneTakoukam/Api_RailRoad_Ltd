import mongoose from 'mongoose';

const connectMongoDB = async (url) => {
  console.log("🕟 wait, connecting to mongodb ....");
  mongoose.set('strictQuery', true);
  await mongoose.connect(url)
    .then(() => console.log('💾  mongoDB connecté !'))
    .catch((err) => {
      console.error('Impossibe de se connecter à mongoDB 😭😭😭');
      console.log(err);
      process.exit(1);
    });
};

export default connectMongoDB;
