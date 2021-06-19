const User = require('#models/User');
const fileFacade = require('#facades/file.facade');

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
			await fileFacade(req, res);
			if (req.file == undefined) {
				return createErrorResponse({
					res,
					error: {
						message: "Please upload a file!"
					},
					status: 400
				});
			}
			// const user = await Role.findAll();

			return createOKResponse({
				res,
				data: {

				}
			});
		}
		catch (error) {
			console.error("ProfileController.updatePhoto error: ", error);
			return _processError(error, req, res);
		}
	}

	const fileStore = async (file, oldFilePath) => {
		const regex = /[^.]*/;
		const data = fs.readFileSync(file.path);
		const fileName = file.name.replace(regex, randomstring.generate());
		const imagePath = `/public/upload/account/profile/${fileName}`;
		if (!fs.existsSync(`./public/upload/account/profile`)) {
			fs.mkdirSync(`./public/upload/account/profile`, {
				recursive: true,
			});
		}
		fs.writeFileSync(`./public${imagePath}`, data);
		await fs.unlinkSync(file.path);
		if (fs.existsSync(`./public${oldFilePath}`))
			await fs.unlinkSync(`./public${oldFilePath}`);

		return imagePath;
	};

	return {
		updatePhoto: _updatePhoto,
	}
}