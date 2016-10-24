/**
 * Created by admin on 2016/10/17.
 */
//自定义配置
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery3.1.1',
        controller: '../controller',
        view: '../view',
        model: '../model'
    },
    shim: {
        'bootstrap': ['jquery']
    },
});
//加载模块
requirejs(['jquery', 'bootstrap', 'model/ajaxAPI', 'view/view', 'controller/controller'], function ($, bootstrap, ajax, view, controller) {
    $(document).ready(function () {

        //localStorage.logo_add=true;
        //主动触发刷新事件
        $('#btn_refresh').click();
        //主动触发失败
        $("#start").html('');
        ajax.ajax("https://d.apicloud.com/mcm/api/test", 'get', null,
            function (data) {
                //返回json对象数组
                alert(JSON.stringify(data));
                $.each(data, function (i, value) {
                    view.add_rows(true, data[i], null);
                })
            })

        $('#btSelectAll').on('change', function () {
            view.select_allrows();
            view.btn_disabled();
        });
        //未来元素的绑定，1.7以上使用on
        //绑定每个tr的checkbox
        $(document).on('click', 'table tbody td input[type="checkbox"]', function () {
            view.select_row();
            view.btn_disabled();
        });
        //搜索按钮监听
        $('#btn_search').click(function () {
            if ($('#input-search').val()) {
                var filter = {
                    "where": {"Number": $('#input-search').val()}
                }
                ajax.ajax("https://d.apicloud.com/mcm/api/test?filter=" + JSON.stringify(filter), 'get', null,
                    function (data) {
                        $("#start").html('');
                        //返回json对象数组
                        alert(JSON.stringify(data));
                        if (data == null || data == "" || typeof(data) == "undefined") {
                            $("#start").html('<tr> <td colspan="8">没有找到匹配的记录</td></tr>');
                        }
                        else {
                            view.add_rows(true, data[0], null);
                        }

                    })
            } else {
                alert("请输入学号。");
            }
        })

        //新增按钮监听
        $('#btn_add').click(function () {
            $('#myModalLabel').text("新增");
        });
        //修改按钮监听
        $('#btn_edit').click(function () {
            //localStorage.logo_add=false;
            $.each(controller.get_rows(), function (i, value) {
                view.setup_data(controller.get_data(false, value, true));
            });
            //for(var i=0;i<controller.get_rows().length;i++){
            //    controller.get_data(false,controller.get_rows()[i])
            //}
        })
        //删除按钮监听
        $('#btn_delete').click(function () {
            view.remove_rows(controller.get_rows())
        })
        //刷新按钮监听
        $('#btn_refresh').click(function () {
            //首先清空现有内容
            $("#start").html('');
            ajax.ajax("https://d.apicloud.com/mcm/api/test", 'get', null,
                function (data) {
                    //返回json对象数组
                    alert(JSON.stringify(data));
                    $.each(data, function (i, value) {
                        view.add_rows(true, data[i], null);
                    })
                })
        })
        //提交按钮监听
        $('#btn-submit').click(function () {
            if ($('#myModalLabel').text() == "新增") {
                var form=controller.get_data(true, null, false);
                if(!form[0]||!form[4]||!form[5]||!form[6]||!form[1]){
                    alert("姓名，学号和各科成绩为必输项，请输入后再提交！")
                }else {
                    ajax.ajax("https://d.apicloud.com/mcm/api/test", 'post', controller.get_data(true, null, true),
                        function (data) {
                            //alert(JSON.stringify(data));
                            view.add_rows(true, data, null);
                            $('#myModal').modal('hide');
                        })
                }
            } else {
                var select_id = $("table tbody input[type='checkbox']:checked").attr('id');
                alert(select_id);
                if ($.trim(controller.get_data(false, select_id, false)) === $.trim(controller.get_data(true, null, false))) {
                    alert("当前数据没有变动，操作无效。")
                } else {
                    ajax.ajax("https://d.apicloud.com/mcm/api/test/" + select_id, 'put', controller.get_data(true, null, true),
                        function (data) {
                            alert("修改返回" + JSON.stringify(data));
                            view.add_rows(false, data, select_id);
                            $('#myModal').modal('hide');
                        }
                    )
                }
            }
        })
    })

});
