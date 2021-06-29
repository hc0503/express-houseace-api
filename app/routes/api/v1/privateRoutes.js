module.exports = {
	'GET /users/name': 'UserController.getFullName',

	// Profile:
	'GET /profiles/me': 'ProfileController.getMe',
	'POST /profiles/me/update-photo': 'ProfileController.updatePhoto',
	'POST /profiles/me/update-data': 'ProfileController.updateData',
	'POST /profiles/me/update-password': 'ProfileController.updatePassword',
	'POST /profiles/me/update-type': 'ProfileController.updateType',

	// Company:
	'POST /companies/me/update-logo': 'CompanyController.updateLogo',
	'POST /companies/me/update-hero': 'CompanyController.updateHero',
	'POST /companies/me/update-data': 'CompanyController.updateData',
	'POST /companies/me/update-services': 'CompanyController.updateServices',
	'POST /companies/me/image': 'CompanyController.addImage',
	'POST /companies/me/image/:id': 'CompanyController.deleteImage',
};
