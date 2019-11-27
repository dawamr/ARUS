const express = require("express");
const user = express.Router();

const userController = require("../controllers").user;
const familyController = require("../controllers").family;

user.get("/", userController.index);
user.get("/:id", userController.detail);
user.put("/:id", userController.update);
user.post("/", userController.create);
user.delete("/:id", userController.delete);

user.get("/:id/family", familyController.index);
user.get("/:id/family/:family_id", familyController.detail);
user.post("/:id/family", familyController.create);
user.put("/:id/family/:family_id", familyController.update);
user.delete("/:id/family/:family_id", familyController.delete);

module.exports = user;
