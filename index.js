const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
  res.send("Servidor en express")
});

app.listen(port, () => {
  console.info(`✅ Server express on: http://localhost:${port}`)
})
