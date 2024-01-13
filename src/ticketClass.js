const { v4: uuidv4 } = require('uuid');

class TicketList {
  constructor() {
    this.tickets = [
      {
        id: '1', name: 'Task1', description: 'Description of Task1', status: true, created: '2024-01-13',
      },
      {
        id: '2', name: 'Task2', description: 'Description of Task2', status: false, created: '2024-01-13',
      },
    ];
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
      created: new Date(),
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
}

module.exports = { TicketList };
