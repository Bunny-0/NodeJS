const express=require('express');
const mongoose=require('mongoose');
const FormModel=require('./FormModel');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//"mongodb+srv://Bunny:Bunny@cluster0.mcxkr.mongodb.net/BackendLearning?retryWrites=true&w=majority";
const mongoURI =
  "mongodb+srv://Bunny:Bunny@atlascluster.hnftplf.mongodb.net/BackendLearning?retryWrites=true&w=majority&ssl=true";

try {
  // Connect to the MongoDB cluster
    mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}

// const dbConnection = mongoose.connection;
// const mongoURI='mongodb+srv://Bunny:Bunny@cluster0.mcxkr.mongodb.net/BackendLearning?retryWrites=true&w=majority';
// console.log("reached before");

// mongoose.connect(mongoURI,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then((res)=>{
//     console.log('connecting');
//     console.log(res);
//     console.log('connected to db');
// })

// console.log("reached after");

//api->name ,request method(Get,post,put, patch ,delete)

app.get('/',(req,res)=>{ 
    res.send('Welcome to my app');
})
app.listen(3000,()=>{
    console.log('listening on port 3000');
})

app.get('/myapi',(req,res)=>{
    res.send(`
        <html>
            <head></head>
            <body>
                <p>My Form</p>
                <form>

                    <label for="name">Name</label>
                    <input type="text" name="name" required></input>
                    <label for="name">Phone</label>
                    <input type="text" name="phone" required></input>
                    <label for="name">Email</label>
                    <input type="text" name="email" required></input>
                    <label for="Grade">Grade</label>
                    <input type="text" name="grade" required></input>                  
                    <button type="submit">Submit</button>

                </form>
            </body>
        </html>
    `);
})

app.post('/submit_form',async (req,res)=>{
    const {grade,name,phone,email}=req.body;
    if(!grade||!name||!phone||!email){
        
        res.send({
            status:400,
            message:"Missing data",
            data:req.body
        })
    }

    if(phone.length!=10)
    {
        res.send({
            status:400,
            message:"Invalid phone Number",
            data:req.body
        })
    }
    if( grade.length>1){
        res.send({
            status:400,
            message:"Invalid Grade",
            data:req.body

        })
    }

    console.log(req.body);
    let formData=new FormModel({
        name,
        grade,
        phone
        
    })
    
    if(email)
        formData.email=email;
    
        console.log(req.body);
        let formDb=await formData.save();
        console.log("data filled");
        console.log(formDb);
        res.send({
            status:200,
            message:"Form Submitted Successsfully",
            data:req.body
        });

})

app.get('/read_forms',async (req,res)=>{
    const formData=await FormModel.find();

    res.send({
        status:200,
        message:"Read data successfully",
        data:formData

    })
})


app.get('/myapi/:id/:name',(req,res)=>{
    console.log(req.params);
    console.log(req.query);
    res.send("Myapi Id"+req.params.id);
})

app.get('/myapi/:id',(req,res)=>{
    res.send("my api"+req.params.id);

})

app.get('/myapi/rakes',(req,res)=>{
    res.send('Rohans api');
})

