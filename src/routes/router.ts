import ktr from '@koa/router'
import {readdirSync} from 'fs'
import { Context, Next } from "koa";
import path from 'path'
const router = new ktr()

export type rv1 = {
    method: 'GET' | 'POST'
    exec: {
        (ctx: Context, next:Next): Promise<void>
    } 
}

// v1

router.get('/', async(ctx)=>{
    ctx.body = {
        msg: "Hello from vx22!"
    }
})

const pv1 = path.join(__dirname, 'v1')
const v1 = readdirSync(pv1)
v1.forEach(r=>{
    const loaded:rv1 = require(path.join(pv1, r))
    switch(loaded.method){
        case 'GET':
            router.get(`/v1/${r.split('.')[0]}`, async(ctx, next)=>loaded.exec(ctx, next))    
            break
        case 'POST':
            router.get(`/v1/${r.split('.')[0]}`, async(ctx, next)=>loaded.exec(ctx, next))
            break
    }
})

export default router