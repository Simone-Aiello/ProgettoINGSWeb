class Message {
	static #key = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
	constructor(key) {
		if (key != Message.#key)
			throw new Error("This constructor is private");
	}
	static Builder = class {

		#product = new Message(Message.#key);

		constructor() {
			this.built = false;
		}
		withText(text){
			this.#product.text = text;
		}
		withMessageTime(time){
			this.#product.messageTime = time;
		}
		withIdChat(idChat){
			this.#product.idChat = idChat;
		}
		withSender(sender){
			this.#product.sender = sender;
		}
		build = function() {
			if (this.built) throw new Error("This builder has already been used");
			this.built = true;
			return this.#product;
		}
	}
}