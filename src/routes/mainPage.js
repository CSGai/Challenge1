const { routerSetup } = require('../utils/setup.js');

setup = routerSetup();

controller = setup['controller'];
router = setup['router'];

router.get('/', controller.getMainPage);

module.exports = router;