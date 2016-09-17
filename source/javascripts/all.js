//= require jquery
//= require bootstrap-sass/assets/javascripts/bootstrap-sprockets

$(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 250;  // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";


    $('.more').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }
    });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle(400);
        $(this).prev().toggle();
        return false;
    });


    $('.alex-button').click(function(){
        $(this).find('.alex-content').clone().appendTo('.alex-modal-body');
        $('#alex-modal .alex-modal-body .control-group.hide').show();
        $('#alex-modal').modal();

    });
    
    $('#alex-modal').on('hidden', function(){
        $('#alex-modal .alex-content').remove();
    });

});


