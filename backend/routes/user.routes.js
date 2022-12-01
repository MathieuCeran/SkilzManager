const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const useCtrl = require("../controllers/user");
const profilCtrl = require("../controllers/profil");
const multer = require("../middleware/multer-config");
const uploadAvatarCtrl = require("../controllers/avatar");
const usersFormationCtrl = require("../controllers/userFormation");

//Routes de connexion et de déconnexion
router.post("/signup", useCtrl.signup);
router.post("/login", useCtrl.login);
router.post("/logout", useCtrl.logoutUser);
router.get("/jwt", auth, useCtrl.getToken);

//Route profil utilisateurs
router.get("/", auth, profilCtrl.getAllUsers);
router.get("/:id", auth, profilCtrl.userInfo);
router.post("/:id", auth, multer, profilCtrl.updateUser);
router.delete("/:id", auth, multer, profilCtrl.deleteUser);

// Upload avatar
router.put("/avatar/:id", multer, uploadAvatarCtrl.uploadProfil);

//Formations
router.get("/formation/:id", auth, usersFormationCtrl.getUserFormation);

module.exports = router;
