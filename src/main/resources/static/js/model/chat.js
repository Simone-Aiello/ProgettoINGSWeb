class Chat {
	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	constructor(key) {
		if (key != Chat.#key)
			throw new Error("This constructor is private");
	}
	static Builder = class {

		#product = new Chat(Chat.#key);

		constructor() {
			this.built = false;
		}
		withId(id){
			this.#product.id = id;
		}
		withA1(a1){
			this.#product.a1 = a1;
		}
		withA2(a2){
			this.#product.a2 = a2;
		}
		withMessages(messages){
			this.#product.messages = messages;
		}
		build = function() {
			if (this.built) throw new Error("This builder has already been used");
			this.built = true;
			return this.#product;
		}
	}
}