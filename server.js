const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const { TicketList } = require('./src/ticketClass');

const app = new Koa();
const router = new Router();

const ticketList = new TicketList();

app.use(cors());
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', (ctx) => {
  switch (ctx.request.query.method) {
    case 'allTickets':
      ctx.body = ticketList.getAllTickets();
      break;

    case 'ticketById': {
      const { id } = ctx.request.query;
      ctx.body = JSON.stringify(ticketList.getTicketById(id));
      break;
    }

    default:
      ctx.throw(404, 'oh, not found');
  }
});

router.post('/', (ctx) => {
  switch (ctx.request.query.method) {
    case 'createTicket': {
      const { name } = ctx.request.body;
      const { description } = ctx.request.body;
      ticketList.createTicket(name, description);
      ctx.body = ticketList.getAllTickets();
      break;
    }

    case 'updateTicket': {
      const { id } = ctx.request.body;
      console.log(ctx.request.body);
      ticketList.updateTicket(ctx.request.body);
      ctx.body = ticketList.getTicketById(id);
      break;
    }

    default:
      ctx.throw(404, 'oh, not found');
  }
});

router.delete('/', (ctx) => {
  const { id } = ctx.request.query;
  ticketList.delete(id);
  ctx.body = ticketList.getAllTickets();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
