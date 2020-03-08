const layout = require("../layout");
const {getError} = require("../../helper")

module.exports = ({error})=>{
    return layout({content: `
        <form method="POST">
            <input placeholder="title" name="title">
            <input placeholder="price" name="price">
            <input type="file" name="image">
            <button>Submit</button>
        </form>
    `})
}