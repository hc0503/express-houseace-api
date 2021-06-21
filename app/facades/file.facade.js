const fs = require("fs");
const randomstring = require("randomstring");

const _fileStore = async (file, oldFilePath, newFileFolder = "upload") => {
	try {
		const regex = /[^.]*/;
		const data = fs.readFileSync(file.path);
		const fileName = file.name.replace(regex, randomstring.generate());
		const filePath = newFileFolder;
		if (!fs.existsSync(`./public/${filePath}`)) {
			fs.mkdirSync(`./public/${filePath}`, {
				recursive: true,
			});
		}
		fs.writeFileSync(`./public/${filePath}/${fileName}`, data);
		fs.unlinkSync(file.path);
		if (fs.statSync(`./public/${oldFilePath}`).isFile())
			fs.unlinkSync(`./public/${oldFilePath}`);

		return Promise.resolve(`${filePath}/${fileName}`);
	} catch (error) {
		return Promise.reject(error);
	}
};

module.exports = {
	fileStore: _fileStore
};
