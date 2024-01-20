const { v4: uuidv4 } = require('uuid');

class TicketList {
  constructor() {
    this.tickets = [];

    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  getAllTickets() {
    return this.tickets.map(({
      id, name, status, created,
    }) => ({
      id, name, status, created,
    }));
  }

  getTicketById(id) {
    return this.tickets.filter((ticket) => ticket.id === id);
  }

  createTicket(name, description) {
    this.tickets.push({
      id: uuidv4(),
      name,
      description,
      status: false,
      created: this.getCurrentDate(),
    });
  }

  updateTicket(newTicket) {
    const { id } = newTicket;
    const ticketIndex = this.tickets.indexOf(this.tickets.find((ticket) => ticket.id === id));
    this.tickets[ticketIndex] = newTicket;
  }

  delete(id) {
    this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
  }

  getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
  
}

module.exports = { TicketList };
