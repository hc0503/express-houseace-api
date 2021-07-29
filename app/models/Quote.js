// ORM:
const { DataTypes } = require('sequelize');
const database = require('#services/db.service');

const Quote = database.define(
	'Quote',
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

Quote.findById = function (id) {
	return this.findByPk(id, {
		include: {
		}
	});
}

Quote.associate = (models) => {
	models.Quote.belongsTo(models.User, {
		foreignKey: "userId",
		as: "user",
		constraints: false
	});
}

Quote.prototype.toJSON = function () {
	const values = { ...this.get() };
	return values;
}

module.exports = Quote;
