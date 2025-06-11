let header;
const YaxisPivot = 68;

export default header = {
    init : function() {
        header = document.querySelector("header");

        window.addEventListener('scroll', update_header);
    }
}

function update_header() {
    if(window.scrollY > YaxisPivot) {
        header.classList.add("black-background");
    } else {
        header.classList.remove("black-background");
    }
}