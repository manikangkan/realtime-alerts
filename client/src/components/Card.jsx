import { useState } from "react";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);
  const handleAlert = (type) => {
    type === 1 && setLiked(!true);
    socket.emit("sendAlerts", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };
  return (
    <div className="bg-white divide-y">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img
            src={`https://avatars.dicebear.com/api/big-smile/:${post.username}.svg`}
            alt="profile image"
            className="w-9 h-9 rounded-full"
          />
          <div>
            <h1 className="text-sm font-semibold">{post.username}</h1>
            <p className="text-xs">{post.place}</p>
          </div>
        </div>
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM18 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            fill="#222F3D"
          />
        </svg>
      </div>
      <img
        src={`https://avatars.dicebear.com/api/big-smile/:${post.username}.svg?background=%23ec4899`}
        alt="profile image"
        className="w-full"
      />
      {/* caption */}
      <p className="p-3 text-sm">{post.caption}</p>
      {/* reactions */}
      <div className="flex items-center justify-between p-3">
        <div className="flex space-x-6 items-center">
          <div onClick={() => handleAlert(1)}>
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="m12.82 5.58-.82.822-.824-.824a5.375 5.375 0 1 0-7.601 7.602l7.895 7.895a.75.75 0 0 0 1.06 0l7.902-7.897a5.376 5.376 0 0 0-.001-7.599 5.38 5.38 0 0 0-7.611 0Z"
                fill={liked ? "#ec4899" : "#222F3D"}
              />
            </svg>
          </div>
          <div onClick={() => handleAlert(2)}>
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.25 2a3.25 3.25 0 0 0-3.241 3.007c.08-.005.16-.007.241-.007h9.5A4.25 4.25 0 0 1 19 9.25v6.5c0 .08-.002.161-.007.241A3.25 3.25 0 0 0 22 12.75v-6A4.75 4.75 0 0 0 17.25 2h-9Z"
                fill="#222F3D"
              />
              <path
                d="M17.99 16a3.25 3.25 0 0 1-3.24 3h-4.083L7 21.75c-.824.618-2 .03-2-1v-1.76a3.25 3.25 0 0 1-3-3.24v-6.5A3.25 3.25 0 0 1 5.25 6h9.5A3.25 3.25 0 0 1 18 9.25v6.5c0 .084-.003.168-.01.25Z"
                fill="#222F3D"
              />
            </svg>
          </div>
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.747 4h3.464a.75.75 0 0 1 .102 1.493l-.102.007H6.747a2.25 2.25 0 0 0-2.245 2.096l-.005.154v9.5a2.25 2.25 0 0 0 2.096 2.245l.154.005h9.5a2.25 2.25 0 0 0 2.245-2.096l.005-.154v-.498a.75.75 0 0 1 1.494-.101l.006.101v.498a3.75 3.75 0 0 1-3.55 3.745l-.2.005h-9.5a3.75 3.75 0 0 1-3.745-3.55l-.005-.2v-9.5a3.75 3.75 0 0 1 3.55-3.745l.2-.005h3.464-3.464ZM14.5 6.544V3.75a.75.75 0 0 1 1.187-.61l.082.069 5.994 5.75c.28.268.306.7.077.997l-.077.085-5.994 5.752a.75.75 0 0 1-1.262-.434l-.007-.107V12.45l-.321-.006c-2.658-.008-4.93 1.083-6.865 3.301-.496.568-1.425.132-1.306-.612.827-5.14 3.6-8.045 8.19-8.559l.302-.03V3.75v2.794Z"
              fill="#222F3D"
            />
          </svg>
        </div>
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23 6.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0ZM18 7l.001 2.504a.5.5 0 1 1-1 0V7h-2.505a.5.5 0 0 1 0-1H17V3.5a.5.5 0 0 1 1 0V6h2.497a.5.5 0 0 1 0 1H18Zm-.5 6c.517 0 1.02-.06 1.5-.174v8.42a.75.75 0 0 1-1.187.608l-5.811-4.181-5.812 4.18a.75.75 0 0 1-1.188-.608V6.25A3.25 3.25 0 0 1 8.252 3h3.77A6.5 6.5 0 0 0 17.5 13Z"
            fill="#222F3D"
          />
        </svg>
      </div>
    </div>
  );
};

export default Card;
