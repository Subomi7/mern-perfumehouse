import mongoose from 'mongoose';

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
        dbName: "perfume-house"
    });
    console.log('mongoDB connected successful');
  } catch (error) {
    console.log(error.message);
  }
};
