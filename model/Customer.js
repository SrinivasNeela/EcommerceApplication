module.exports = class Customer {
<<<<<<< HEAD
    constructor(name, email, password,orderList =[]) {
=======
    constructor(name, email, password,orderList = {}) {
>>>>>>> 48c1ab277a6f6fa7956ef62b8e8975ff9ce86409
        this.name = name;
        this.email = email;
        this.password = password;
        this.orderList =orderList;
         
    }
}