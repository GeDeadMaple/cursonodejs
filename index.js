require("dotenv").config();
let express = require("express");
let app = express();
let router = express.Router();


router.get("/v1/users", async (req, resp) => {
    objUsers
      .getUsers()
      .then(msg => {
        resp.status(200).send({ msg: "Informacion", data: msg });
      })
      .catch(err => {
        console.log(err);
      });
  });

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado correctamente ${process.env.PORT}`);
});