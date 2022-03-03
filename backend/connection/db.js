import mongoose from "mongoose"
 
const connectDB=()=> mongoose.connect("mongodb://localhost:27017/proshopdata").then(()=>{
    console.log('connection success');
}).catch((e)=>{console.log('no connection');})

export default connectDB


// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect("mongodb://localhost:27017/proshopdata", {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     })

//     console.log('MongoDB Connected')
//   } catch (error) {
//     console.error(`Error`)
//     process.exit(1)
//   }
// }

// export default connectDB