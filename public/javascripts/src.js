
function distance(x1, y1, x2, y2)
{    
    return Math.round ( Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0)  );
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function find() {

    var box = $("textarea#txtBestLink");
    var str1 = $('textarea#txtLinkstation').val().trim();
    var str2 = $('textarea#txtPoints').val().trim();

    box.val("");

    if (isJson(str1) == false || isJson(str2) == false)
    {
        box.val("Invalid json data");
        return;
    }

    var data1 = JSON.parse(str1);
    var data2 = JSON.parse(str2);

    $.each(data2, function (index, value) {
      
        var pos = value.toString().split(",");

        var x1 = pos[0];
        var y1 = pos[1];

        var pwr_array = [];        
        
        $.each(data1, function (index, value) {
            
            var arr = value.toString().split(",");

            var x2 = arr[0];
            var y2 = arr[1];
            var reach = arr[2];

            var dist = distance(x1, y1, x2, y2);

            var pwr = -1;

            if (dist > reach) {
                pwr = 0;
            }
            else {
                pwr = Math.pow((reach - dist), 2);
            }

            pwr_array.push(pwr);
        });

        var pwr_max = Math.max.apply(false, pwr_array);
        var pwr_index = pwr_array.indexOf(pwr_max);

        var coordinates = data1[pwr_index].toString().split(",");
        var coordinates_parsed = coordinates[0] + ',' + coordinates[1];

        if (pwr_max <= 0) {
            box.val(box.val() + 'No link station within reach for point ' + x1 + "," + y1 + "\n");
        }
        else {
            box.val(box.val() + "Best link station for point " + x1 + "," + y1 + " is " + coordinates_parsed  + " with power " + pwr_max + "\n");
        }        
    });

}