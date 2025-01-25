const express= require("express")
const app = express()
const cookieParser = require('cookie-parser');
const path =require('path')
const expressSession = require("express-session")
const flash = require("connect-flash")

require("dotenv").config();

const indexRouter = require("./routes/index")
const usersRouter = require('./routes/usersRouter')
const fileRouter = require("./routes/fileRouter")
const socialRouter = require("./routes/socialRouter")



const db = require("./config/mongoose-connection")

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
})
)
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')));


app.use("/",indexRouter)
app.use("/users", usersRouter)
app.use("/files", fileRouter);
app.use("/social", socialRouter)


app.listen(7000)