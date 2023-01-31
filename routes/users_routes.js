const express =require("express");
let UsersController=require('../controllers/users')
let router=express.Router();
router.route('/users').get(UsersController.index).post(UsersController.create);
router.get('/users/new',UsersController.new);
router.route('/users/:id')
    .get(UsersController.show)
module.exports=router;