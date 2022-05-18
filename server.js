const express = require('express');

const app = express();

//Middleware
app.use(express.json());

//import routes
const lessonRouter = require("./routes/lessonRouter");
const coursRouter = require("./routes/coursRouter");
const quizzRouter = require("./routes/quizzRouter");
const preferenceRouter = require("./routes/preferenceRoute");
const contenuRouter = require("./routes/contenuRoute");
const authRouter = require("./routes/authRoute");
app.use("/api", lessonRouter);
app.use("/api", coursRouter);
app.use("/api", quizzRouter);
app.use("/api", preferenceRouter);
app.use("/api", contenuRouter);
app.use("/api", authRouter); 

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