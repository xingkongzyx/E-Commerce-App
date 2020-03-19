const layout = require("../layout");

module.exports = ({ product }) => {
	return layout({
		content: `
            <form method="POST">
                <input name="title" value="${product.title}"/>
                <input name="price" value="${product.price}"/>
                <input type="file" name="image" />
                <button>Submit</button>  
                </form>
                <img src="data:image/png;base64, ${product.image}" />
        `
	});
};
