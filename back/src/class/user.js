class User {
    static #list = {
        123: {
            email: 'asd@asd.asd',
            password: 'qwerty',
            isConfirmed: false,
            confirmationCode: null,
            recoveryCode: null,
        }
    };

    constructor(email, password, isConfirmed = false) {
        this.id = User.createId();
        this.email = email;
        this.password = password;
        this.isConfirmed = isConfirmed;
        this.confirmationCode = User.generateCode();
        this.recoveryCode = User.generateCode();
    }

    static createId = () => {
        return Date.now();
    }

    static addUser = (user) => {
        if (this.getUserByEmail(user.email)) {
            return false; // User already exists
        }
        this.#list[user.id] = user;
        console.log('User has been added successfully to the list: ', this.#list) 
        return true; // User added successfully
    }

    static getUserById = (id) => {
        return this.#list[id];
    }

    static getUserByEmail = (email) => {
        return Object.values(this.#list).find(user => user.email === email);
    }

    static verifyCode = (email, code) => {
        const user = this.getUserByEmail(email);
        if (user && user.confirmationCode === code) {
            user.isConfirmed = true;
            return true;
        }
        return false;
    }

    static generateCode = () => {
        let result = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            const randomInd = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomInd);
        }
        return result;
    }
}

module.exports = User;
