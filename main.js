var main = {
    run: function () {
        checkGender.check();
        checkName.check();
        addTr.run();
        removeTr.run();
    }
};
var removeTr = {
    run: function () {
        $('.btn').on('click', function () {
            $(this).parents('tr').remove();
        });
    }
};
var current = {
    state: 0,
    changeToDone: function () {
        current.state = 1;
    },
    changeToNot: function (element, message) {
        current.state = 0;
        $(element).parent().after(message);
    }
};
var addTr = {
    count: 0,
    run: function () {
        if (current.state === 1) {
            addTr.count++;
            $('.newTable').append('<tr><td>' + checkName.valueC[0] + '</td><td>' + checkName.valueC[1] + '</td><td>' + checkName.valueC[2] + '</td><td>' + checkName.valueC[3] + '</td><td>' + checkName.valueC[4] + '</td><td><input type="button" class="btn" id="abc' + addTr.count + '" value="button' + addTr.count + '"></tr>');
        } else {
            alert(2);
        }
    }
};
var checkGender = {
    element: document.getElementsByName("Gender"),
    valueG: "",
    check: function () {
        $('span').remove();
        if (checkGender.element[0].checked === true) {
            checkGender.valueG = "Male";
            //alert(checkGender.valueG.length);
            current.changeToDone();
        } else if (checkGender.element[1].checked === true) {
            checkGender.valueG = "Female";
            current.changeToDone();
        } else {
            current.changeToNot();
            $(checkGender.element).parents('div').append('<span>Choose a Gender</span>');
        }
    }
};
var errorMsg = {
    msg1: function (valueField) {
        return '<span>Please insert ' + valueField + '.</span>';
    },
    msg2: function (valueField) {
        return '<span>Should be atleast ' + valueField + ' charecters!!</span>';
    },
    msg3: function (valueField) {
        return '<span>Should not be above  ' + valueField + ' charecters!!</span>';
    }

};
var checkName = {
    element: 'input[type=text]',
    valueC: [],
    check: function () {
        //lents.check();
        $(checkName.element).each(function (i) {
            valC = $(this).val();
            var minL = $(this).attr('data-minl');
            var maxL = $(this).attr('data-maxl');
            var iD = $(this).attr('id');

            if ((valC).length > minL) {
                if ((valC).length > maxL) {
                    current.changeToNot($(this), errorMsg.msg3(maxL));
                } else {
                    current.changeToDone();
                    checkName.valueC[i] = $(this).val();
                }
            } else if ((valC).length === 0) {
                //current.changeToNot($(this),'Please insert '+$(this).parent().text().trim()+'.');
                current.changeToNot($(this), errorMsg.msg1(iD));

            } else {
                current.changeToNot($(this), errorMsg.msg2(minL));
            }

        });
        if (checkGender.valueG.length) {
            (checkName.valueC).unshift(checkGender.valueG);
        }
        console.log(checkName.valueC);
    }
};
$(document).ready(function () {
    $('#add').on('click', main.run);
});