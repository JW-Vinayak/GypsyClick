var Sequelize = require("sequelize")

module.exports = function(req, res) {
	
	var sequelize = new Sequelize('app', 'adminNHDvZWr', 'nSD9at8eWTAS', {
		  host: process.env.OPENSHIFT_MYSQL_DB_HOST || "127.0.0.1",
		  port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306
		})
	
	
	var Users = sequelize.define('user', {
		username : Sequelize.STRING,
		pwd : Sequelize.STRING,
		firstname : Sequelize.STRING,
		lastname : Sequelize.STRING,
		dummy : Sequelize.STRING
	});
	
	var user = Users.build({
		username : 'vinayak.mote',
		pwd : '672346',
		firstname : 'Vinayak',
		lastname : 'Mote'
	})
	
	user.save().success(function(){console.log('saved')}).error(function(err){console.log(err)});
	
	
	var TestTable = sequelize.define('Test', {
		field1 : Sequelize.STRING,
		field2 : Sequelize.STRING
	});
	
	
	sequelize.sync().success(function(){
		console.log('sync success');
	}).error(function(error){
		console.log(JSON.stringify(error));
	})
	
	// Quick example
	sequelize.query("SELECT * FROM users").success(function(myTableRows) {
		console.log(JSON.stringify(myTableRows));
	}).error(function(err){
		res.send(err);
	});
	
	//res.send('did it work?');
	
}