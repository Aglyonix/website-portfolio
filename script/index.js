import sidebar from "./Modules/side-bar.js";
import header from "./Modules/header.js";
import style from "./Modules/style.js";
import nav from "./Modules/nav.js";

document.addEventListener("DOMContentLoaded", () => {
    sidebar.init();
    header.init();
    style.init();
    nav.init();
})