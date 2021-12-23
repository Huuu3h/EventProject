$(function() {
        /* 调用函数获取用户信息 */
        getUserInfo();
        var layer = layui.layer;
        $('#btnLogout').on('click', function() {
            //提示是否退出
            layer.confirm('确定退出登录', { icon: 3, title: '提示' }, function(index) {
                //do something
                //清空本地存储中的token
                localStorage.removeItem('token')
                    //重新跳转到登录页
                location.href = '/login.html'
                    //关闭询问框
                layer.close(index);
            });
        })
    })
    //获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        /*     Headers: {
                Authorization: localStorage.getItem('token') || ''
            }, */
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            /* 调用函数渲染用户头像 */
            renderAvatar(res.data)
        },
        complate: function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败!') {
                localStorage.removeItem('token')
                Location.href = '/login.html'
            }
        }
    })
}
//渲染用户头像
function renderAvatar(user) {
    //获取名字
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    //渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}