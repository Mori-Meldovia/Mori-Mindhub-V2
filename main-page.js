const button_active = false;
var volume_on = true;
var soundtrack_text_on = false;

// load sound
var norm_button_sfx = new Audio("../sfx/general_button.mp3");
var vol_button_sfx = new Audio("../sfx/volume_button.mp3");
var background_music = new Audio("../sfx/you_had_me_at_hello.mp3");
background_music.loop = true;
background_music.volume = 0.8;

// updates display on sliders on startupv
document.addEventListener('DOMContentLoaded', function() {
    const total_sliders = document.getElementsByClassName("scroller");
    for (let i = 0; i < total_sliders.length; i++) {
        total_sliders[i].style.display = "none";
    }
    document.getElementById("home-scroller1").style.display =  "flex";
    document.getElementById("home-scroller2").style.display =  "flex";

    // highlights button
    highlight_button("home-button");
    background_music.play();
}, false);


function on_home_click(){
    // check if current slider is active
    if (current_slider("home-scroller")){
        return;
    }
    
    disable_all_buttons();

    // highlights button
    highlight_button("home-button");

    // animate move-out and change
    inner_slider_slide_out("home-scroller");

    // animate move-in
    inner_slider_slide_in(document.getElementById("inner-home-scroller1"));
    inner_slider_slide_in(document.getElementById("inner-home-scroller2"));

    // change content window
    clear_content_window();
    document.getElementById("home-page").style.display = "inline";
    setTimeout(() => {    
        enable_all_buttons();
    }, 2000);
}

function on_about_click(){
    // check if current slider is active
    if (current_slider("about-scroller")){
        return;
    }

    disable_all_buttons();

    // highlights button
    highlight_button("about-button");

    // animate move-out and change
    inner_slider_slide_out("about-scroller");

    // animate move-in
    inner_slider_slide_in(document.getElementById("inner-about-scroller1"));
    inner_slider_slide_in(document.getElementById("inner-about-scroller2"));

    // get page based on resolution
    var yehaw = "about-page";
    if ((window.screen.width) < 700){
        var yehaw = "about-page-mobile";
    }

    // change content window
    clear_content_window();
    document.getElementById(yehaw).style.display = "inline";
    setTimeout(() => {    
        enable_all_buttons();
    }, 2000);

    
    // console.log(window.screen.width);
}

function on_project_click(){
    // check if current slider is active
    if (current_slider("project-scroller")){
        return;
    }

    disable_all_buttons();

    // highlights button
    highlight_button("project-button");

    // animate move-out and change
    inner_slider_slide_out("project-scroller");

    // animate move-in
    inner_slider_slide_in(document.getElementById("inner-project-scroller1"));
    inner_slider_slide_in(document.getElementById("inner-project-scroller2"));
    
    // change content window
    clear_content_window();
    document.getElementById("project-page").style.display = "inline";
    setTimeout(() => {    
        enable_all_buttons();
    }, 2000);
}

function on_link_click(){
    // check if current slider is active
    if (current_slider("link-scroller")){
        return;
    }

    disable_all_buttons();

    // highlights button
    highlight_button("link-button");

    // animate move-out and change
    inner_slider_slide_out("link-scroller");

    // animate move-in
    inner_slider_slide_in(document.getElementById("inner-link-scroller1"));
    inner_slider_slide_in(document.getElementById("inner-link-scroller2"));

    // change content window
    clear_content_window();
    document.getElementById("link-page").style.display = "inline";
    setTimeout(() => {    
        enable_all_buttons();
    }, 2000);
}

function on_volume_click(){
    volume_on = !volume_on;

    if (volume_on){
        document.getElementById("volume-on-white").style.display = "inline";
        document.getElementById("volume-off-white").style.display = "none";
        background_music.play();
        vol_button_sfx.play();
    } else {
        document.getElementById("volume-on-white").style.display = "none";
        document.getElementById("volume-off-white").style.display = "inline";
        background_music.pause(); 
    }
}

function on_soundtrack_click(){
    soundtrack_text_on = !soundtrack_text_on;

    if (soundtrack_text_on){
        document.getElementById("soundtrack-text-holder").style.display = "inline";
    }
    else {
        document.getElementById("soundtrack-text-holder").style.display = "none";
    }

    if (volume_on){ 
        vol_button_sfx.play();
    }
}

// clears content window
function clear_content_window(){
    const total = document.getElementsByClassName("content-window");
    for (let i = 0; i < total.length; i++) {
        total[i].style.display = "none";
    }
}

// clears scrollers
function clear_all_scrollers(){
    const total_sliders = document.getElementsByClassName("scroller");

    for (let i = 0; i < total_sliders.length; i++) {
        total_sliders[i].style.display = "none";
    }
}


// transitions sliders in
function inner_slider_slide_in(inner_slider){
    inner_slider.style.animation = "slide-in 1s ease-out 1";

    inner_slider.onanimationend = () => {
        inner_slider.style.animation = "left-to-right 30s linear reverse infinite";
    };
}

// identifies active slider and pushes it out
function inner_slider_slide_out(slider_name){
    // use inner scroller to find active scroller type
    const total_inner_sliders = document.getElementsByClassName("inner-scroller");
    for (let i = 0; i < total_inner_sliders.length; i++) {
        if (total_inner_sliders[i].parentElement.style.display === "flex"){
            // uses that info to correctly slide out the inner scroller
            const cueAnmation = total_inner_sliders[i].animate([
                // keyframes
                { transform: 'translateX(100%)' }
                ], {
                // timing options
                duration: 1250,
                easing: "ease-in",
                iterations: 1
            });

            cueAnmation.onfinish = () => {
                // reset animation
                // total_inner_sliders[i].style.animation = "left-to-right 30s linear reverse infinite";

                // change scroller
                clear_all_scrollers();
                document.getElementById(slider_name + "1").style.display =  "flex";
                document.getElementById(slider_name + "2").style.display =  "flex";
            }
            
            // total_inner_sliders[i].style.animation = "slide-out 1s ease-in 1";

            // total_inner_sliders[i].onanimationend = () => {
            //     // reset animation
            //     total_inner_sliders[i].style.animation = "left-to-right 30s linear reverse infinite";

            //     // change scroller
            //     clear_all_scrollers();
            //     document.getElementById(slider_name + "1").style.display =  "flex";
            //     document.getElementById(slider_name + "2").style.display =  "flex";
            // };
        }
    }
}

function current_slider(slider_name){
    return (document.getElementById(slider_name + "1").style.display === "flex");
}

function disable_all_buttons(){
    // can use for loop instead
    document.getElementById('home-button').setAttribute('disabled', true);
    document.getElementById('about-button').setAttribute('disabled', true);
    document.getElementById('project-button').setAttribute('disabled', true);
    document.getElementById('link-button').setAttribute('disabled', true);

    document.getElementById('home-button').style.animation = "";
    document.getElementById('about-button').style.animation = "";
    document.getElementById('project-button').style.animation = "";
    document.getElementById('link-button').style.animation = "";
}

function enable_all_buttons(){
    document.getElementById('home-button').removeAttribute('disabled');
    document.getElementById('about-button').removeAttribute('disabled');
    document.getElementById('project-button').removeAttribute('disabled');
    document.getElementById('link-button').removeAttribute('disabled');
}

function highlight_button(button_id){
    const button_change = document.getElementById(button_id);
    button_change.style.animation = "pulsefire 1.5s linear infinite";

    if (volume_on){
        norm_button_sfx.play();
    }
}