// ORM:
const { DataTypes } = require('sequelize');
const database = require('#services/db.service');

const Project = database.define(
	'Project',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		userId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			required: true,
			allowNull: false
		},
	},
	{
		timestamps: true,
	}
);

Project.findById = function (id) {
	return this.findByPk(id, {
		include: {
		}
	});
}

Project.associate = (models) => {
	models.Project.belongsTo(models.User, {
		foreignKey: "userId",
		as: "user",
		constraints: false
	});
}

Project.prototype.toJSON = function () {
	const values = { ...this.get() };
	return values;
}

module.exports = Project;
