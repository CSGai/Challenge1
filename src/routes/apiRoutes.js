const { routerSetup } = require('../utils/setup.js');

setup = routerSetup();

controller = setup['controller'];
router = setup['router'];

//POST methods
router.post('/createNewUser', controller.createNewUser);
router.post('/UserInfo', controller.getUserInfo);
//DELETE methods
router.delete('/removeUser', controller.removeUser);
//GET methods
router.get('/userList', controller.getUserList);

module.exports = router;