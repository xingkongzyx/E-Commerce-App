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
		// Read its contents
		console.log(content);
		// Parse the contents
		// Return the parsed data
	}
}

// create users.json to store all info
const test = async () => {
	const userRepo = new userRepository("users.json");
	await userRepo.getAll();
};

test();
