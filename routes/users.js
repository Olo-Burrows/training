var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.route('/server/api/users').get(function (req, res) {
    // Returns a user
    const user = db('users');
    
    if (!user) {
        initUsers();
    }
    res.send(user);
});

module.exports = router;
