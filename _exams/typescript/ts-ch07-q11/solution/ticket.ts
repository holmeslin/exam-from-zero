export class Ticket {
  static readonly MAX = 3;
  static #count = 0;

  static issue(): number | null {
    if (Ticket.#count >= Ticket.MAX) {
      return null;
    }
    Ticket.#count++;
    return Ticket.#count;
  }
}
