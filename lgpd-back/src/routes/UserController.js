import express from "express";

//Modulo 7 - Adicionar esse import
import multer from "multer";
import process from "process"

//Modulo 7 - Adicionar essa configuração de storage
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images');
    },
    filename: function (req, file, callback) {
        callback(null, req.body.first_name + "_" + req.body.last_name + "_" + Date.now() + "_" + file.originalname);
    }
});
//Modulo 7 - Adicionar esse single para buscar o arquivo enviado
//Esse parametro file é o que precisa ser enviado pelo front para o multer achar
const upload = multer({ storage: storage }).single('file');

let router = express.Router();
import userService from "../services/UserService.js";

//1- salvar usuario
router.post("/addUser", async function (req, res) {
    //Modulo 7 - Adicionar essa função em volta do await e do save para o multer buscar o arquivo recebido
    upload(req, res, async function (err) {
        const userModel = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            //Modulo 7 - Add profile_picture
            profile_picture: req.file.path
        }

        if (err) {
            return res.end("Error uploading file.");
        }
        const user = await userService.saveUser(userModel);
        return res.status(200).json(user);
    });
});

//2- buscar todos usuarios
router.get("/getAllUsers", async function (req, res) {
    const allUsers = await userService.getAllUsers();
    return res.status(200).json(allUsers);
});

//3- buscar por id
router.get("/user/:id", async function (req, res) {
    const user = await userService.getUserById(req.params.id);
    return res.status(200).json(user);
});

//4- deletar por id
router.delete("/deleteUser/:id", async function (req, res) {
    const user = await userService.deleteUserById(req.params.id);
    return res.status(200).json(user);
});

//5- atualizar por id
router.put("/updateUser/:id", async function (req, res) {
    //Modulo 7 - Adicionar essa função em volta do await e do save para o multer buscar o arquivo recebido
    upload(req, res, async function (err) {
        const userModel = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            //Modulo 7 - Add profile_picture
            profile_picture: req.file.path
        };

        if (err) {
            return res.end("Error uploading file.");
        }
        const user = await userService.updateUserById(req.params.id, userModel);
        return res.status(200).json(user);
    });
});

//Modulo 7 - Criar esse novo endpoint para retornar a imagem
router.get('/userImage/:id', async function(req,res){
    const user = await userService.getUserById(req.params.id);
    //process.cwd() retorna o diretorio raiz do projeto
    res.sendFile(process.cwd() + "\\" + user.profile_picture);
});

export default router;