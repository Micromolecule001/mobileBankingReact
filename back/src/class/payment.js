class Payment {
    constructor(email, from, to, type, amount) {
        this.id = Payment.createId();
        this.email = email;
        this.from = from;
        this.to = to;
        this.type = type;
        this.amount = amount;
        this.time = new Date(Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    static createId = () => {
        return Date.now();
    }
}

module.exports = Payment;
