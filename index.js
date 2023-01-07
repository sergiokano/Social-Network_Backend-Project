const express = require("express");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8081;
const cors = require("cors");
const bodyParser = require("body-parser")

const { dbConnection } = require("./config/config");
app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/users", require("./routes/Users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/music", require("./routes/music"));


dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
