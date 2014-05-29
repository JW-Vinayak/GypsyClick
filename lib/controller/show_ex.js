
var Model = require('./../model');
var Example = Model.example;


module.exports = function(req,res){
	Example.findAll({where : {field1 : 'temp 1'}}).success(function(rows){
		

		res.send(rows);
	}).error(function(error){
		res.send(error);
	});
	
	
	
}