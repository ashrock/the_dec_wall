document.addEventListener("DOMContentLoaded", () => {
    $(".show_login_form_link").on("click", showUserForm);
    $(".show_signup_form_link").on("click", showUserForm);

    $("#signup_form").on("submit", submitUserForm);
    $("#login_form").on("submit", submitUserForm);
});

function showUserForm(event){
    event.preventDefault();
    $("#signup_form").removeClass("show");
    $("#login_form").removeClass("show");
    let active_form = event.target.getAttribute("title");
    $(`${active_form}`).addClass("show");
}

function submitUserForm(event){
    event.preventDefault();
    let user_form = $(event.target);
    let allow_submit = true;
    let user_fields = user_form.findAll("input");
    
    for(let item of user_fields){
        $(item).removeClass("error");

        if(!item.value.length){
            $(item).addClass("error");
            allow_submit = false;
        }
        
    }

    if(allow_submit){
        window.location = "./wall.html";
    }
}