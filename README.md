# EcommerceApplication
An Ecommerce Application where customer will order their products


please follow the below steps 

git init

git config http.sslVerify false

git clone "https://github.com/SrinivasNeela/EcommerceApplication.git"

npm install


if you are writing new Api then  write passport.authenticate("jwt", { session: false } as a middleware function

ex:-

router.put("/update/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
//write your code here
}


https://www.freecodecamp.org/news/learn-how-to-handle-authentication-with-node-using-passport-js-4a56ed18e81e/

http://www.passportjs.org/

https://www.npmjs.com/package/passport  //for configuration



please follow the es6 standards  for more ==>http://blog.thefirehoseproject.com/posts/12-reasons-es6-future-javascript-web-development/
