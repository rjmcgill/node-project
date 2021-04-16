const {index, create, show, update, destroy} = require('../controllers/classes');

module.exports = router => {
    router.get("/classes", index);
    router.post("/classes", create);
    router.get("/classes/:id", show);
    router.put("/classes", update);
    router.delete("/classes", destroy);
}
