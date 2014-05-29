
module.exports = function(sequelize, DataTypes) {
	  return sequelize.define("user", {
			username : DataTypes.STRING,
			pwd : DataTypes.STRING,
			firstname : DataTypes.STRING,
			lastname : DataTypes.STRING,
			dummy : DataTypes.STRING
	  })
	}