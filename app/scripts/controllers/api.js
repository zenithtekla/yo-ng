'use strict';

var ajaxPost = function( _ ){
    var jqDeferred = $.ajax({
        type:"POST",
        url: _.url,
        data: _.d,
        dataType: 'json',
    });

    jqDeferred.then( function(data) {
        if (_.hasOwnProperty('callback')) _.callback(data);
    },
    function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
};