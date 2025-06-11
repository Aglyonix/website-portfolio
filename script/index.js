import sidebar from "./side-bar.js";
import header from "./header.js";
import style from "./style.js";
import nav from "./nav.js";

document.addEventListener("DOMContentLoaded", () => {
    sidebar.init();
    header.init();
    style.init();
    nav.init();
})