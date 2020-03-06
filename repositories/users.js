const fs = require("fs");

class userRepository {
	// constructor方程用于检查是否提供存储数据的file
	// constructor不允许被async
	constructor(filename) {
		if (!filename) {
			throw new Error("Creating a new repository needs a file");
		}
		this.filename = filename;

		try {
			// 使用sync version会使得我们的程序进行等待直到access完成再执行下面的code
			// 由于我们整个app只会有一个class实例所以同步version只会运行一次
			// 不会对运行速度造成大的影响
			fs.accessSync(this.filename);
		} catch (error) {
			// If the file does not exist, will create it
			fs.writeFileSync(this.filename, "[]");
		}
	}

	async getAll() {
		// Open the file called this.filename
		const content = await fs.promises.readFile(this.filename, {
			encoding: "utf-8"
		});
		// Parse the contents from a JSON string to an array of javascript objects
		const data = JSON.parse(content);
		// Return the parsed data
		return data;
	}

	async create(attrs) {
		// get most recent data in the file
		const records = await this.getAll();
		// push new record to array
		records.push(attrs);
		// Write the updated records back to 'filename'
		await this.writeAll(records);
	}

	// Write all users to a user.json file
	async writeAll(records) {
		await fs.promises.writeFile(
			this.filename,
			JSON.stringify(records, null, 2)
		);
	}
}

// create users.json to store all info
const test = async () => {
	const userRepo = new userRepository("users.json");
	await userRepo.create({ name: "zhu", password: "1234567" });
	const data = await userRepo.getAll();
	console.log(data);
};

test();
