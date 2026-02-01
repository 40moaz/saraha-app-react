import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Messages = () => {
  const [password, setPassword] = useState("");
  const [textWarning, setTextWarning] = useState(true);
  const [wrongPass, setWrongPass] = useState(true);
  const [messages, setMessages] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === "" || password !== "2008") {
      setTextWarning(false);
      setTimeout(() => setTextWarning(true), 2000);
    } else setWrongPass(false);
  };

  useEffect(() => {
    fetch("https://saraha-app-node.vercel.app/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data.reverse())); // نعرض الأحدث أولاً
  }, []);

  return (
    <div className="messages-app">
      {/* Password Form */}
      <form hidden={!wrongPass} className="password-form" onSubmit={onSubmit}>
        <h2>Protected Area 🔒</h2>
        <input
          className="pass-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!textWarning && <p className="text-warning">Incorrect Password</p>}
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>

      {/* Back button */}
      <Link className="btn-back" to={"/"} hidden={wrongPass}>
        ← Back to Send Messages
      </Link>

      {/* Messages */}
      <div hidden={wrongPass} className="messages-container">
        <h2 dir="rtl">الرسائل الواردة</h2>
        <div className="cards-wrapper">
          {messages.length === 0 ? (
            <p className="no-messages">لا توجد رسائل حتى الآن 😔</p>
          ) : (
            messages.map((msg) => (
              <div key={msg._id} className="card">
                <div className="card-header">
                  رسالة جديدة
                  <span className="date">
                    {moment(msg.createdAt).format("DD/MM/YYYY - HH:mm")}
                  </span>
                </div>
                <div
                  className="card-body"
                  dir="rtl"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                ></div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
