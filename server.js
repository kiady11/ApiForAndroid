const express = require('express');
const path = require("path");
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

//Middleware
app.use(express.json());

//import routes
const lessonRouter = require("./routes/lessonRouter");
const coursRouter = require("./routes/coursRouter");
const quizzRouter = require("./routes/quizzRouter");
const preferenceRouter = require("./routes/preferenceRoute");
const contenuRouter = require("./routes/contenuRoute");
const authRouter = require("./routes/authRoute");
const uploadRouter = require('./routes/uploadRoute');
const booksRouter = require('./routes/booksRoute')
app.use("/api", lessonRouter);
app.use("/api", coursRouter);
app.use("/api", quizzRouter);
app.use("/api", preferenceRouter);
app.use("/api", contenuRouter);
app.use("/api", authRouter);
app.use("/api", uploadRouter);
app.use("/api", booksRouter)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

//use mongoose
const db = require("./database/index")
//connection db
db.mongoose
    .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("database connected")
    })
    .catch(err => {
        console.log(err)
        process.exit()
    })

app.listen({ port: process.env.PORT || 5000 }, async () => {
    console.log("server started")
})