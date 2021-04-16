const {index, create, show, update, destroy} = require('../controllers/characters');

module.exports = router => {
    router.get("/characters", index);
    router.post("/characters", create);
    router.get("/characters/:id", show);
    router.put("/characters", update);
    router.delete("/characters", destroy);
}
