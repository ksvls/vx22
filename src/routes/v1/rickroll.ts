import { Context, Next } from "koa";
import { rv1 } from "../router";

const route:rv1 = {
    method: 'GET',
    exec: async(ctx:Context, next:Next) => {
        ctx.redirect('https://rr.noordstar.me/bruhfuckingwhatlmaogetdoomed-1536ab99') 
    }
} 

module.exports = route