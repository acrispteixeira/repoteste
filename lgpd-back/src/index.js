import express from "express";
import cors from "cors";

const app = express();

import pkg from 'body-parser';
const { json, urlencoded } = pkg;

//Adicionar no Módulo 4 para sequelize criar associações no banco de dados
import sequelize from "./utils/database.js";
import association from "./models/Associations.js";

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

import router from "./routes/router.js"; // criar router.js

//Adicionar no Módulo 4 essa função async + try catch + linha 33
(async () => {
    try {
        //Adicionar no Módulo 4 as duas linhas abaixo para sequelize e criação das tabelas
        association.associations();
        await sequelize.sync();
        app.listen(3000, function () {
            console.log("Listening to port 3000");
        });
    } catch (err) {
        console.log(err);
    }
})();

app.use("/", router);