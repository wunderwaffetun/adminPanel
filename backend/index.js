import express from 'express'
import bodyParser from 'body-parser';
// import cors from './middleware/cors.middleware.js';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/user.routes.js';
import { authRouter } from './routes/auth.routes.js';
import dotenv from 'dotenv';
import { db } from './models/index.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const Role = db.role 

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false })) //not use, need for handle form's action
app.use(bodyParser.json())
app.use('/', authRouter)
app.use('/', userRouter)

// db.sequelize.sync(/*{force: true}*/).then(()=> {
//     console.log('drop and resync db')
//     // initial() // for creating roles at first time
// })



function initial(){
    Role.create({
        id: 1, 
        position: 'sec'
    });
    Role.create({
        id: 2, 
        position: 'codir'
    });
    Role.create({
        id: 3, 
        position: 'dir'
    }),
    Role.create({
        id: 4, 
        position: 'user'
    });
}



app.listen(PORT, () => {
    console.log('start server ' + PORT);
});