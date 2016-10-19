/**
 * Created by harttle on 1/6/15.
 */





var msgMap = {
    "Unauthorized": '用户名或密码不正确',
    "Unactived": '该用户尚未激活'
};

function login(){
    if(!simpleValidate()) return;
    $.post('', $('form').serialize())
        .done(function(){
            window.location = '/home';
        })
        .fail(function(e){
            warn(msgMap[e.responseText] || '未知错误');
        });

}

function resetPassword(){
    var p = $('#password').val();
    var p1 = $('#password1').val();
    if(p===''){
        warn('密码不能为空');
        return false;
    }
    if(p !== p1){
        warn('两次输入的密码不一致');
        return false;
    }
    return true;
}

function signup(){
    if(!simpleValidate()) return;

    var password = $('[name=password]').val();
    var password1 = $('#password1').val();
    if(password != password1){
        warn('两次输入的密码不一致');
        return;
    }
    $.post('', $('form').serialize())
        .done(info)
        .fail(function(res){
            warn(res.responseText);
        });
}

function simpleValidate(){
    var username = $('[name=username]').val().trim();
    var password = $('[name=password]').val();

    if(username.length === 0){
        warn('手机号码不能为空');
        return false;
    }
    if(!validatePhone(username)){
        warn('手机号码格式不正确');
        return false;
    }
    if(password.length === 0){
        warn('密码不能为空');
        return false;
    }
    return true;
}

function warn(msg){
    $('.alert').hide();
    $('.alert-danger').html(msg).show();
}

function info(msg){
    $('.alert').hide();
    $('.alert-success').html(msg).show();
}

function validatePhone(phone) {
    var re = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; ;
    return re.test(phone);
}



function sendVerticyCode (){

  //  event.preventDefault()

    var phoneNumber = $('[name=username]').val().trim();
    console.log(phoneNumber)




  /*  if(Number(phoneNumber) !== NaN){
        $.ajax({
            type: "POST",
            url: "/sendcode",
            data: Number(phoneNumber),
            success: function(msg){
                alert( "phone number is " + msg );
            }
        });
     }
    */
}

function checkCode(realcode){
       var userfill = $('[name=vertifycode]').val().trim();

      if(realcode !== userfill){
          return false;
      }
}



$(document).ready(function () {
    $('.vertify-btn').on('click', function (evt) {
        evt.preventDefault();

        var phoneNumber = $('[name=username]').val().trim();
        console.log(phoneNumber)

        $.ajax({
             url:'/account/sendcode',
            type:'POST',
            data:{'phonenum': phoneNumber},
            success: function (data) {
                if(data.success){
                     alert('ok')
                }
            }
        })
    })
})


