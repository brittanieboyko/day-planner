$(document).ready(function() {

    $(".button-save").on("click", function() {
        var description = $(this).siblings(".description").val();
        var hour = $(this).parent().attr("id");
        localStorage.setItem(description, hour);
    });

    $("#currentDay").text(moment().format("dddd, MMMM Do"));
});