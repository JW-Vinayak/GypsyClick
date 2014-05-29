
var Model = require('./../model');
var User = Model.user;
var Example = Model.example;


module.exports = function(req,res){
	User.findAll({where : {username : 'vinayak.mote'}}).success(function(rows){
		
		var ex = Example.build({
			
			field1 : 'temp 1',
			field2 : 'temp 2'
		})
		
		ex.save().success(function(some){
			res.send(some);
		}).error(function(err){
			res.send(err);
		});
		
		res.send(rows);
	}).error(function(error){
		res.send(error);
	});
	
	
	
}