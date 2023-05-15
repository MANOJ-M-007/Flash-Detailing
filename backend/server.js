const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
const providerRoutes = require('./routes/providerRoute')
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const PORT = 5000
dotenv.config()
console.log(process.env.API_SECRET);
connectDB();

const app = express();

app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("API is running")
})
app.use(cors())
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/provider', providerRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server started on port ${PORT}`))
