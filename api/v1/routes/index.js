const express = require("express")
const router = express.Router()
const AuthorController = require("../controllers/author.controller")

router.get("/", AuthorController.GET_ALL_USERS)
router.get("/:id", AuthorController.GET_USER_BY_ID)
router.post("/", AuthorController.CREATE_USER)
router.delete("/:id", AuthorController.DELETE_USER)


module.exports = router