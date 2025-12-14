function HeaderPage() {
    const YaxisPivot = 68;

    React.useEffect(() => {
        let header = document.querySelector("header");

        const update_header = () => {
            if(window.scrollY > YaxisPivot) {
                header.classList.add("black-background");
            } else {
                header.classList.remove("black-background");
            }
        };
        
        window.addEventListener('scroll', update_header);
    });

    return (
        <header className="container d-flex flex-row align-items-center fixed-top py-4 bg-transparent">
            <Signature />
            <nav className="navbar p-0 px-4">
                <ul id="head-nav" className="navbar-nav flex-row flex-grow-1">
                    {pages.map((page) => (
                    <li className="nav-item" key={page.key} >
                        <LinkPage page={page} classes="nav-link" />
                    </li>
                    ))}
                </ul>
            </nav>
            <SideBarButton />
        </header>
    );
}

function Signature() {

    let href = "../index.html";

    if(body.id === "page-main") {
        href = "index.html";
    }

    return (
        <a id="signature" className="navbar-brand w-100 mx-4" href={href}>
            {/* img src="assets/images/profil-signature.gif" alt="Logo" className="-inline-block align-text-top" */}
            Aëlig Jimenez
        </a>
    );
}

// Global expose
window.HeaderPage = HeaderPage;
window.Signature = Signature;