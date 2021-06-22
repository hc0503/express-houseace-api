const User = require('#models/User');
const fileFacade = require('#facades/file.facade');
const formidable = require("formidable");

// Reponse protocols.
const {
	createOKResponse,
	createErrorResponse
} = require('#factories/responses/api');
// Custom error.
const { Err } = require('#factories/errors');


module.exports = ProfileController;

function ProfileController() {

	const _processError = (error, req, res) => {
		// Default error message.
		let errorMessage = error?.message ?? 'Internal server error';
		// Default HTTP status code.
		let statusCode = 500;

		switch (error.name) {
			case ('Unauthorized'):
				errorMessage = 'Email or password are incorrect.';
				statusCode = 406;
				break;
			case ('ValidationError'):
				errorMessage = "Invalid email OR password input";
				statusCode = 402;
				break;
			case ('InvalidToken'):
				errorMessage = 'Invalid token or token expired';
				statusCode = 401;
				break;
			case ('UserNotFound'):
				errorMessage = "Such user doesn't exist";
				statusCode = 400;
				break;

			// Perform your custom processing here...

			default:
				break;
		}

		// Send error response with provided status code.
		return createErrorResponse({
			res,
			error: {
				message: errorMessage
			},
			status: statusCode
		});
	}

	// Protected:
	const _updatePhoto = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const user = await User.findById(userId);
			const form = new formidable.IncomingForm();
			form.parse(req, async function (err, fields, files) {
				try {
					const imagePath = await fileFacade.fileStore(files.file, user.photo ?? "", "upload/account/profile");
					await User.update({ photo: imagePath }, { where: { id: userId } });
					const data = await User.findById(userId);
					return createOKResponse({
						res,
						data: {
							user: data.toJSON()
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

	return {
		updatePhoto: _updatePhoto,
	}
}