var mongoose = require('mongoose');
var  bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: Number,
    password: String,
    avatar: {
        type: String,
        default: '/images/default-avatar.jpeg'
    },
    title: {
        type: String,
        default: '未命名条目'
    },
    description: {
        type: String,
        default: 'Up主很懒，还没有添加任何描述……'
    },
    active: {
        type: Boolean,
        default: false
    },
    activeToken: String,
    activeExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    collects: [{type: String, ref: 'Comment'}]
});

UserSchema.plugin(passportLocalMongoose, {
    incorrectUsernameError: '手机号码格式不正确',
    incorrectPasswordError: '密码不正确',
    userExistsError: '此手机号码已被注册'
});

//should validate the phone number
UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};


UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.hash);
};

module.exports = mongoose.model('User', UserSchema);
