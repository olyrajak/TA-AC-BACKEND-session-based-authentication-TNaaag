var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, minlength: 5, required: true },

}, {
    timestamps: true,
});
UserSchema.pre('save', function(next) {
    if (this.password && this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashed) => {
            if (err) return next(err);
            this.password = hashed;
            return next();
            // console.log("ddddd");
        })

    } else {
        next();
    }
});
var User = mongoose.model("User", UserSchema);

module.exports = User;