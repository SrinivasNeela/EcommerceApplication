module.exports = class Customer {
    constructor(name, email, password,orderList = {}) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.orderList =orderList;
         
    }
}