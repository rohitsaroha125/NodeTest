const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  if (url === "/") {
    res.write(
      `<html><head></head><body><form action="/create-user" method="POST"><input type="text" placeholder="Enter Name" name="username"><button type="submit">Submit</button></form></body></html>`
    );
    return res.end();
  }
  if (url === "/users") {
    res.write(
      `<html><head></head><body><ul><li>User 1</li></ul></body></html>`
    );
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const findUsername = parsedBody.split("=")[1];
      console.log("username is ", findUsername);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
});

server.listen(5000);
