// 专门用于administration的layout file
// content中包含body里面的html代码
module.exports = ({content})=>{
    return `
    <!DOCTYPE html>
        <head>
        </head>
        <body>
            ${content}
        </body>
    </html>
    `
}