const User = require('#models/User');
const fileFacade = require('#facades/file.facade');
const formidable = require("formidable");
const validator = require('validatorjs');
const bcrypt = require('#services/bcrypt.service');

// Reponse protocols.
const {
	createOKResponse,
	createErrorResponse
} = require('#factories/responses/api');
// Custom error.
const { Err } = require('#factories/errors');


module.exports = ProfileController;

function ProfileController() {
	// Protected:
	const _updatePhoto = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const user = await User.findById(userId);
			const form = new formidable.IncomingForm();
			form.parse(req, async function (err, fields, files) {
				try {
					const imagePath = await fileFacade.fileStore(files.file, "upload/account/profile");
					await fileFacade.fileDelete(user.photo ?? "FileNotExist");
					await User.update({ photo: imagePath }, { where: { id: userId } });
					const data = await User.findById(userId);
					return createOKResponse({
						res,
						data: {
							me: data.toJSON()
						}
					})
				} catch (error) {
					return _processError(error, req, res)
				}
			});
		} catch (error) {
			return _processError(error, req, res)
		}
	}
	const _getMe = async (req, res) => {
		try {
			const userId = req?.token?.id;
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
	const _updateData = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const {name, phone, address} = req.body;
			await User.update({ name: name, phone: phone, address: address }, { where: { id: userId } });
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
	const _updatePassword = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const {current_password, password} = req.body;
			const rules = {
				current_password: ['required'],
				password: ['required', 'min:8', 'confirmed'],
				password_confirmation: ['required']
			}
			const validation = new validator(req.body, rules);
			if (validation.fails()) {
				return createErrorResponse({
					res,
					errors: validation.errors.errors,
					status: 412
				});
			}
			const user = await User.findById(userId);
			if (!bcrypt.comparePasswords(current_password, user.password)) {
				return createErrorResponse({
					res,
					errors: {
						current_password: [
							"The current password is incorrect."
						]
					},
					status: 412
				});
			}
			await User.update({ password: password }, { where: { id: userId } });
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
	const _updateType = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const {role} = req.body;
			await User.update({ roleId: role }, { where: { id: userId } });
			const user = await User.findById(userId);
			return createOKResponse({
				res,
				data: {
					me: user.toJSON()
				}
			});
		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	// Protected\

	return {
		updatePhoto: _updatePhoto,
		getMe: _getMe,
		updateData: _updateData,
		updatePassword: _updatePassword,
		updateType: _updateType,
	}
}