const Project = require('#models/Project');
const validator = require('validatorjs');

// Reponse protocols.
const {
	createOKResponse,
	createErrorResponse
} = require('#factories/responses/api');
// Custom error.
const { Err } = require('#factories/errors');


module.exports = ProjectController;

function ProjectController() {
	// Protected:
	const _getList = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const project = await Project.findById(userId);
			const form = new formidable.IncomingForm();
			return createOKResponse({
				res,
				data: {
					'list': project
				}
			})
		} catch (error) {
			return _processError(error, req, res)
		}
	}
	// Protected\

	return {
		getList: _getList,
	}
}