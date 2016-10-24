/**
 * Created by admin on 2016/10/19.
 */
define(['jquery', 'bootstrap', 'controller/controller', 'model/ajaxAPI'], function ($, bootstrap, controller, ajax) {
    var selectAll = $('#btSelectAll');
    var selectItem = $('table input:checked');
    return {
        //按钮是否可点击
        btn_disabled: function () {
            var selectNumber = $('table  tbody input:checked').length;
            if (selectNumber == 1) {
                $("#btn_delete").attr('disabled', false);
                $("#btn_edit").attr('disabled', false);
            }
            else if (selectNumber > 1) {
                $("#btn_edit").attr('disabled', true);
                $("#btn_delete").attr('disabled', false)
            } else {
                $("#btn_delete").attr('disabled', true);
                $("#btn_edit").attr('disabled', true)
            }
        },
        //选中或不选所有行
        select_allrows: function () {
            if (selectAll.prop('checked')) {
                $("table input[type='checkbox']").each(function () {
                    $(this).prop('checked', true);//使用attr会取反。prop较为准确。
                });
            } else {
                $("table input[type='checkbox']").each(function () {
                    $(this).prop('checked', false);
                });
            }
        },
        //选中或者不选中当前行
        select_row: function () {
            if ($(this).prop('checked')) {
                $(this).prop('checked', true);//使用attr会取反。prop较为准确。
            } else {
                $(this).prop('checked', false);
            }
        },
        //修改时显示原数据
        setup_data: function (data) {
            var form = [];
            form[0] = (data.Name == null || data.Name == "" || typeof(data.Name) == "undefined") ? null : data.Name;
            form[1] = (data.Number == null || data.Number == "" || typeof(data.Number) == "undefined") ? null : data.Number;
            form[2] = (data.Age == null || data.Age == "" || typeof(data.Age) == "undefined") ? null : data.Age;
            form[3] = (data.Address == null || data.Address == "" || typeof(data.Address) == "undefined") ? null : data.Address;
            form[4] = (data.Score.chinese == null || data.Score.chinese == "" || typeof(data.Score.chinese) == "undefined") ? null : data.Score.chinese;
            form[5] = (data.Score.math == null || data.Score.math == "" || typeof(data.Score.math) == "undefined") ? null : data.Score.math;
            form[6] = (data.Score.english == null || data.Score.english == "" || typeof(data.Score.english) == "undefined") ? null : data.Score.english;
            $("div #myModal form .form-group div input").each(function (i, value) {
                $(this).val(form[i]);
            });
            $('#myModalLabel').text("修改");
            $('#myModal').modal('show');
        },
        //添加或者修改行
        add_rows: function (add, ob, id) {
            //var newrow= $(".table").insertRow(0);
            //for( var i  in  ob){
            //    if (ob.hasOwnProperty(i)) { // 过滤
            //        console.log(i, ":", man[i]);
            //        newrow.insertCell()
            //    }
            var html = "";
            html += "<td><input type='checkbox' id=" + ob.id + "></td>";
            html += "<td>" + ob.Name + "</td>";
            html += "<td>" + ob.Number + "</td>";
            html += "<td>" + ob.Age + "</td>";
            html += "<td>" + ob.Address + "</td>";
            html += "<td>" + ob.Score.chinese + "</td>";
            html += "<td>" + ob.Score.math + "</td>";
            html += "<td>" + ob.Score.english + "</td>";
            //alert(html);
            if (add) {
                html = "<tr data-toggle='popover' title='"+ ob.Name + "的成绩' data-content='语文:" + ob.Score.chinese + "   数学:" + ob.Score.math +"   外语:" + ob.Score.english +"' data-placement='top' data-trigger='hover'>" + html + "</tr>";
                $("#start").prepend(html);
            } else {
                $('#' + id).parent().parent().html(html);
            }
            //弹窗初始化
            $("div table #start tr").popover();
        },
        //删除行
        remove_rows: function (rowsparam) {
            //for(var i=0;i<param.length;i++){
            //    $(param(i)).remove();
            //}
            $.each(rowsparam, function (i, value) {
                ajax.ajax("https://d.apicloud.com/mcm/api/test/" + rowsparam[i], 'DELETE', null,
                    function (data) {
                        alert("删除返回" + JSON.stringify(data));
                        $('#' + rowsparam[i]).parent().parent().remove();
                    }
                )
            });
            //全部删除时，进行提示
            if( !$("#start").html()){
                $("#start").html('<tr><td colspan="8">目前还没有记录</td></tr>');
            }
        }
    }
})