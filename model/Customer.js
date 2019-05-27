module.exports = class Customer {
<<<<<<< HEAD
    constructor(id, name, email, password, ordersList) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.ordersList = typeof ordersList == undefined ? null :ordersList 

=======
    constructor(name, email, password,orderList = {}) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.orderList =orderList;
         
>>>>>>> fc992b2e7f19774735879290cba78620155969c1
    }
}