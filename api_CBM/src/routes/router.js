const { Router } = require('express');
const controller = require('../controller/occurrenceController');
const userController = require('../controller/userController');

const router = Router();

router.post("/ocorrencias", controller.createOccurrence);
router.get("/ocorrencia", controller.listAllOccurrences);
router.get("/ocorrencia/:id", controller.getOccurrenceById);
router.put("/ocorrencia/:id", controller.updateOccurrence);
router.delete("/ocorrencia/:id", controller.deleteOccurrence);

router.post('/login', userController.authenticateUser);
router.post('/signup', userController.createUser);
router.get('/users', userController.listAllUsers);

module.exports = router;