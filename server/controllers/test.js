module.exports = {
    name: "Client",
  
    list: function(req, res, next) {
        // console.log('Inside controller..')
        res.status(200).send("Welcome to our restful API::test::list()");
    //   clientFactory.getAll(req.query).then(function(clients) {
    //     res.json(clients);
    //   })
    },
}
  