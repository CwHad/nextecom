import mongoose from 'mongoose'


const dbConnect = async () => {
    if(mongoose.connection.readyState >= 1) {
        return;
    }
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000,  // 连接超时设置为20秒
    }).then(() => {
            console.log('Database connected successfully');
        })
        .catch(err => {
            console.log('Database connection error', err);
        })
}

export default dbConnect;