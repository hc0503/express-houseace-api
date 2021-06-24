const User = require('#models/User');
const Role = require('#models/Role');

module.exports = {
	run: _run
}

async function _run() {
	try {
		const role = await Role.findByName('Client (Homeowner)');
		const seedData = {
			roleId: role.id,
			name: "Super Admin",
			email: "admin@admin.com",
			password: "password"
		}

		const user = await User.create(seedData);
	}
	catch (error) {
		return Promise.reject(error);
	}
}
