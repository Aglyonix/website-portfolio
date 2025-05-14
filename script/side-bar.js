const url = "http://127.0.0.1:5500/assets/svg/expand-sidebar.json";
let toggle; let sidebar;

export function init_sidebar_button() {

    sidebar = document.getElementById("navigation-sidebar-mobile");
    sidebar.setAttribute("data-expanded", false);

    toggle = document.getElementById("side-bar-button");
    toggle.addEventListener('click', expand_sidebar);

    let path = toggle.querySelector("svg path:first-child");

    fetch(url).then(response => response.json()).then(json => {
        path.setAttribute("d", json.false);
    })
}

export function expand_sidebar() {

    fetch(url).then(response => response.json()).then(json => {

        let path = toggle.querySelector("svg path:first-child");

        if(sidebar.dataset.expanded == "false") {
            path.setAttribute("d", json.true);
            sidebar.dataset.expanded = true;
        } else {
            path.setAttribute("d", json.false);
            sidebar.dataset.expanded = false;
        }
    })
}