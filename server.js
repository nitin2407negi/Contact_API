import express from 'express'
import bodyParser from 'express'
import mongoose from 'mongoose';
import userRouter from './routers/user.js'
import contactRouter from './routers/Contact.js';
import {config} from 'dotenv';
import cors from 'cors'

const app = express();
app.use(bodyParser.json())


//.env setup
config({path:'.env'})

//cors setup
app.use(cors({
    origin:true,
    methods:["POST","DELETE","GET","PUT"],
    credentials:true,
}))

mongoose.connect(process.env.MongoUrl,{ dbName: "Nodejs_API" }).then(() => { console.log("db is connect") }).catch((err) => console.log(error))

//user router
app.use('/api/user', userRouter)
//contact router
app.use('/api/Contact', contactRouter)










const port = 1000;
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})
