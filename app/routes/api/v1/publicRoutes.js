module.exports = {
	'GET /status': 'APIController.getStatus',

	// User:
	'POST /auth/register': 'UserController.register',
	'POST /auth/login': 'UserController.login',
	'POST /auth/validate': 'UserController.validate',
	'POST /auth/refresh': 'UserController.refresh',
	'POST /auth/logout': 'UserController.logout',

	// Role:
	'GET /roles': 'RoleController.getRoles',

	// Profile:
	'POST /profiles/update-photo': 'ProfileController.updatePhoto',
};
