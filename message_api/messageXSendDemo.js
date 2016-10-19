var MessageXSend = require('./messageXSend.js');

var messageXSend = new MessageXSend();

function crevertiCode(){
  return  Math.floor( Math.random() * 899999) + 100000
}


messageXSend.add_to('15800984101');
messageXSend.add_var('code',crevertiCode());
messageXSend.add_var('time','60秒');
messageXSend.set_project('fwgU');

messageXSend.xsend();
