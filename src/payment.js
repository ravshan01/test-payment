import css from "./style.css?raw";
import template from "./template.html?raw";

export class Payment {
	#details = {
		amount: 0,
		merchant: "Pinkork (SPAIM)",
		terminal: "358242410-1",
		order: "00094617z424",
		date: "12/12/2025 16:48",
		productDescription: "1 Funko Mashle: Magic and Muscles Lemon Irvine 21...",
	};

	/** @type {string} */
	#template = template;
	/** @type {ShadowRoot | null} */
	#shadow = null;

	/** @param {number} amount */
	constructor(amount) {
		this.#details.amount = amount;
	}

	renderPage() {
		const host = document.createElement("div");
		document.body.appendChild(host);

		this.#shadow = host.attachShadow({ mode: "closed" });
		this.#shadow.innerHTML = this.#insertValuesInTemplate();
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

	#insertValuesInTemplate() {
		// можно заменить на поиск по __([A-Z0-9_]+)__ и динамическую подстановку,
		//   чтобы не производить много replace
		return this.#template
			.replace("__AMOUNT__", this.#details.amount.toFixed(2))
			.replace("__MERCHANT__", this.#details.merchant)
			.replace("__TERMINAL__", this.#details.terminal)
			.replace("__ORDER__", this.#details.order)
			.replace("__DATE__", this.#details.date)
			.replace("__PRODUCT_DESCRIPTION__", this.#details.productDescription);
	}
}
