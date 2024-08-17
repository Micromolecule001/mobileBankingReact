class User {
    static #list = {
        123: {
            email: 'asd@asd.asd',
            password: 'Qwerty',
            isConfirmed: false,
            confirmationCode: 'wwwwww',
            recoveryCode: 'qqqqqq',
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

    static verifyCode = (email, code, type) => {

        if (type === 1) {
            const user = this.getUserByEmail(email);
            
            if (user && user.confirmationCode === code) {
                user.isConfirmed = true;
                return true;
            }

            return false;
        }

        const user = this.getUserByEmail(email);
        
        if (user && user.recoveryCode === code) {
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

    static auth = (email, password) => {
        const user = this.getUserByEmail(email)
        return (user.email === email && user.password === password) ? true : false
    }       
}

module.exports = User;
