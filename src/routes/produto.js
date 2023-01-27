const uploadUser = require("../middlewares/uploadImage");
module.exports = (app, db) => {
  const produto = db.get("produto");

  app.get("/produto", (req, res) => {
    try {
      const data = produto.value();
      return res.json(data);
    } catch (error) {
      return res.status(500);
    }
  });

  app.get("/produto/:idproduto", (req, res) => {
    try {
      const { idproduto } = req.params;
      const data = produto.find({ idProduto: idproduto }).value();

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500);
    }
  });

  app.post("/produto", (req, res) => {
    try {
      produto.push(req.body).write();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500);
    }
  });

  app.put("/produto/:idproduto", (req, res) => {
    try {
      const { idproduto } = req.params;
      produto.find({ idProduto: idproduto }).assign(req.body).value();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500);
    }
  });

  app.delete("/produto/:idproduto", (req, res) => {
    try {
      const { idproduto } = req.params;
      produto.remove(({ idProduto }) => idProduto === idproduto).write();
      return res.json(data);
    } catch (error) {
      return res.status(500);
    }
  });

  app.post("/upload-image", uploadUser.single("image"), async (req, res) => {
    console.log(req.file);
    try {
      if (req.file) {
        return res.json({
          erro: false,
          mensagem: "upload Realizado Com sucesso!",
        });
      }
    } catch (err) {
      return res.status(400).json({
        erro: true,
      });
    }
  });
};
