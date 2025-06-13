const url = "http://127.0.0.1:5500/assets/svg/expand-sidebar.json";
let sidebar;
let toggle; let bar;

export default sidebar = {

    init : function() {

        bar = document.getElementById("navigation-sidebar-mobile");
        bar.setAttribute("data-expanded", false);

        toggle = document.getElementById("side-bar-button");
        toggle.addEventListener('click', expand_sidebar);

        let path = toggle.querySelector("svg path:first-child");

        fetch(url).then(response => response.json()).then(json => {
            path.setAttribute("d", json.false);
        })
    }
}

function expand_sidebar() {

    fetch(url).then(response => response.json()).then(json => {

        let path = toggle.querySelector("svg path:first-child");

        if(bar.dataset.expanded == "false") {
            path.setAttribute("d", json.true);
            bar.dataset.expanded = true;
        } else {
            path.setAttribute("d", json.false);
            bar.dataset.expanded = false;
        }
    })
}