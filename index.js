require("dotenv").config();
const jwt = require("jsonwebtoken");
let express = require("express");
let app = express();
let router = express.Router();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.get("/v1/user", async (req, resp) => {
    objUsers
      .getUsers()
      .then(msg => {
        resp.status(200).send({ msg: "Informacion", data: msg });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  router.post("/v1/user/", (req, resp) => {
    let objInfo = req.body;
    objUsers.saveUser(objInfo);
    resp.send(201).send({ status: 200, msg: "Pass encriptada" });
  });

  router.post("/v1/access", (req, resp) => {
    let infoBody = req.body;
    if (infoBody.user === "") {
      return resp.status(401).send({ msg: "Se requiere un nombre" });
    } else {
      let token = jwt.sign(
        {
          user: infoBody.user,
          comapany: infoBody.company,
          employee: infoBody.employee
        },
        process.env.PRIVATE_KEY
      );
      jwt.verify(token, process.env.PRIVATE_KEY, function(err, decoded) {
        console.log(decoded);
      });
      resp.status(200).send(token);
    }
  });

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado correctamente ${process.env.PORT}`);
});