const { DataTypes } = require('sequelize');
const database = require('#services/db.service');

const Role = database.define(
	'Role',
	{
		name: {
			type: DataTypes.STRING(255),
			allowNull: true,
			unique: true
		},
	},
	{
		// Enable automatic 'createdAt' and 'updatedAt' fields.
		timestamps: true,
	}
);

// Static methods:
Role.associate = (models) => {
	models.Role.hasMany(models.User, {
		foreignKey: "userId",
		as: "users"
	});
}
// Static methods\

module.exports = Role;
