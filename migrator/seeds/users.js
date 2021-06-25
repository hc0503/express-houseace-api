const User = require('#models/User');
const Role = require('#models/Role');
const Company = require('#models/Company');

module.exports = {
	run: _run
}

async function _run() {
	try {
		const role = await Role.findByName('Client (Homeowner)');

		const user = await User.create({
			roleId: role.id,
			name: "Super Admin",
			email: "admin@admin.com",
			password: "password",
			company: {
				logoImage: ""
			}
		}, {
			include: {
				model: Company,
				as: 'company'
			}
		});
	}
	catch (error) {
		return Promise.reject(error);
	}
}
