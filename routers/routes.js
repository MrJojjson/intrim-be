const post = require('../setters/post');
const get = require('../getters/get');
const validate = require('../getters/validate');

module.exports = router => {
  router.post("/getUser", (req, res) => {
    return get.user(req, res);
  });
  router.post("/registrateNewUser", (req, res) => {
    return post.newUser(req, res);
  });
  router.post("/loginUser", (req, res) => {
    return post.loginUser(req, res);
  });
  router.get('/logoutUser', (req, res, next) => {
    return post.logoutUser(req, res, next);
  });
  router.get("/profile", (req, res) => {
    return get.user(req, res);
  });

  /*VALIDATION*/
  router.post("/validateUser", (req, res) => validate.user(req, res));
  router.post("/validateOrganisation", (req, res) => validate.organisation(req, res));

}

