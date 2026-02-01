import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import "../styles/Input.css";
const Input = () => {
  const [text, setText] = useState("");
  const [textWarning, setTextWarning] = useState(true);
  const [isSend, setIsSend] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      console.log("please text");
      setTextWarning(false);
      setTimeout(() => {
        setTextWarning(true);
      }, 2000);
    } else {
      setTextWarning(true);
      console.log({ message: text });
      setText("");
      setIsSend(true);
    }
  };
  return (
    <div>
      <form className="inputForm" onSubmit={onSubmit}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <textarea
            className="Input"
            name="text Input"
            dir="rtl"
            placeholder="اكتب اللي في قلبك ومش هعرف إنت مين 😉❤"
            onChange={(e) => setText(e.target.value)}
            value={text}
            hidden={isSend}
          />
        </div>
        <h3 hidden={!isSend} style={{ color: "#ffdf", margin: "20px" }}>
          تم إرسال الرسالة
        </h3>
        <a className="btn btn-primary" hidden={!isSend} href="/">
          إرسال رسالة أخرى
        </a>
        <p className="text-warning" hidden={textWarning}>
          ما تكتب رسالة يسطااااا
        </p>
        <button hidden={isSend} className="sendBtn" type="submit">
          <AiOutlineSend size={25} />
        </button>
      </form>
    </div>
  );
};

export default Input;
