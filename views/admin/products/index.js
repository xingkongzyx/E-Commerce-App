const layout = require("../layout");

// params: products is an array with all the products we have
// 这里使用了destructure, 我们调用方程时传入的是{products:products},这里直接destructure
module.exports = ({ products }) => {
	const renderedProductsHtmlStr = products
		// Use map to return each product html string and form an array
		.map(product => {
			return `<div>${product.title}</div>`;
		})
		// Join all eles of an array to a big string which includes huge html code
		.join('');

	return layout({
		content: `
        <h1 class="title">Products</h1>
        ${renderedProductsHtmlStr}   
    `
	})
};

