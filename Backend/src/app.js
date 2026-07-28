import express from 'express'
import cookie from 'cookie-parser'
import UserRoute from './Routes/user.route.js'
import morgan from 'morgan'
import cors from 'cors'
import chatRouter from './Routes/chat.route.js'

const app = express()
const allowedOrigins = new Set([
    'https://Dorton-ai.onrender.com',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3000',
])

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
            callback(null, true)
            return
        }

        callback(new Error(`CORS blocked for origin ${origin}`))
    },
    credentials:true,
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json())
// app.use(express.static('./public'))
app.use(cookie())
app.use(morgan('dev'))



app.use('/api/auth',UserRoute)
app.use('/api/chats',chatRouter)

// app.use('*name',(req,res)=>{
//     res.sendFile(path.join(__dirname , ".." , './public/index.html'))

// })

export default app;