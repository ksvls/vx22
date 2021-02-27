import { Context, Next } from "koa";
import { rv1 } from "../router";

const route:rv1 = {
    method: 'GET',
    exec: async(ctx:Context, next:Next) => {
        ctx.redirect('https://youtu.be/dQw4w9WgXcQ') 
    }
} 

module.exports = route