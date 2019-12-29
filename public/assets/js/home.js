// event fire fn, code taken from user Kooilnc from https://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
const fireEvent = (el, etype) => {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    }else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

// display palette cards
palettes.forEach((palette) => {
    if(palette.type == "city") {
        document.querySelector(".tabs__sections-section--cities").innerHTML += `
        <a class="card" href="${palette.directory}">
            <div class="card__image-container">
                <img src="${palette.imagePath}" alt="${palette.name} Image">
            </div>
            <div class="card__content card__content--city">
                <h1 class="card__content-title">${palette.name}</h1>
                <p>
                    <span>${palette.flag}</span>
                    <strong>${palette.location}</strong>
                </p>
                <p>
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"/></svg></span>
                    <strong>${palette.population}</strong>
                </p>
                <p>
                    <span><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M6 7v-7h13v10h5v14h-23v-17h5zm0 16v-4h-1v4h1zm8-4h-3v4h3v-4zm6 0h-1v4h1v-4zm2-7h-3v6h2v4h1v-10zm-5-10h-9v20h1v-5h7v5h1v-20zm-13 20v-4h2v-9h-3v13h1zm17-6h-1v-2h1v2zm-17-2h1v2h-1v-2zm8 1h-2v-2h2v2zm3 0h-2v-2h2v2zm-10-4v2h-1v-2h1zm7 1h-2v-2h2v2zm3 0h-2v-2h2v2zm-3-3h-2v-2h2v2zm3 0h-2v-2h2v2zm-3-3h-2v-2h2v2zm3 0h-2v-2h2v2z"/></svg></span>
                    <strong>${palette.landmarks}</strong>    
                </p>
            </div>
        </a>
        `;
    }else if(palette.type == "color") {
        document.querySelector(".tabs__sections-section--colors").innerHTML += `
        <a class="card" href="${palette.directory}">
            <div class="card__image-container">
                <img src="${palette.imagePath}" alt="${palette.name} Image">
            </div>
            <div class="card__content card__content--color">
                <h1 class="card__content-title">${palette.name}</h1>
                <p>
                    <strong><span>Represents:</span>${palette.represents}</strong>
                </p>
                <p>
                    <strong><span>Used by:</span>${palette.used_by}</strong>
                </p>
                <p>
                    <strong><span>Cities:</span>${palette.cities}</strong>    
                </p>
            </div>
        </a>
        `;
    }
});

// tab functionality
Array.from(document.querySelectorAll(".tabs__tabselect-button")).forEach((tabBtn) => {
    tabBtn.addEventListener("click", (e) => {
        const removeActiveClassesOnTabsContainer = () => {
            document.querySelector(".tabs").classList.remove("tabs--show-cities");
            document.querySelector(".tabs").classList.remove("tabs--show-colors");
            document.querySelector(".tabs").classList.remove("tabs--show-about");
            window.location.hash = "";
        }

        const btn = e.target;
        if(btn.classList.contains("tabs__tabselect-button--cities")) {
            removeActiveClassesOnTabsContainer();
            document.querySelector(".tabs").classList.add("tabs--show-cities");
            window.location.hash = "#cities";
        }else if(btn.classList.contains("tabs__tabselect-button--colors")) {
            removeActiveClassesOnTabsContainer();
            document.querySelector(".tabs").classList.add("tabs--show-colors");
            window.location.hash = "#colors";
        }else if(btn.classList.contains("tabs__tabselect-button--about")) {
            removeActiveClassesOnTabsContainer();
            document.querySelector(".tabs").classList.add("tabs--show-about");
            window.location.hash = "#about";
        }
    });
});

// tab hash functionality
switch (window.location.hash) {
    case "#cities":
        fireEvent(document.querySelector(".tabs__tabselect-button--cities"), "click");
        break;
    case "#colors":
        fireEvent(document.querySelector(".tabs__tabselect-button--colors"), "click");
        break;
    case "#about":
        fireEvent(document.querySelector(".tabs__tabselect-button--about"), "click");
        break;
    default:

}

// tab select box sticky top position
let tabSelectElementOriginalOffsetTop;
const checkTabSelectPositionTypeFirstTime = () => {
    const tabSelectElement = document.querySelector(".tabs__tabselect");
    tabSelectElementOriginalOffsetTop = tabSelectElement.getBoundingClientRect().top + window.scrollY;
    checkTabSelectPositionType();
}

const checkTabSelectPositionType = () => {
    const tabSelectElement = document.querySelector(".tabs__tabselect");
    console.log("body scrolltop: " + window.pageYOffset);
    console.log("original: " + tabSelectElementOriginalOffsetTop);
    if(window.pageYOffset >= tabSelectElementOriginalOffsetTop) {
        tabSelectElement.classList.add("fixed");
    }else {
        tabSelectElement.classList.remove("fixed");
    }
}
window.addEventListener("scroll", checkTabSelectPositionType);
checkTabSelectPositionTypeFirstTime();