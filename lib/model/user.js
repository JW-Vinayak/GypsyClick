
module.exports = function(sequelize, DataTypes) {
	return sequelize.define("user", {
		username : DataTypes.STRING,
		pwd : DataTypes.STRING,
		firstname : DataTypes.STRING,
		lastname : DataTypes.STRING,
		dob : DataTypes.DATE,
		email : { type : DataTypes.STRING, unique : true } ,
		fbid : DataTypes.STRING,
		glid : DataTypes.STRING,
		fbaccesstoken : DataTypes.STRING,
		apikey : { type : DataTypes.STRING, unique : true }			
  })
	}