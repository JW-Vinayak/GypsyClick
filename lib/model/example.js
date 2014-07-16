
module.exports = function(sequelize, DataTypes) {
	  return sequelize.define("example", {
		  field1 : DataTypes.STRING,
		  field2 : DataTypes.STRING
	  })
	}
	


