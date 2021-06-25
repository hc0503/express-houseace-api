// ORM:
const { DataTypes } = require('sequelize');
const database = require('#services/db.service');

const Company = database.define(
	'Company',
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
		logoImage: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		heroImage: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		businessName: {
			type: DataTypes.STRING(191),
			allowNull: true
		},
		phoneNumber: {
			type: DataTypes.STRING(191),
			allowNull: true
		},
		address: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		licenseNumber: {
			type: DataTypes.STRING(191),
			allowNull: true
		},
		yearFounded: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		abnNumber: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	},
	{
		// Enable automatic 'createdAt' and 'updatedAt' fields.
		timestamps: true,
		// Only allow 'soft delete'
		// (set of 'deletedAt' field, insted of the real deletion).
		paranoid: false
	}
);

Company.findById = function (id) {
	return this.findByPk(id);
}

// Static methods:
// Static methods:
Company.associate = (models) => {
	models.Company.belongsTo(models.User, {
		foreignKey: "userId",
		as: "user",
		constraints: false
	});
}
// Static methods\

// Instance methods:
Company.prototype.toJSON = function () {
	const values = { ...this.get() };
	values.logoImage = process.env.BASE_URL + '/' + values.logoImage;
	return values;
}
// Instance methods\

module.exports = Company;
