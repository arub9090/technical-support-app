const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const colors = require("colors");
const PORT = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const app = express();

//connect to the MongoDb Datahbase
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello this the The backEnd" });
});

app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//Serve FrontEnd
if (process.env.NODE_ENV === "production") {
  //set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
}else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello this the The backEnd" });
  });
  
}

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Hello Your Server Started on port ${PORT}...`)
);
