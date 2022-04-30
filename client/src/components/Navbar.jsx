import { useEffect, useState } from "react";

const Navbar = ({ socket, user }) => {
  const [alerts, setAlerts] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    socket.on("getAlerts", (data) => {
      setAlerts((alerts) => [...alerts, data]);
    });
  }, [socket]);

  const displayAlert = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    }
    if (type === 2) {
      action = "commented";
    }
    return `${senderName} ${action} on your post`;
  };

  const handleRead = () => {
    setAlerts([]);
    setOpen(false);
  };

  return (
    <nav className="bg-pink-500 w-full flex items-center justify-between p-6">
      <div className="space-x-12 flex items-center">
        <div className="relative" onClick={() => setOpen(!open)}>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.042 19.003h5.916a3 3 0 0 1-5.916 0Zm2.958-17a7.5 7.5 0 0 1 7.5 7.5v4l1.418 3.16A.95.95 0 0 1 20.052 18h-16.1a.95.95 0 0 1-.867-1.338l1.415-3.16V9.49l.005-.25A7.5 7.5 0 0 1 12 2.004Z"
              fill="#ffffff"
            />
          </svg>
          {alerts.length > 0 && (
            <div className="absolute bottom-3 left-3 bg-white text-pink-500 rounded-full border-2 border-pink-500 h-7 p-3 grid place-content-center text-sm font-semibold">
              {alerts.length}
            </div>
          )}
          {/* display alert */}
          {alerts.length > 0 && open && (
            <div className="absolute top-9 left-0 bg-white/90 backdrop-blur-md rounded-md overflow-hidden">
              <div className="max-h-96 overflow-y-auto divide-y">
                {alerts.map((alert, i) => (
                  <div key={i} className="text-sm font-semibold px-6 py-3">
                    {displayAlert(alert)}
                  </div>
                ))}
              </div>
              <button className="text-pink-500 text-xs font-semibold w-full p-3" onClick={handleRead}>
                Mark as read
              </button>
            </div>
          )}
        </div>
        <div className="relative">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.644-1.142l-4.29 1.117a.85.85 0 0 1-1.037-1.036l1.116-4.289A9.959 9.959 0 0 1 2 12C2 6.477 6.477 2 12 2Zm1.252 11H8.75l-.102.007a.75.75 0 0 0 0 1.486l.102.007h4.502l.101-.007a.75.75 0 0 0 0-1.486L13.252 13Zm1.998-3.5h-6.5l-.102.007a.75.75 0 0 0 0 1.486L8.75 11h6.5l.102-.007a.75.75 0 0 0 0-1.486L15.25 9.5Z"
              fill="#ffffff"
            />
          </svg>
          <div className="absolute bottom-3 left-3 bg-white text-pink-500 rounded-full border-2 border-pink-500 h-7 p-3 grid place-content-center text-sm font-semibold">
            43
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <img
          src={`https://avatars.dicebear.com/api/big-smile/:${user}.svg`}
          alt="logo"
          className="w-7 h-7 rounded-full"
        />
        <h1 className="text-xs text-white">{user}</h1>
      </div>
    </nav>
  );
};

export default Navbar;
