import { Payment } from "./payment.js";

/**
 * @param {number} amount
 */
export function pay(amount) {
	const payment = new Payment(amount);
	payment.renderPage();
}
