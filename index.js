import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

// the logging middleware
function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const accessToken = req.headers.authorization || "(No access token)";
  console.log(`[${timestamp}] ${method}: ${url}, AccessToken: ${accessToken}`);
  next();
}
// applying midleware globally
app.use(loggingMiddleware);

app.use(bodyParser.json());
app.use("/users", usersRoutes);
app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () =>
  console.log(`Server is running on: http://localhost:${PORT}`)
);
