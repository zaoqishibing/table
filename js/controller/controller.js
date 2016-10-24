define(['jquery'], function ($) {
    //var selectAll = $('input [name="btSelectAll"]:checkbox');
    //var selectItem = $('table input:checked');
    return {
        //获取选中行的id
        get_rows: function () {
            var rowsId = [];
            $("table tbody input[type='checkbox']:checked").each(function () {
                rowsId.push($(this).attr('id'));
            })
            return rowsId;
        },
        //获取模态框或者单行中的数据
        get_data: function (modal, id, isob) {
            var data = {};
            var score = {};
            var form = [];
            if (modal) {
                $("div #myModal form .form-group div input").each(function () {
                        form.push($(this).val());
                    }
                );//选择器返回的是jquery对象还是js数组？
            } else {
                $('#' + id).parent().parent().find("td").not('td:first').each(function () {
                    form.push($(this).text());
                });
            }
            //alert('form'+form);
            data.Name = form[0];
            data.Number = form[1];
            data.Age = form[2];
            data.Address = form[3];
            score.chinese = form[4];
            score.math = form[5];
            score.english = form[6];
            data.Score = score;
            //alert(JSON.stringify(data));
            if (isob) {
                return data;
            }
            else {
                return form;
            }
        },
    }
})