const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");
const userRoutes = require("./routes/UserRoutes")
const { Server } = require("socket.io");

const PORT = 3010

const MONGODB = "mongodb+srv://Emaadkh:Emad2572@cluster0.f2ujd7x.mongodb.net/chat-app?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json())
app.use(express.urlencoded())

app.use("/api/user/", userRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}/`);
});
