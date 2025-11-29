function SideBar() {

    React.useEffect(() => {
        const url = svg_dir + "expand-sidebar.json";
        const container = document.getElementById("container-sidebar-mobile");
        const bar = document.getElementById("navigation-sidebar-mobile");
        const toggle = document.getElementById("side-bar-button");

        const close_sidebar = () => {
            fetch(url).then(response => response.json()).then(json => {
                let path = toggle.querySelector("svg path:first-child");

                path.setAttribute("d", json.false);
                bar.dataset.expanded = false;
            });
        };

        const observer = new MutationObserver(() => {
            const links = container.querySelectorAll("ul a");
            links.forEach((link) => {
                link.removeEventListener("click", close_sidebar);
                link.addEventListener("click", close_sidebar);
            });
        });

        observer.observe(container, {childList: true, subtree: true});
        return () => observer.disconnect();
    }, []);

    return (
		<nav id="navigation-sidebar-mobile" className="flex-column flex-nowrap">
            <section id="container-sidebar-mobile" className="d-flex flex-column flex-nowrap gap-2">
                {pages.map((page) => (
                <li className="mb-2" key={page.key}>
                    <LinkPage page={page} table={true} />
                </li>
                ))}
            </section>
            <footer className="flex-column flex-nowrap align-itmes-start mb-3">
                <Credit />
                <SocialNetworks />
            </footer>
        </nav>
    );
}

function SideBarButton() {

    const url = svg_dir + "expand-sidebar.json";

    React.useEffect(() => {
        let bar = document.getElementById("navigation-sidebar-mobile");
        bar.setAttribute("data-expanded", false);

        let toggle = document.getElementById("side-bar-button");

        const expand_sidebar = () => {
            fetch(url).then(response => response.json()).then(json => {

                let path = toggle.querySelector("svg path:first-child");

                if(bar.dataset.expanded == "false") {
                    path.setAttribute("d", json.true);
                    bar.dataset.expanded = true;
                } else {
                    path.setAttribute("d", json.false);
                    bar.dataset.expanded = false;
                }
            });
        };

        toggle.addEventListener('click', expand_sidebar);

        let path = toggle.querySelector("svg path:first-child");

        fetch(url).then(response => response.json()).then(json => {
            path.setAttribute("d", json.false);
        });

    }, []);

    return (
        <button id="side-bar-button" type="button">
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" fillRule="evenodd" />
            </svg>
        </button>
    );
}

// Global expose
window.SideBar = SideBar;
window.SideBarButton = SideBarButton;