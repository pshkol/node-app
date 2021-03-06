const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    date: {type: Date, default: Date.now}
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

}

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)