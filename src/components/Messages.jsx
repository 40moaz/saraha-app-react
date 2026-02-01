import React, { useState } from "react";
import "../styles/Messages.css";
import { Link } from "react-router-dom";
const Messages = () => {
  const [password, setPassword] = useState("");
  const [textWarning, setTextWarning] = useState(true);
  const [wrongPass, setWrongPass] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === "" || password !== "2008") {
      console.log("Incorrect Password");
      setTextWarning(false);
      setTimeout(() => {
        setTextWarning(true);
      }, 2000);
    } else {
      setWrongPass(false);
    }
  };
  return (
    <div className="messages">
      <form hidden={!wrongPass} className="passwordForm" onSubmit={onSubmit}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            className="pass"
            name="Enter Password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <p className="text-warning" hidden={textWarning}>
          Please Enter a valid Password
        </p>
        <button className="sendPassBtn" type="submit">
          Submit
        </button>
      </form>
      <Link
        className="btn btn-sm btn-primary"
        style={{ margin: "20px" }}
        to={"/"}
      >
        back to send messages
      </Link>
      <div hidden={wrongPass} className="cards">
        <h2 dir="rtl">الرسائل</h2>
        <div className="card">
          <h3 className="card-header" dir="rtl">
            رسالة جديدة
          </h3>
          <div className="card-body" dir="rtl">
            بحبك ونفسي اتجوزك
          </div>
        </div>
        <div className="card">
          <h3 className="card-header" dir="rtl">
            رسالة جديدة
          </h3>
          <div className="card-body" dir="rtl">
            زعلان منك اوي يسطى اوي اوي اوي اوي اوي اوي اوي اوي اوي اوي اوي اوي
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
