import InnerNavigation from "./inner_nav.js";

const nav = {

    init : function() {
        let table = document.getElementById("table-of-contents-additional");
        let navs = document.querySelectorAll(".inner-nav");

        navs.forEach((nav) => {
            new InnerNavigation(nav, table);
        })
    }
}

export default nav;