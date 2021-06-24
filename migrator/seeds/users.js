const User = require('#models/User');

module.exports = {
	run: _run
}

async function _run() {
	try {
		const seedData = {
			roleId: 1,
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
