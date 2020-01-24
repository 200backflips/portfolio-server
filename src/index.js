import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => res.send("what up"));

app.listen(port, () => console.log(`listening on port ${port}!`));
