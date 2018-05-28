
//# routes/project_routes.js

module.exports = function () {
    var express = require("express")
        , router = express.Router()
        , controller = require('../controllers/project');

    router.route('/')
        .get(controller.list)
        .post(controller.create);

    router.route('/activesummary')
        .get(controller.listActiveSummary);

    router.route('/activesummaryexpense')
        .get(controller.listActiveSummaryExpense);

    router.route('/getAllForTypeAhead')
        .get(controller.listForTypeAhead);
        
    router.route('/getTimeBankProjectInfo')
        .get(controller.getTimeBankProjectInfo);
        
    router.route('/getSickDaysProjectInfo')
        .get(controller.getSickDaysProjectInfo);

    router.route('/:id')
        .get(controller.get)
        .put(controller.update)
        .delete(controller.delete);

    router.route('/:id/tasks')
        .get(controller.getTasks);
    router.route('/:id/tasks/:task_id')
        .delete(controller.deleteTask);
    router.route('/:id/time')
        .get(controller.getTimeSheets);
    router.route('/:id/expense')
        .get(controller.getExpenses);
    router.route('/:id/charact')
        .get(controller.getCharacteristics);
    router.route('/getCloseableProjects')
        .get(controller.getCloseableProjects);
    router.route('/:id/getProjectsByManagerId')
        .get(controller.getProjectsByManagerId);
    router.route('/:project_number/getOneByProjectNumber')
        .get(controller.getOneByProjectNumber);

    router.route('/:id/completion')
        .get(controller.getCompletion);
    return router;

};