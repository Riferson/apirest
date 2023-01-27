const app = require("./app");

const porta = 3004;

const server = app.listen(porta, () => console.log("teste", porta));

process.on("SIGINT", () => {
  server.close();
  console.log("Server Finalizado");
});
