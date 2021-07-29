const Quote = require('#models/Quote');
const User = require('#models/User');
const formidable = require("formidable");
const validator = require('validatorjs');

// Reponse protocols.
const {
	createOKResponse,
	createErrorResponse
} = require('#factories/responses/api');


module.exports = QuoteController;

function QuoteController() {
	// Protected:
	const _getList = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const quote = await Quote.findById(userId);
			const form = new formidable.IncomingForm();
			
			return createOKResponse({
				res,
				data: {
					quote: quote.toJSON()
				}
			});
		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	const _postCreate = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const user = await User.findById(userId);
			const form = new formidable.IncomingForm();
			const rules = {
				data: ['required'],
			}
			const validation = new validator(req.body, rules);
			await Quote.create(data, {
				where: {
					id: user.quote.id
				}
			})
			if (validation.fails()) {
				return createErrorResponse({
					res,
					errors: validation.errors.errors,
					status: 412
				});
			}
			return createOKResponse({
				res,
				data: {
					quote: data.toJSON()
				}
			})
		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	const _postUpdate = async (req, res) => {
		try {
			const userId = req?.token?.id;
			const user = await User.findById(userId);
			const form = new formidable.IncomingForm();
			const rules = {
				data: ['required'],
			}
			const validation = new validator(req.body, rules);
			await Quote.update(data, {
				where: {
					id: req?.id
				}
			})
			if (validation.fails()) {
				return createErrorResponse({
					res,
					errors: validation.errors.errors,
					status: 412
				});
			}
			return createOKResponse({
				res,
				data: {
					quote: data.toJSON()
				}
			})
		} catch (error) {
			return createErrorResponse({
				res,
				msg: error.message
			});
		}
	}
	const _postCalculate = async (req, res) => {

	}
	const _postDelete = async (req, res) => {

	}
	// Protected\

	return {
		getList: _getList,
		postCreate: _postCreate,
		postUpdate: _postUpdate,
		postCalculate: _postCalculate,
		postDelete: _postDelete,
	}
}