import mongoose , {model , Schema} from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoDbUrl = process.env.MONGODB_URL;

if (!mongoDbUrl) {
    throw new Error("MONGODB_URL is not defined in environment variables");
}

mongoose.connect(mongoDbUrl).then(()=>{
    console.log("mongodb is connected");
})

const UserSchema = new Schema({
    userName :{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true,
    }
});

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title : {
        type : String,
    },
    type: String,
    link :{
        type : String
    },
    tags : [{type:mongoose.Types.ObjectId , ref: "Tag"}],
    userId :{type : mongoose.Types.ObjectId , ref : "User" , requrired : true},
    content : {
        type : String
    }
})

export const ContentModel = model("Content" , ContentSchema)

const LinkSchema = new Schema({
    hash : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId , 
        ref : "User",
        required : true,
        unique : true,
    },
});

export const LinkModel  = model("Link" , LinkSchema);