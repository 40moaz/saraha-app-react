import { Route, Routes } from "react-router-dom";
import Input from "../components/Input";
import Messages from "../components/Messages";
import "../styles/app.css";

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div className="ui">
              <h1>إكتبلي رسالة سرية 💌</h1>
              <p className="p" dir="rtl">
                لو في حاجة مضايقاك أو زعلان مني، اكتب هنا <br />
                ومش هعرف مين اللي كتب الرسالة.
              </p>
              <Input />
            </div>
          }
        />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
}
