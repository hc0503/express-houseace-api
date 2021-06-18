const Role = require('#models/Role');

module.exports = {
	run: _run
}

async function _run() {
	try {
		const exampleRoleData = [
			{ name: "Client (Homeowner)" },
			{ name: "Ace (Contractor)" },
			{ name: "Ace (Planner)" },
			{ name: "Ace (Supplier)" },
		]

		await Role.destroy({ truncate: true, cascade: false });
		const roles = await Role.bulkCreate(exampleRoleData);
	}
	catch (error) {
		return Promise.reject(error);
	}
}
