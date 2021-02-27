import Application from "koa"
import https from 'https'
import http from 'http'
import router from './routes/router'
const Koa = require('koa')
const app:Application = new Koa()

app.use(async(ctx, next)=>{
    await next()
    if (ctx.status === 404){
        ctx.status = 404
        ctx.body = {msg: "404 Sorry..."}
    }
})

// logger
app.use(async (ctx, next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time');
    console.log(`[${ctx.method}] ${ctx.url} - ${rt}`);
});
  
// x-response-time
  
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// main router
app.use(router.routes())

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production' ){
    https.createServer(app.callback()).listen(process.env.PORT||3000);
}else{
    http.createServer(app.callback()).listen(process.env.PORT||3000);
}


