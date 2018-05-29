//# routes/employee_routes.js

module.exports = function( ) {
    var express = require( "express" )
      , router = express.Router()
      , controller = require( '../controllers/player_ctrl' );

    router.route( '/' )
        .get( controller.list );
        //.post( controller.create );
        
        
    // router.route( '/getGroups' )
    //     .get( controller.getAllGroups );
  
    // router.route( '/:id/projects' )
    //         .get( controller.getProjects );

    router.route( '/:id' )
        .get( controller.get )
    //     .put( controller.update )
    //     .delete( controller.delete );

    return router;
};
