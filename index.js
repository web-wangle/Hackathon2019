const Koa = require('koa')
const app = new Koa()
const fs = require('fs');

const filePath = './mochawesome-report/mochawesome.html'
console.log(`正在监听 ${filePath}`);
fs.watchFile(filePath, (cur, prv) => {
    if (filePath) {
        // 打印出修改时间
        console.log(`cur.mtime>>${cur.mtime.toLocaleString()}`)
        console.log(`prv.mtime>>${prv.mtime.toLocaleString()}`)
        // 根据修改时间判断做下区分，以分辨是否更改
        if (cur.mtime != prv.mtime){
            console.log(`${filePath}文件发生更新`)
            
        }
    }
})
app.use( async(ctx) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./index.html')
})
app.listen(2019)