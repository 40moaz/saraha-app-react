import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import emailjs from "emailjs-com";

const Input = () => {
  const [text, setText] = useState("");
  const [textWarning, setTextWarning] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      setTextWarning(true);
      setTimeout(() => setTextWarning(false), 2000);
      return;
    }

    try {
      setIsLoading(true);

      // أرسل الرسالة للـ backend
      const res = await fetch(
        "https://saraha-app-node.vercel.app/api/messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sender: "Anonymous", text }),
        }
      );

      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();

      // أرسل الرسالة على الإيميل
      await emailjs.send(
        "service_f8yt05m", // Service ID
        "template_0pckz64", // Template ID
        {
          message_text: text,
          date: new Date().toLocaleString(),
        },
        "VdfqC1PxEz1p8C0EX" // User ID
      );

      setText("");
      setIsSend(true);
    } catch (err) {
      console.error(err);
      alert("حصل خطأ أثناء إرسال الرسالة 😢 حاول مرة تانية");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAnother = () => setIsSend(false);

  return (
    <div className="inputContainer">
      <form className="inputForm" onSubmit={onSubmit}>
        {!isSend && (
          <>
            <textarea
              className="Input"
              dir="rtl"
              placeholder="اكتب اللي في قلبك ومش هعرف إنت مين 😉❤"
              onChange={(e) => setText(e.target.value)}
              value={text}
              disabled={isLoading}
            />
            <button className="sendBtn" type="submit" disabled={isLoading}>
              {isLoading ? "جاري الإرسال..." : <AiOutlineSend size={25} />}
            </button>
          </>
        )}

        {textWarning && <p className="text-warning">ما تكتب رسالة يسطااااا</p>}

        {isSend && (
          <div className="successMessage">
            <h3 style={{ color: "#fff" }} dir="rtl">
              تم إرسال الرسالة بنجاح 🎉
            </h3>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSendAnother}
            >
              إرسال رسالة أخرى
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Input;
