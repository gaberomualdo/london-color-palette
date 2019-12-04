// set color format
let colorFormat = localStorage.getItem("london-color-palette-color-format");
if(!colorFormat || (colorFormat != "hex" && colorFormat != "hex_no_hash" && colorFormat != "rgb" && colorFormat != "rgba")) {
    colorFormat = "hex";
}

// set selected color format
document.querySelector(".topbar__color-format .select-input option[value=" + colorFormat + "]").setAttribute("selected", "true");

function changeColorFormat(newValue) {
    colorFormat = newValue;
    localStorage.setItem("london-color-palette-color-format", colorFormat);
}

// convert from hex to various formats
// some code taken from user Tim Down on https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function convertHexToFormat(hexValue, format) {
    switch(format) {
        case "hex":
            return hexValue;
            break;
        case "hex_no_hash":
            return hexValue.split("").slice(1).join("");
            break;
        case "rgb":
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
            return result ? 
                "rgb(" + parseInt(result[1], 16) + ", " + 
                parseInt(result[2], 16) + ", " +
                parseInt(result[3], 16) + ")"
             : null;
            break;
        case "rgba":
            const rgb = convertHexToFormat(hexValue, "rgb");
            return rgb.split("").slice(0, rgb.length - 1).join("") + ", 255)";
            break;
        default:
            return null;
    }
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
        // create 5 light colors and 5 dark colors using the pSBC function and store in arrays
        let colorLightList = [];
        for(let i = 0; i < 5; i++) {
            colorLightList.push({hex: pSBC(.175 * (i + 1), color.hex), opacityNumber: 5 - (1 * i)});
        }
        
        let colorDarkList = [];
        for(let i = 0; i < 5; i++) {
            colorDarkList.push({hex: pSBC(-.2 * i, color.hex), opacityNumber: 6 + (1 * i)});
        }
        colorDarkList.reverse();
        
        // convert list of dark and light colors into markup of color lists
        const getColorListColorHTML = (colorHex, opacityNumber) => {
            return `<div class="app__color-colors-list-color" onclick="copyColorFromBtn('${colorHex}', this);" style="--current-color: ${colorHex}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>
                <p class="app__color-colors-list-color--opacity">${opacityNumber}</p>
            </div>`;
        }

        // both lists combined
        let colorCombinedList = colorDarkList.concat(colorLightList);

        // split into two rows
        let row1 = [];
        let row2 = [];

        for (let i = 0; i < colorCombinedList.length; i++){
            if ((i + 2) % 2 == 0) {
                row1.push(colorCombinedList[i]);
            }
            else {
                row2.push(colorCombinedList[i]);
            }
        }

        console.log(row1);
        console.log(row2);

        const colorRow1HTML = row1.map(e => getColorListColorHTML(e.hex, e.opacityNumber)).join("\n");
        const colorRow2HTML = row2.map(e => getColorListColorHTML(e.hex, e.opacityNumber)).join("\n");
        
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
                        ${colorRow1HTML}
                    </div>
                    <div class="app__color-colors-list">
                        ${colorRow2HTML}
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
    const valueToCopy = convertHexToFormat(colorHex, colorFormat);
    copyTextToClipboard(valueToCopy);
}