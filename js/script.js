// initialize awselect on all default select elements
$(document).ready(() => {
    $(".select-input").awselect({
        background: "#455A64",
        active_background: "#263238",
        placeholder_color: "#ffffff",
        placeholder_active_color: "#ffffff",
        option_color: "#ffffff",
        vertical_padding: "6px",
        horizontal_padding: "15px",
        immersive: false
    });
});