const bcryptjs = require("bcryptjs")


// generate salt 
const salt = bcryptjs.genSaltSync(10);
console.log("Salt",salt);

// then define the salt as ENV variable 
// BCRYPT_SALT
console.log(bcryptjs.hashSync("test",salt));