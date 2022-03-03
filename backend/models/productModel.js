import  Mongoose  from "mongoose";

const reviewSchema=Mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true,
    },
    comment:{
        type:String,
        require:true
    },
})


const productSchema=Mongoose.Schema({
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'user'
    },
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true,
    },
    brand:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        require:true,
        default:0
    },
    numReviews:{
        type:Number,
        require:true,
        default:0
    },
    price:{
        type:Number,
        require:true,
    },
    countInStock:{
        type:Number,
        require:true,
        default:0
    },
},{
    timestamps:true
})


const product=Mongoose.model('productdata',productSchema)

export default product