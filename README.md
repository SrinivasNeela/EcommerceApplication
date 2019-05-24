# EcommerceApplication
An Ecommerce Application where customer will order their products


npm install

if you are writing new Api then  write passport.authenticate("jwt", { session: false } as a middleware function

ex:-

router.put("/update/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
//write your code here
}
