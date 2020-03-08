const layout = require("../layout");
const { getError } = require("../../helper");

module.exports = ({ error }) => {
	return layout({
		content: `
        <form method="POST" enctype="multipart/form-data">
            <input placeholder="title" name="title">
            <input placeholder="price" name="price">
            <input type="file" name="image">
            <button>Submit</button>
        </form>
    `
	});
};
