import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import { io } from "socket.io-client";

const posts = [
  {
    username: "manikangkandas",
    place: "New York",
    caption: "I love the weather today😊",
  },
  {
    username: "gayatridas",
    place: "Guwahati",
    caption: "Awesome stuff🧑🏻‍💻",
  },
  {
    username: "dipambitabaishya",
    place: "Nalbari",
    caption: "Great deal😀",
  },
];

export default function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center sm:py-12 h-screen">
      {user ? (
        <div className="sm:max-w-xl w-full sm:rounded-lg overflow-hidden grid grid-cols-1">
          <Navbar socket={socket} user={user} />
          <main className="h-full overflow-y-scroll my-1 space-y-1">
            {posts.map((post, i) => (
              <Card post={post} key={i} socket={socket} user={user} />
            ))}
          </main>
        </div>
      ) : (
        <form className="flex flex-col justify-center items-center space-y-4 max-w-xl w-full bg-white p-12 rounded-md">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-2/3 px-9 py-3 bg-slate-100 rounded-full border border-transparent focus:border-pink-500 outline-none"
          />
          <button
            className="px-9 py-3 bg-pink-500 text-white rounded-full font-semibold outline-none hover:bg-pink-600"
            onClick={() => setUser(username)}>
            Sign in
          </button>
        </form>
      )}
    </div>
  );
}
