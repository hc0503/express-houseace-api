module.exports = {
	'GET /users/name': 'UserController.getFullName',

	// Profile:
	'POST /profiles/me/update-photo': 'ProfileController.updatePhoto',
	'GET /profiles/me': 'ProfileController.getMe',
	'POST /profiles/me/update': 'ProfileController.updateData',
	'POST /profiles/me/update-password': 'ProfileController.updatePassword',
	'POST /profiles/me/update-type': 'ProfileController.updateType',

	// Company:
	'POST /companies/me/update-logo': 'CompanyController.updateLogo'
};
