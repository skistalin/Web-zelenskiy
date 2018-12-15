$("#field").on("keydown", function (event){
    var item;
    if (event.which == 13) {
        item = $("<li></li>");
        item.addClass("list-group-item todo-item")
        item.html($(this).val());
        $(this).val("");
        item.on("click", function() {
            $(this).toggleClass("list-group-item-danger");
        });
        $("#list").append(item);
    }
});

$(document).on("keydown", function(event) {
    if (event.which == 46) {
        $("#remove-dialog").modal("show");
    }
});

$("#remove-dialog").on("keydown", function(event) {
    if (event.which == 13) {
        removeItems();
    }
});

$("#remove-dialog-ok").on("click", removeItems);

function removeItems(event) {
    $(".list-group-item-danger").remove();
    $("#remove-dialog").modal("hide");
}