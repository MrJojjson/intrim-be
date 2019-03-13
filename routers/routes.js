const post = require('../setters/post');
const get = require('../getters/get');
const validate = require('../getters/validate');

module.exports = router => {
  router.post("/organisation/newOrganisation", (req, res) => {
    return post.newOrganisation(req, res);
  });
  router.post("/user/getUser", (req, res) => {
    return get.user(req, res);
  });
  router.post("/user/newUser", (req, res) => {
    return post.newUser(req, res);
  });
  router.post("/user/login", (req, res) => {
    return post.loginUser(req, res);
  });
  router.get('/user/logout', (req, res, next) => {
    return post.logoutUser(req, res, next);
  });
  router.get("/user/profile", (req, res) => {
    return get.user(req, res);
  });

  /*VALIDATION*/
  router.post("/validation/user", (req, res) => validate.user(req, res));
  router.post("/validation/organisation", (req, res) => validate.organisation(req, res));

}

