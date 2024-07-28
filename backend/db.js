const mongoose = require("mongoose");
// import { mongoKey } from "./secret";
//const mongoKey = require('./secret.js');
// mongodb+srv://jaruplakrishna:jarupla22033@cluster0.aomdxuf.mongodb.net/
// mongodb+srv://jaruplakrishna:krishna@cluster0.kmoaeoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const url="mongodb+srv://jaruplakrishna:krishna@cluster0.kmoaeoj.mongodb.net/ff?retryWrites=true&w=majority&appName=Cluster0";
const url1="mongodb://localhost:27017/FastFood";
const mongoDB= async ()=>{
    mongoose.connect(url1, { useNewUrlParser: true },async (err, res) => {
        if (err)
            console.log("---", err);
        else {
            console.log("connected");
            const foodData = await mongoose.connection.db.collection("fooddata"); 
            //console.log(data.findOne({"CategoryName":"Biryani/Rice"}).then(result=>{console.log(result);}));
            foodData.find({}).toArray(function name(err,data) {
                 console.log(data);
                if(err){
                    console.log(err)
                }
                else{
                    global.foodItems = data;
                }
            });
            const catData = await mongoose.connection.db.collection('foodcategory');
            catData.find({}).toArray(function name(err,data){
                if (err){
                    console.log(err);
                }
                else{
                    global.foodCategory =data;
                }
            })

        }
    });
// const itemSchema={
//     CategoryName:String,
// name:String,
// img:String,
// options:Array({
//     half:String,
//     full:String
// }),
// description:String
// };
// const foodItem= mongoose.model('fooddata',itemSchema);

// foodItem.find({},(err,res)=>{
//     if(!err){
//         console.log(res);
//     }
// })
    // if (!err){
    //     console.log("conected");
    //     // const fooditem= await mongoose.connection.db.collection("fooddata");
        
    //     // console.log(fooditem);
    //     foodItem.find({}, function (err,res){
    //         if (err){console.log(err)}
    //         else{
    //         console.log(res);
    //         }
    //     });
    //     // console.log(data);
    // }
    // else{
    //     console.log
    // }
// })

// foodItem.insertMany([{CategoryName:"Food",name:"byryani",img:"sdvkjn",options:[{half:"130",full:"230"}],description:"fbjnbpowirnbpenbpbpr"}]);


}



module.exports =mongoDB;