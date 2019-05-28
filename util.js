const bcrypt = require("bcryptjs")

const encryptPassword = password => new Promise((resolve, reject) => {
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			
			reject(err)
			return false
		}
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) {
				console.log(err)
				reject(err)
				return false
			}
			resolve(hash)
			return true
		})
	})
})

const comparePassword = (password, hash) => new Promise(async (resolve, reject) => {
	try {
	
		const isMatch = await bcrypt.compare(password, hash)
		console.log(hash);
		resolve(isMatch)
		return true
	} catch (err) {
		reject(err)
		return false
	}
})

module.exports = { encryptPassword, comparePassword }