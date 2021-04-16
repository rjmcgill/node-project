module.exports = router => {
    require('./routes/characters')(router);
    require('./routes/classes')(router);
    
    return router;
}