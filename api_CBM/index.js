const express = require('express');
const port = 3001;
const app = express();
const router = require("./src/routes/router");
const cors = require('cors');
app.use(cors({
    methods: ['GET' , 'POST', 'DELETE']
  }));

  //Acesso do cors (estudar melhor o que é)
// Middleware para permitir requisições CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Define quem pode acessar a API (no caso, qualquer origem)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Define os métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Define os headers permitidos

  next();
});
app.use(express.json());
app.use(express.static("public"));
app.use("/", router);

app.listen(port, () =>{
    console.log(`funcionandoo! http://localhost:${port}`);
})