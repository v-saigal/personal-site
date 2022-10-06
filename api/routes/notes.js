const express = require("express");
const router = express.Router();

const NotesController = require("../controllers/notes");
router.post("/update", NotesController.Update);
router.get("/:id", NotesController.FindById)
router.get("/", NotesController.Index);
router.post("/", NotesController.Create);
router.delete("/", NotesController.Delete);
// router.put("/RemoveLike/", NotesController.RemoveLike);
// router.put("/comment/", NotesController.Comment );

module.exports = router;