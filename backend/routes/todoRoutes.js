const express=require("express");
const routes=require("../controllers/todosController");



const router = express.Router();

// get
router.get("/getTask",routes.handleGetTask);

router.post("/addTask",routes.handleInsertTask);


//
router
.route("/task/:id")
.put(routes.handleUpdateTask)
.delete(routes.handleDeleteTask);


// search
router.get("/search",routes.handleSearchTask)

module.exports=router;
