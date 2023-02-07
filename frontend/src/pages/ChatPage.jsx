import "../index.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "../components/Chat";

const socket = io.connect("http://localhost:3000/chat");

function ChatPage() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      {!showChat ? (
        <div style={{ margin: 50, paddingTop: 100, paddingLeft: 500, paddingRight: 500 }}>
          <h1>Join To ChatRoom</h1>
          <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Name Or NickName"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          
          <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Room Name"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          </div>
          <br/>
          <button onClick={joinRoom} className="btn btn-primary">Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default ChatPage;