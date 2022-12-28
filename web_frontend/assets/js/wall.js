document.addEventListener("DOMContentLoaded", ()=>{
    $()
        .on("click", ()=>{ $(".delete_btn").removeClass("show"); })
        .find("#post_form").on("submit", onSubmitMessage)
            .find(".message_block .message_content")
                .on("focus", (event) => {
                    $("#post_form .message_block").addClass("focus");
                })
                .on("blur", (event) => {
                    $("#post_form .message_block").removeClass("focus");
                });
});

function onSubmitMessage(event, message_list = $("#posts_list"), is_comment = false){
    event.preventDefault();
    let message_form = $(event.target);
    let message_value = message_form.find("textarea.message_content").val();

    if(message_value.length){
        let message_item = $("#clones_list .message_item").clone();
        let messages = message_item.findAll(".message_content");
        $(messages[0]).val(message_value);
        $(messages[1]).text(message_value);
        message_list.get().prepend(message_item.get());

        message_item.find(".edit_btn").on("click", (event) =>{
            let edit_message_form = $(event.target.closest(".message_item"))
                .find(".edit_message_form:first-child");
            edit_message_form.addClass("show").find("textarea").get().focus();
        });
        message_item.find(".yes_btn").on("click", (event) =>{
            event.stopPropagation();
            $(event.target.closest(".message_item")).get().remove();
        });
        message_item.find(".delete_btn").on("click", (event) =>{
            event.stopPropagation();
            message_item.find(".delete_btn").addClass("show");
        });
        message_item.find(".edit_message_form").on("submit", submitEditMessage);
        message_item.find(".message_form").on("submit", (event) =>{
            onSubmitMessage(event, message_item.find(".messages_list"), true);
        }).find(".message_block .message_content")
            .on("focus", () => { message_item.find(".message_form .message_block").addClass("focus"); })
            .on("blur", () => { message_item.find(".message_form .message_block").removeClass("focus"); });

        if(is_comment){
            message_item.find(".messages_list").get().remove();
            message_item.find(".message_form").get().remove();
            message_item.find(".total_responses").get().remove();
        }
        
        message_form.find(".message_block").removeClass("focus");
        message_form.find(".message_block").removeClass("error");

        message_item.find(".message_block .message_content")
            .on("focus", () => { message_item.find(".message_block").addClass("focus"); })
            .on("blur", () => { message_item.find(".message_block").removeClass("focus"); });

        message_form.get().reset();

    } else {
        message_form.find(".message_block").addClass("error");
    }
}

function submitEditMessage(event){
    event.preventDefault();
    let message_form = $(event.target);
    let message_value = message_form.find("textarea.message_content").val();

    if(message_value.length){
        message_form.find("p.message_content").text(message_value);
        message_form.removeClass("show");
        message_form.find(".message_block").removeClass("error");
    } else {
        message_form.find(".message_block").addClass("error");
    }
}