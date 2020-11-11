const express = require('express');

const router = express.Router();

router.post("/", (req, res) => {
    if (res.status(200)){
        res.send("Token ok")
        
    } else {
        res.send("Token invalido")
    }
    
})

module.exports = router;