
var Model = require('./../model');
var User = Model.user;
var Example = Model.example;
var Moment = require('moment');


module.exports = function(req,res){
	

	
	User.findAll({where : {email :req.param('email') }}).success(function(rows){
		if(rows.length == 0){
			var key = Math.random().toString();
			key = key.toString().replace(".","");
			
			var u = User.build({		
				firstname : req.param('fn'),
				lastname : req.param('ln'),
				dob : Moment(req.param('dob')).toDate(),
				email : req.param('email'),
				fbid : req.param('fbid'),
				glid : req.param('glid'),
				fbaccesstoken : req.param('fbtoken'),
				apikey : key
			})
			
			u.save().success(function(some){
				res.send(JSON.stringify({status : 1, newuser : true, apikey : key}));
			}).error(function(err){
				res.send(JSON.stringify({status : 2, error : "something went wrong"}));
			});
		}
		else {
			res.send(JSON.stringify({status : 1, newuser : false, apikey : rows[0].apikey}));
		}
			
	}).error(function(err){
		res.send(JSON.stringify({status : 2, error : "something went wrong"}));
	});
	
	
	
	
	
}