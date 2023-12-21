import express from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// app.use(
//   session({
//     name: "kuy",
//     secret: "kuykuy",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: true,
//       httpOnly: true,
//       maxAge: 3600000,
//       sameSite: "none",
//     },
//   })
// );

app.get("/", function (req, res) {
  console.log(req.cookies);
  res.send("berhasil terhubung");
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;

  if (email != "muiz@gmail.com" && password != "123") {
    return res.status(400).json({ message: "check your email or password" });
  }

  res.cookie("token", "berhasil login", {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
  });

  res.status(200).json({ message: "login success" });
});

app.listen(8080, function () {
  console.log("server is listening");
});
