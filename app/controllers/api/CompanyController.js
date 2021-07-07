const Company = require('#models/Company');
const User = require('#models/User');
const CompanyImage = require('#models/CompanyImage');
const fileFacade = require('#facades/file.facade');
const formidable = require("formidable");
const validator = require('validatorjs');

// Reponse protocols.
const {
	createOKResponse,
	createErrorResponse
} = require('#factories/responses/api');


module.exports = CompanyController;

function CompanyController() {
	// Protected:
	const _updateLogo = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const user = await User.findById(userId);
			const form = new formidable.IncomingForm();
			form.parse(req, async function (err, fields, files) {
				try {
					const logoPath = await fileFacade.fileStore(files.file, "upload/account/company");
					await fileFacade.fileDelete(user.company.logoImage ?? "FileNotExist");
					await Company.update({
						logoImage: logoPath
					}, {
						where: {
							id: user.company.id
						}
					});
					const data = await User.findById(userId);
					return createOKResponse({
						res,
						data: {
							me: data.toJSON()
						}
					});
				} catch (error) {
					return createErrorResponse({
						res,
						msg: error.message
					});
				}
			});
		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	const _updateHero = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const user = await User.findById(userId);
			const form = new formidable.IncomingForm();
			form.parse(req, async function (err, fields, files) {
				try {
					const heroPath = await fileFacade.fileStore(files.file, "upload/account/company");
					await fileFacade.fileDelete(user.company.heroImage ?? "FileNotExist");
					await Company.update({
						heroImage: heroPath
					}, {
						where: {
							id: user.company.id
						}
					});
					const data = await User.findById(userId);
					return createOKResponse({
						res,
						data: {
							me: data.toJSON()
						}
					})
				} catch (error) {
					return createErrorResponse({
						res,
						msg: error.message
					});
				}
			})
		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	const _updateData = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const user = await User.findById(userId);
			const {business_name, phone_number, address, license_number, year_founded, abn_number} = req.body;
			const rules = {
				business_name: ['required'],
				phone_number: ['required'],
				address: ['required'],
				license_number: ['required'],
				year_founded: ['required'],
				abn_number: ['required'],
			}
			const validation = new validator(req.body, rules);
			if (validation.fails()) {
				return createErrorResponse({
					res,
					errors: validation.errors.errors,
					status: 412
				});
			}
			await Company.update({businessName: business_name, phoneNumber: phone_number, address: address, licenseNumber: license_number, yearFounded: year_founded, abnNumber: abn_number}, {
				where: {
					id: user.company.id
				}
			})
			const data = await User.findById(userId);
			return createOKResponse({
				res,
				data: {
					me: data.toJSON()
				}
			})
		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	const _updateServices = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const user = await User.findById(userId);
			const {services} = req.body;
			await Company.update({services: services}, {
				where: {
					id: user.company.id
				}
			})
			const data = await User.findById(userId);
			return createOKResponse({
				res,
				data: {
					me: data.toJSON()
				}
			})

		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	const _addImage = async (req, res) => {
		try {
			const userId = req.token?.id;
			const user = await User.findById(userId);
			const form =  new formidable.IncomingForm();
			form.parse(req, async function (err, fields, files) {
				try {
					const imagePath = await fileFacade.fileStore(files.file, "upload/account/company/images");
					await CompanyImage.create({
						companyId: user.company.id,
						image: imagePath
					});
					const data = await User.findById(userId);
					return createOKResponse({
						res,
						data: {
							me: data.toJSON()
						}
					});
				} catch (error) {
					return createErrorResponse({
						res,
						msg: error.message
					});
				}
			})
		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	const _deleteImage = async (req, res) => {
		try {
			const id = req.params?.id;
			const userId = req.token?.id;
			const companyImage = await CompanyImage.findById(id);
			await fileFacade.fileDelete(companyImage.image);
			await CompanyImage.destroy({
				where: {
					id: id
				}
			})
			const user = await User.findById(userId);
			return createOKResponse({
				res,
				data: {
					me: user.toJSON()
				}
			})
		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	// Protected\

	return {
		updateLogo: _updateLogo,
		updateHero: _updateHero,
		updateData: _updateData,
		updateServices: _updateServices,
		addImage: _addImage,
		deleteImage: _deleteImage,
	}
}