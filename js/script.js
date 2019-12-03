// set color format
let colorFormat = localStorage.getItem("london-color-palette-color-format");
if(!colorFormat || (colorFormat != "hex" && colorFormat != "hex_no_hash" && colorFormat != "rgb" && colorFormat != "rgba")) {
    colorFormat = "hex";
}

// set selected
document.querySelector(".topbar__color-format .select-input option[value=" + colorFormat + "]").setAttribute("selected", "true");

function changeColorFormat(newValue) {
    colorFormat = newValue;
    localStorage.setItem("london-color-palette-color-format", colorFormat);
}

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

// add colors
(() => {
    colors.forEach((color) => {
        console.log(color);
        // create 5 light colors and 5 dark colors using the pSBC function and store in arrays
        let colorLightList = [];
        for(let i = 0; i < 5; i++) {
            colorLightList.push(pSBC(.175 * (i + 1), color.hex));
        }
        
        let colorDarkList = [];
        for(let i = 0; i < 5; i++) {
            colorDarkList.push(pSBC(-.2 * i, color.hex));
        }
        colorDarkList.reverse();
        
        // convert list of dark and light colors into markup of color lists
        const getColorListColorHTML = (colorHex) => {
            return `<div class="app__color-colors-list-color" onclick="copyColorFromBtn('${colorHex}', this);" style="--current-color: ${colorHex}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>
            </div>`;
        }

        const colorLightListHTML = colorLightList.map(e => getColorListColorHTML(e)).join("\n");
        const colorDarkListHTML = colorDarkList.map(e => getColorListColorHTML(e)).join("\n");

        console.log(colorLightListHTML);
        
        // add complete markup with generated dark and light markup to parent element
        document.querySelector(".app__palette").innerHTML += `
        <div class="app__palette-color">
            <div class="app__color-image-container">
                <div class="app__color-image-container--color" style="--main-color: ${color.hex};"></div>
                <div class="app__color-image-container--image" style="--color-gradient: linear-gradient(to bottom right, ${pSBC ( 0, color.hex + "aa", "c" )}, ${pSBC ( 0, color.hex + "aa", "c" )}); --image-path: url('${color.imagePath}');"></div>
            </div>
            <div class="app__color-content">
                <div class="app__color-top-area">
                    <p class="app__color-description">${color.description}</p>
                    <h1 class="app__color-title">${color.name}</h1>
                </div>
                <div class="app__color-main-palette">
                    <div class="app__color-colors-list">
                        ${colorDarkListHTML}
                    </div>
                    <div class="app__color-colors-list">
                        ${colorLightListHTML}
                    </div>
                </div>
            </div>
        </div>`;
    });
})();

// copy color btn onclick
const copyColorFromBtn = (colorHex, button) => {
    // remove any existing clicking attributes
    button.removeAttribute("click-id");
    button.classList.remove("app__color-colors-list-color--clicking");

    // add clicking attribute
    button.classList.add("app__color-colors-list-color--clicking");
    
    // clickID is used to verify that no other click has occurred when removing class "clicking" in 500ms
    const clickID = Math.floor(Math.random() * 1000000000);
    button.setAttribute("click-id", clickID);

    // remove "clicking" class and clickID after 500ms
    setTimeout(() => {
        if(button.getAttribute("click-id") == clickID) {
            button.classList.add("app__color-colors-list-color--clicked");
            button.classList.remove("app__color-colors-list-color--clicking");
            setTimeout(() => { button.classList.remove("app__color-colors-list-color--clicked"); }, 50);
            button.removeAttribute("click-id");
        }
    }, 1000);

    // copy color to clipboard
    copyTextToClipboard(colorHex);
}