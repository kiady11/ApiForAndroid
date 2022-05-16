const express = require('express');

const app = express();

//Middleware
app.use(express.json());

//import routes
const contenuRouter = require("./routes/contenuRoute");
app.use("/api", contenuRouter);

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