const express = require("express");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8081;

const { dbConnection } = require("./config/config");
app.use(express.json());

app.use("/users", require("./routes/Users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));

dbConnection();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
