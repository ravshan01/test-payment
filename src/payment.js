import css from "./style.css?raw";
import template from "./template.html?raw";

export class Payment {
	#amount = 0;
	/** @type {string} */
	#template = template;
	/** @type {ShadowRoot | null} */
	#shadow = null;

	constructor(amount) {
		console.log(amount);
		this.#amount = this.#sanitizeAmount(amount);
		this.#insertAmountInTemplate();
	}

	renderPage() {
		const host = document.createElement("div");
		document.body.appendChild(host);

		const shadow = host.attachShadow({ mode: "closed" });
		shadow.innerHTML = this.#template;
		this.#applyStyles();
	}

	#applyStyles() {
		if (!this.#shadow) throw new Error("Shadow root is not initialized");

		if (
			typeof CSSStyleSheet !== "undefined" &&
			"adoptedStyleSheets" in this.#shadow
		) {
			const sheet = new CSSStyleSheet();
			sheet.replaceSync(css);
			this.#shadow.adoptedStyleSheets = [sheet];
			return;
		}

		const style = document.createElement("style");
		style.textContent = css;
		this.#shadow.appendChild(style);
	}

	/**
	 * @param {number} amount
	 * @returns {number}
	 */
	#sanitizeAmount(amount) {
		const n = Number(amount);

		if (Number.isNaN(n) || !Number.isFinite(n) || n < 0)
			throw new Error("Invalid amount");
		return +n.toFixed(2);
	}

	#insertAmountInTemplate() {
		return this.#template.replace("__AMOUNT__", this.#amount);
	}
}
