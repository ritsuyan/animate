// file: mail-test.js

// 引入 nodemailer
var nodemailer = require('nodemailer');

// 创建一个SMTP客户端配置
var config = {
        host: 'smtp.qq.com',
        port: 25,
        auth: {
            user: '771299428@qq.com',
            pass: 'yanqing1376247'
        }
    };
    
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

// 创建一个邮件对象
var mail = {
    // 发件人
    from: '771299428@qq.com',
    // 主题
    subject: 'test',
    // 收件人
    to: '771299428@qq.com',
    // 邮件内容，HTML格式
    text: 'test html mail'
};

// 发送邮件
transporter.sendMail(mail, function(error, info){
    if(error) return console.log(error);
    console.log('mail sent:', info.response);
});