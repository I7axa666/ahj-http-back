// import Tickets from './ticketClass.js';

const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');

const port = 7070;

const app = new Koa();

// const subscriptions = [{name: 'dusty', phone: '79056001616'}];
// const tickets = new Tickets();

app.use(koaBody({
  urlencoded: true,
}));

app.use((ctx, next) => {
  if (ctx.request.method !== 'OPTIONS') {
    next();
    return;
  }

  ctx.response.set('Access-Control-Allow-Origin', '*');

  ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUSH, PUT, PATCH, GET, POST');

  ctx.response.status = 204;
});

// app.use((ctx, next) => {
//     if (ctx.request.method !== 'DELETE') {
//         next();
//         return;
//     }

//     ctx.response.set('Access-Control-Allow-Origin', '*');

//     const { phone } = ctx.request.query;
//     console.log(ctx.request.query.phone);

//     if (tickets.ticketsList.every(sub => sub.phone !== phone)) {
//         ctx.response.status = 400;

//         ctx.response.body = 'subscription doesn\'t exist';

//         return
//     }

//     tickets.find().filter(sub => sub.phone !== phone);

//     ctx.response.body = 'OK';

//     next();
// });

// app.use((ctx, next) => {
//     if (ctx.request.method !== 'POST') {
//         next();
//         return;
//     }

//     ctx.response.set('Access-Control-Allow-Origin', '*');

//     const { name, phone } = ctx.request.body;

//     if (tickets.find().some(sub => sub.phone === phone)) {
//         ctx.response.status = 400;

//         ctx.response.body = 'subscription exist';
//         return;
//     }

//     tickets.find().push({ name, phone });

//     ctx.response.body = 'OK';

//     next();
// });

// app.use((ctx, next) => {
//     if (ctx.request.method !== 'GET') {
//         next();
//         return;
//     }

//     ctx.response.set('Access-Control-Allow-Origin', '*');

//     const { name, phone } = ctx.request.body;

//     if (tickets.find().some(sub => sub.phone === phone)) {
//         ctx.response.status = 400;

//         ctx.response.body = 'subscription exist';
//         return;
//     }

//     tickets.find().push({ name, phone });

//     ctx.response.body = 'OK';

//     next();
// });

const server = http.createServer(app.callback());

server.listen(port, (err) => {
  if (err) {
    console.log(err);

    return;
  }

  console.log(`Server is listening ${port}`);
});
