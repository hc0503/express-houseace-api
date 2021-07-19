const Role = require('#models/Role');

// Reponse protocols.
const {
	createOKResponse,
	createErrorResponse
} = require('#factories/responses/api');
// Custom error.
const { Err } = require('#factories/errors');


module.exports = RoleController;

function RoleController() {
	const _getRoles = async (_, res) => {
		try {
			const roles = await Role.findAll();
			return createOKResponse({
				res,
				data: {
					roles
				}
			});
		}
		catch (error) {
			console.error("RolesController.getRoles error: ", error);
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}

	return {
		getRoles: _getRoles,
	}
}