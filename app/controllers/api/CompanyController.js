const Company = require('#models/Company');
const User = require('#models/User');
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
					const logoPath = await fileFacade.fileStore(files.file, user.company.logoImage ?? "", "upload/account/company");
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
					})
				} catch (error) {
					console.log(error); 
				}
			});
		} catch (error) {
			console.log(error); 
		}
	}
	const _updateHero = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const user = await User.findById(userId);
			const form = new formidable.IncomingForm();
			form.parse(req, async function (err, fields, files) {
				try {
					const heroPath = await fileFacade.fileStore(files.file, user.company.heroImage ?? "", "upload/account/company");
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
					console.log(error);
				}
			})
		} catch (error) {
			console.log(error);
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
					error: {
						errors: validation.errors.errors
					},
					status: 412
				});
			}
			await Company.update({businessName: business_name, phoneNumber: phone_number, address: address, licenseNumber: license_number, yearFounded: year_founded, abnNumber: abn_number}, {
				where: {
					id: user.company.id
				}
			})
			console.log('No');
			const data = await User.findById(userId);
			return createOKResponse({
				res,
				data: {
					me: data.toJSON()
				}
			})
		} catch {

		}
	}
	// Protected\

	return {
		updateLogo: _updateLogo,
		updateHero: _updateHero,
		updateData: _updateData,
	}
}