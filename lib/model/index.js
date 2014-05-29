var Sequelize = require('sequelize');


// initialize database connection
var sequelize = new Sequelize('app', 'adminNHDvZWr', 'nSD9at8eWTAS', {
	  host: process.env.OPENSHIFT_MYSQL_DB_HOST || "127.0.0.1",
	  port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306
	})

// load models
var models = [
  'user',
  'example'
];



		try {
			
			
			
				models.forEach(function(model) {
					console.log(model);
				  module.exports[model] = sequelize.import(__dirname + '/' + model);
				});
				
				// describe relationships
				(function(m) {
				  /*m.PhoneNumber.belongsTo(m.User);
				  m.Task.belongsTo(m.User);
				  m.User.hasMany(m.Task);
				  m.User.hasMany(m.PhoneNumber);*/
				})(module.exports);
				
				sequelize.sync().success(function(){
					console.log('sync success');
					console.log('\t- Database Models are initialized');
					//callback();
				}).error(function(error){
					console.log(JSON.stringify(error));
					//callback(error);
				})
				
		}
		catch(e){
			console.log(e);
			console.error('Could not open Database Models.');
			//callback(e);
			
		}
		
		



// export connection
module.exports.sequelize = sequelize;
