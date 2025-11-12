// ------------------------------------------------------------------------ Apps ------------------------------------------------------------------------ //

const app = document.getElementById('app');
const body = document.getElementsByTagName('body')[0];
const root = ReactDOM.createRoot(app);
root.render(<App />);

function App() {
    return ( <AppAssembler /> );
}

function AppAssembler() {

    let main = <MainPage />;

    if(body.id === "page-bio") {
        main = <BioPage />;
    }

    if(body.id === "page-projects") {
        main = <ProjectsPage />;
    }

    return (
        <>
            <HeaderPage />
            {main}
            <FooterPage />
            <SideBar />
        </>
    );
}

// ---------------------------------------------------------------------- Settings ---------------------------------------------------------------------- //

const pages = [
    { key: "page.-00000",  name: "Bio",      path: "bio.html",       table: "bio-nav.json",  active: body.id === "page-bio" },
    { key: "page.-00001",  name: "Projets",  path: "projects.html",  table: "",              active: body.id === "page-projects" },
    { key: "page.-00002",  name: "Contact",  path: "contact.html",   table: "",              active: body.id === "page-contact" }
];

const breaks = [
    {attr: "content-sm"},
    {attr: "content-md"},
    {attr: "content-lg"},
    {attr: "content-xl"},
    {attr: "content-xxl"}
];

const root_url = body.id === "page-main" ? "view/" : "";
const asset_dir = body.id === "page-main" ? "assets/" : "../assets/";
const icon_dir = asset_dir + "icons/";
const json_dir = asset_dir + "json/";
const svg_dir = asset_dir + "svg/";
const img_dir = asset_dir + "images/";

const iconMap = {
    VideoGameIcon: (width, height) => <VideoGameIcon width={width} height={height} />,
    ProblemSolvingIcon: (width, height) => <ProblemSolvingIcon width={width} height={height} />,
    MangaIcon: (width, height) => <MangaIcon width={width} height={height} />,
    ShareIcon: (width, height) => <ShareIcon width={width} height={height} />,
    ExperiencesIcon: (width, height) => <ExperiencesIcon width={width} height={height} />,
    CertificatesIcon: (width, height) => <CertificatesIcon width={width} height={height} />,
    TechStackIcon: (width, height) => <TechStackIcon width={width} height={height} />,
    FilterIcon: (width, height) => <FilterIcon width={width} height={height} />,

    CppIcon: (width, height) => <CppIcon width={width} height={height} />,
    CSharpIcon: (width, height) => <CSharpIcon width={width} height={height} />,
    JavaIcon: (width, height) => <JavaIcon width={width} height={height} />,
    PythonIcon: (width, height) => <PythonIcon width={width} height={height} />,
    DjangoIcon: (width, height) => <DjangoIcon width={width} height={height} />,
    AndroidIcon: (width, height) => <AndroidIcon width={width} height={height} />,
    SQLIcon: (width, height) => <SQLIcon width={width} height={height} />,
    HTMLIcon: (width, height) => <HTMLIcon width={width} height={height} />,
    CSSIcon: (width, height) => <CSSIcon width={width} height={height} />,
    BootstrapIcon: (width, height) => <BootstrapIcon width={width} height={height} />,
    JavaScriptIcon: (width, height) => <JavaScriptIcon width={width} height={height} />,
    PHPIcon: (width, height) =><PHPIcon width={width} height={height} />,
    SymfonyIcon: (width, height) => <SymfonyIcon width={width} height={height} />,
    TwigIcon: (width, height) => <TwigIcon width={width} height={height} />
};

const bioMap = {
    ExperiencePane: <ExperiencePane />,
    CertificatesPane: <CertificatesPane />,
    TechStackPane: <TechStackPane />
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------ Main ------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ------------------------------------------------------------------------ Main ------------------------------------------------------------------------ //

function MainPage() {
    return (
        <main role="main">
            <Banner />
        </main>
    );
}

// ---------------------------- Banner

function Banner() {
    return (
        <section id="banner" className="d-flex flex-column justify-content-center">
            <div className="container-xxl h-100">
                <div id="inner-banner" className="h-100 d-flex flex-nowrap align-items-center justify-content-center">
                    <ProfilImage />
                    <ProfilShowcase />
                </div>
            </div>
        </section>
    );
}

function ProfilImage() {
    let src = img_dir + "me-portrait.jpg";

    return (
        <picture id="profil-image" className="rounded">
            <img src={src} alt="Me"/>
        </picture>
    );
}

function ProfilShowcase() {
    return (
        <div id="profil-showcase" className="d-flex flex-column flex-nowrap align-items-center justify-content-center">
            <h1 className="lexend">Aëlig Jimenez</h1>
            <p className="lexend">Développeur &nbsp;•&nbsp; Application &nbsp;•&nbsp; Web &nbsp;•&nbsp; Jeux Vidéo</p>
            <nav className="container d-flex flex-row flex-nowrap align-items-center justify-content-evenly">
                <GithubIcon attr="focus-link" />
                <LinkedinIcon attr="focus-link" />
            </nav>
        </div>
    );
}

// ------------------------------------------------------------------------ Bio ------------------------------------------------------------------------ //

// ---------------------------- Bio Main

function BioPage() {
    return (
        <main role="main">
            <BioHeader />
            <BioMain />
        </main>
    );
}

function BioHeader() {
    return (
        <header className="d-flex flex-column flex-nowrap align-items-start justify-content-center gap-2 h-100 page-title">
            <h1 className="lexend">Bio — A Propos de Aëlig</h1>
            <p className="lexend">Explorez mes centres intérêts, mes projets et mes passions !</p>
        </header>
    );
}

function BioMain() {
    return (
        <main id="content" className="container my-5">
            <BioContent />
        </main>
    );
}

// ---------------------------- Content

function BioContent() {

    return (
        <article className="d-flex flex-column flex-nowrap align-items-center gap-5">
            <BioAboutMe />
            <BioInterest />
            <BioShowcase />
        </article>
    );
}

// ---------------------------- Content Showcase

function BioShowcase() {
    return (
        <section id="showcase" className="w-100">
            <h1 className="lexend w-100 text-center">Showcase</h1>
            <BioShowcaseNav />
            <BioShowcaseContent />
        </section>
    );
}

function BioShowcaseNav() {
    const url = json_dir + "bio-nav.json";
    const [items, setItems] = React.useState(null);
    
    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        const items = json["items"];
        return items;
    };

    React.useEffect(() => {
        fetchItems().then(result => setItems(result));
    }, []);

    return (
        <div className="card w-100 mb-5">
            <div className="card-body">
                <ul className="nav nav-pills nav-fill" role="tablist">
                    {items ? items.map((item, index) => (
                    <BioShowcaseNavItem item={item} index={index} key={item.key} />
                    )) : <></>}
                </ul>
            </div>
        </div>
    );
}

function BioShowcaseNavItem({ item }) {
    
    let attr = "nav-link nav-link-main";
    attr = item.active ? attr + " active" : attr;

    React.useEffect(() => {
        let btn = document.querySelector("#" + item.idname);

        btn.addEventListener("click", () => {
            var target = document.querySelector("#container-sidebar-mobile ul#table-" + item.target + "[role=tabpanel]");
            var others = document.querySelectorAll("#container-sidebar-mobile ul:not(#table-" + item.target + ")[role=tabpanel]");

            others.forEach((element) => {
                element.classList.remove("show", "active");
            });

            target.classList.add("show", "active");
        });
    }, [])
    
    return (
        <li className="nav-item" role="presentation">
            <button id={item.idname} className={attr} data-bs-toggle="tab" data-bs-target={"#" + item.target} type="button" role="tab" aria-controls={item.target} aria-selected={item.active}>
                <div className="d-flex flex-row flex-nowrap align-items-center justify-content-center gap-3">
                    {iconMap[item.icon](32, 32)}
                    {item.name}
                </div>
            </button>
        </li>
    );
}

// ---------------------------- Content

function BioShowcaseContent() {
    const url = json_dir + "bio-nav.json";
    const [items, setItems] = React.useState(null);
    
    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        const items = json["items"];
        return items;
    };

    React.useEffect(() => {
        fetchItems().then(result => setItems(result));
    }, []);

    let attr = "tab-pane fade";

    return (
        <section className="tab-content w-100 px-3">
            {items ? items.map((item) => (
                <article key={item.key + "-panel"} id={item.target} className={item.active ? attr + " show active" : attr} role="tabpanel" aria-labelledby={item.idname}>
                    {bioMap[item.react]}
                </article>
            )) : null}
        </section>
    );
}

// ---------------------------- Content Small

function BioAboutMe() {
    return (
        <section id="about-me" className="w-100">
            <h1 className="lexend w-100 text-center">A propos</h1>
            <p className="lexend w-100 text-center">
                Je suis Aëlig Jimenez,
                je suis étudiant 2e année à l’IUT de Paris-Saclay.
                Je suis un grand passionné par l'informatique, et surtout par la programmation,
                l'algorithmique et les jeux vidéo
            </p>
            <div className="d-flex flex-row flex-nowrap justify-content-evenly gap-3 w-100">
                <CVButton />
                <ProjectsLinkButton />
            </div>
        </section>
    );
}

function BioInterest() {
    return (
        <section id="interests" className="w-100">
            <h1 className="lexend w-100 text-center">Centre d'intérêts</h1>
            <div className="content-sm">
                <ListGroupWallet id="interests-list" json="interest.json" />
            </div>
            <div className="content-md">
                <BioInterestMedium />
            </div>
            <div className="content-lg">
                <BioInterestLarge />
            </div>
        </section>
    );
}

function BioInterestMedium() {
    const url = json_dir + "interest.json";
    const [items, setItems] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const columns = 2; 

    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        const items = json["items"];
        return items;
    };

    React.useEffect(() => {
        fetchItems().then(result => setItems(result));
    }, []);

    React.useEffect(() => {
        if (items) {
            const pack = []
            for (var i = 0; i < items.length;) {
                const row = [];
                
                for (var w = 0; w < columns; w++) {
                    let item = items[i];
                    row.push(<BioInteresMediumItem item={item} key={item.key + "-md"} />);
                    i++;
                }

                pack.push(<div className="card-group" key={"interests-md-row-" + i}>{row}</div>);
            }
            setRows(pack);
        }
    }, [items]);

    return (
        <div className="card-pack">
            {rows}
        </div>
    );
}

function BioInteresMediumItem({ item }) {
    return (
        <div className="card text-center shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-center">
                {item.desc}
            </div>
            <div className="card-footer d-flex align-items-center justify-content-center gap-2">
                {iconMap[item.icon] ? iconMap[item.icon](20, 20) : null}
                {item.name}
            </div>
        </div>
    );
}

function BioInterestLarge() {
    const url = json_dir + "interest.json";
    const [items, setItems] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const columns = 2; 
    
    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        const items = json["items"];
        return items;
    };

    React.useEffect(() => {
        fetchItems().then(result => setItems(result));
    }, []);

    React.useEffect(() => {
        if (items) {
            const pack = []
            for (var i = 0; i < items.length;) {
                const row = [];
                
                for (var w = 0; w < columns; w++) {
                    let item = items[i];
                    row.push(<BioInteresLargeItem item={item} key={item.key + "-lg"} />);
                    i++;
                }

                pack.push(<div className="card-pack row" key={"interests-lg-row-" + i}>{row}</div>);
            }
            setRows(pack);
        }
    }, [items]);

    return (
        <div className="card-pack">
            {rows}
        </div>
    );
}

function BioInteresLargeItem({ item }) {
    return (
        <div className="card-group bio-interest-card">
            <div className="card text-center shadow-sm">
                <div className="card-body d-flex align-items-center justify-content-center">
                    {iconMap[item.icon] ? iconMap[item.icon](32, 32) : null}
                </div>
                <div className="card-footer">
                    {item.name}
                </div>
            </div>
            <div className="card text-center shadow-sm">
                <div className="card-body d-flex align-items-center justify-content-center">
                    {item.desc}
                </div>
            </div>
        </div>
    );
}

// ---------------------------- Content Small Panes

// Experience Content
function ExperiencePane() {
    const head = (item) => <BioShowcaseItemHead item={item} />;
    const body = (item) => <BioShowcaseItemBody item={item} />;

    return(
        <>
            <section id="education">
                <h1 className="lexend w-100 text-center mb-3">Education</h1>
                <div className="content-sm">
                    <ListGroupWallet id="education-list-sm" json="education.json" body={body} head={head} />
                </div>
                <div className="content-lg d-flex flex-row gap-2">
                    <ListGroupWallet id="education-list-lg" json="education.json" body={body} head={head} groups="2" />
                </div>
            </section>
            <section id="experience">
                <h1 className="lexend w-100 text-center mt-5 mb-3">Experience</h1>
                <div className="content-sm">
                    <ListGroupWallet id="experience-list-sm" json="experience.json" body={body} head={head} />
                </div>
                <div className="content-lg d-flex flex-row gap-2">
                    <ListGroupWallet id="experience-list-lg" json="experience.json" body={body} head={head} groups="2" />
                </div>
            </section>
        </>
    );
}

function BioShowcaseItemHead({ item }) {
    let entity = item.entity;
    let src = img_dir + entity.img;

    return (
        <>
            <h1>{item.title}</h1>
            <div className="d-flex flex-row entity">
                <div className="col p-0">
                    <p className="text-muted mb-0">{entity.name}</p>
                    <small className="text-muted">{item.date}</small>
                </div>
                <div href={entity.href} className="entity rounded">
                    <img src={src} className="img-fluid float-end" alt={entity.name} />
                </div>
            </div>
        </>
    );
}

function BioShowcaseItemBody({ item }) {
    return (
        <>
            <p className="mb-0">{item.caption}</p>
            <ul className="list-group list-group-flush gap-1 mt-2" >
                {item.details ? item.details.map((detail) => (
                    <BioShowcaseListItem detail={detail} key={item.key + "-" + detail.key}/>
                )) : null}
            </ul>
        </>
    );
}

function BioShowcaseListItem({ detail }) {
    return (
        <li className="list-group-item border-0 p-0">
            {detail.text}
            {detail.muted ? <span className="text-muted"> {detail.muted}</span> : <></> }
            {detail.light ? <span className="text-main"> {detail.light}</span> : <></> }
        </li>
    );
}

// Certificates Content
function CertificatesPane() {
    return(
        <>
            <h1 id="certificates" className="lexend w-100 text-center mb-3">Diplômes</h1>
            <div className="d-flex w-100 justify-content-center">
                <CardCarousel id="carousel-certificates" json="certificate.json" />
            </div>
        </>
    );
}

// Certificates Content
function TechStackPane() {
    const card = (item) => <TechStackCard item={item} key={item.key} />;

    return(
        <>
            <h1 id="tech-stacks" className="lexend w-100 text-center mb-3">Tech Stack</h1>
            <CardGrid id="tech-stacks-grid" json="tech-stack.json" card={card} />
        </>
    );
}

function TechStackCard({ item }) {
    return (
        <div className="card h-100 text-center shadow-sm">
            <div className="card-body">
                {iconMap[item.icon] && iconMap[item.icon](96, 96)}
            </div>
            <div className="card-footer">
                <h6 className="card-title mt-2">{item.title}</h6>
            </div>
        </div>
    );
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------ Base ------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------------------------------------------------------------------------ //

// ---------------------------- Headers

// Main Header
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
        <a id="signature" className="navbar-brand mx-4" href={href}>
            {/* img src="assets/images/profil-signature.gif" alt="Logo" className="-inline-block align-text-top" */}
            Aëlig Jimenez
        </a>
    );
}

// ---------------------------- Footer

function FooterPage() {
    return (
        <footer className="w-100 align-items-center">
            <article className="col">
                <Credit />
                <SocialNetworks />
            </article>
            <article className="col">
                <section id="message" className="row">
                    <p className="lexend text-end">Site entièrement codé de mes mains</p>
                    <p className="lexend text-end">Amusez-vous à ajuster la taille du site, il s'adaptera</p>
                </section>
            </article>
        </footer>
    );
}

// ---------------------------- Side Bar

// Button
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

// Side Bar
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

// ------------------------------------------------------------------------ Projects ------------------------------------------------------------------------ //

function ProjectsPage() {
    return (
        <main role="main">
            <ProjectsHeader />
            <ProjectsMain />
        </main>
    );
}

function ProjectsHeader() {
    return (
        <header className="d-flex flex-column flex-nowrap align-items-start justify-content-center gap-2 h-100 page-title">
            <h1 className="lexend">Projets — Mon univers</h1>
            <p className="lexend">Explorez les empreintes que je livre au monde !</p>
        </header>
    );
}

function ProjectsMain() {
    const [query, setQuery] = React.useState("");
    const [vedette, setVedette] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const url = json_dir + "projects.json";
    
    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        setVedette(json.vedette);
        setItems(json.items);
    };

    async function fetchTags() {
        const response = await fetch(json_dir + "filter.json");
        const json = await response.json();
        setTags(json.tags);
    };

    React.useEffect(() => {
        fetchItems();
    }, []);

    /*React.useEffect(() => {
        const btn = document.getElementById("filter-btn");
        const filter = document.getElementById("filter-container");
        const project = document.getElementById("vedette");
        const container = document.getElementById("project-top-content");
        const padding = 32;

        filter.setAttribute("data-expanded", false);
        project.setAttribute("data-expanded", false);

        const expand_filter = () => {
            if(filter.dataset.expanded == "false") {
                filter.dataset.expanded = true;
                project.dataset.expanded = false;
            } else {
                filter.dataset.expanded = false;
                project.dataset.expanded = true;
            }

            const active = filter.dataset.expanded === "true" ? filter : project;
            container.style.height = (active.offsetHeight + padding) + "px";
        };

        btn.addEventListener('click', expand_filter);
        console.log();
    }, [])*/

    const filtered = items.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );
    const LargeCard = (item) => <ProjectItemLarge item={item} key={item.key} />;
    const MediumCard = (item) => <ProjectItemMedium item={item} key={item.key} />;
    const SmallCard = (item) => <ProjectItemSmall item={item} key={item.key} />;
    const cards = [SmallCard, MediumCard, MediumCard, LargeCard, LargeCard];

    return (
        <main id="content" className="container my-5">
            <h1 className="mb-4">Mes projets</h1>

            {/* Barre de recherche */}
            <section className="d-flex flex-row align-items-center gap-4 mb-5">
                <div id="filter-btn" type="button" data-bs-toggle="collapse" data-bs-target=".top-content" aria-expanded="false" aria-controls="filter-container vedette">
                    {iconMap["FilterIcon"](32, 32)}
                </div>
                <input type="text" className="form-control" placeholder="Rechercher un projet..." value={query} onChange={e => setQuery(e.target.value)} />
            </section>

            <section id="project-top-content">
                {/* Filter */}
                <section id="filter-container" className="collapse top-content px-3 bg-white">
                    <p className="lexend">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </section>
                {/* Projet vedette */}
                <section id="vedette" className="collapse show top-content px-3">
                    <div className="content-sm">
                        {vedette && (<ProjectItemVedetteSmall item={vedette} />)}
                    </div>
                    <div className="content-md">
                        {vedette && (<ProjectItemVedette item={vedette} />)}
                    </div>
                </section>
            </section>

            {/* Grille des autres projets */}
            <section className="px-3">
                {filtered && <CardGrid id="projects-grid" objects={filtered} card={cards} columns={[1, 1, 2, 2, 2]} />}
            </section>
        </main>
    );
}

// ---------------------------- Project Item

function ProjectItemVedette({ item }) {
    return (
        <div className="card project-card h-100">
            <div className="card-body position-relative d-flex flex-row gap-3">
                <div className="card-content">
                    <div className="project-catgs mt-4">
                        {item.domains.map((domain, index) =>
                            <span className="badge rounded-pill bg-light text-muted" key={item.key + "-domain-" + index}>
                                {domain}
                            </span>
                        )}
                    </div>
                    <div className="project-authors mt-4">
                        {item.authors.map((author, index) =>
                            <span className="lexend text-muted" key={item.key + "-author-" + index}>
                                {index != 0 ? "•" : null} {author}
                            </span>
                        )}
                    </div>
                    <div className="my-auto">
                        <p className="project-title lexend h1 my-2">{item.title}</p>
                        <p className="project-text text-muted my-2">{item.description}</p>
                        <div className="project-tags mt-4">
                            {item.tags.map((tag, index) =>
                                <span className="badge rounded-pill bg-light text-muted" key={item.key + "-tag-" + index}>
                                    {tag}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <img src={img_dir + item.image} alt={item.title} className="project-img rounded"/>
            </div>
        </div>
    );
}

function ProjectItemVedetteSmall({ item }) {
    return (
        <div className="card project-card-vertical h-100">
            <div className="card-body position-relative d-flex flex-row gap-3">
                <div className="card-content">
                    <div className="project-catgs mt-4">
                        {item.domains.map((domain, index) =>
                            <span className="badge rounded-pill bg-light text-muted" key={item.key + "-domain-" + index}>
                                {domain}
                            </span>
                        )}
                    </div>
                    <div className="my-auto">
                        <p className="project-title lexend h1 my-2">{item.title}</p>
                    </div>
                    <img src={img_dir + item.image} alt={item.title} className="project-img rounded my-2"/>
                    <div className="my-auto">
                        <p className="project-text d-flex align-items-center text-muted my-2">{item.description}</p>
                        <div className="project-tags mt-4">
                            {item.tags.map((tag, index) =>
                                <span className="badge rounded-pill bg-light text-muted" key={item.key + "-tag-" + index}>
                                    {tag}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjectItemLarge({ item }) {
    return (
        <div className="card project-card-large h-100">
            <div className="card-body position-relative d-flex flex-row gap-3">
                <div className="card-content">
                    <div className="project-catgs">
                        {item.domains.map((domain, index) =>
                            <span className="badge rounded-pill bg-light text-muted" key={item.key + "-domain-" + index}>
                                {domain}
                            </span>
                        )}
                    </div>
                    <div className="my-auto">
                        <p className="project-title d-flex align-items-center lexend h3 my-2">{item.title}</p>
                        <p className="project-text text-muted my-2">{item.description}</p>
                        <div className="project-tags mt-3">
                            {item.tags.map((tag, index) =>
                                <span className="badge rounded-pill bg-light text-muted" key={item.key + "-tag-" + index}>
                                    {tag}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <img src={img_dir + item.image} alt={item.title} className="project-img rounded"/>
            </div>
        </div>
    );
}

function ProjectItemMedium({ item }) {
    return (
        <div className="card project-card-medium h-100">
            <div className="card-body position-relative d-flex flex-row gap-3">
                <div className="card-content">
                    <div className="project-catgs">
                        {item.domains.map((domain, index) =>
                            <span className="badge rounded-pill bg-light text-muted" key={item.key + "-domain-" + index}>
                                {domain}
                            </span>
                        )}
                    </div>
                    <div className="my-auto">
                        <p className="project-title d-flex align-items-center lexend h4 my-2">{item.title}</p>
                        <p className="project-text text-muted my-2">{item.description}</p>
                        <div className="project-tags mt-3">
                            {item.tags.map((tag, index) =>
                                <span className="badge rounded-pill bg-light text-muted" key={item.key + "-tag-" + index}>
                                    {tag}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <img src={img_dir + item.image} alt={item.title} className="project-img rounded"/>
            </div>
        </div>
    );
}

function ProjectItemSmall({ item }) {
    return (
        <div className="card project-card-small h-100">
            <div className="card-body position-relative d-flex flex-row gap-3">
                <div className="card-content">
                    <div className="project-catgs">
                        {item.domains.map((domain, index) =>
                            <span className="badge rounded-pill bg-light text-muted" key={item.key + "-domain-" + index}>
                                {domain}
                            </span>
                        )}
                    </div>
                    <div className="my-auto">
                        <p className="project-title d-flex align-items-center lexend h4 my-2">{item.title}</p>
                        <p className="project-text text-muted my-2">{item.description}</p>
                        <div className="project-tags mt-3">
                            {item.tags.map((tag, index) =>
                                <span className="badge rounded-pill bg-light text-muted" key={item.key + "-tag-" + index}>
                                    {tag}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ------------------------------------------------------------------------ Utils ------------------------------------------------------------------------ //

// ---------------------------- Wallet Group

function ListGroupWallet({ id , json, body, head, groups }) {
    const url = json_dir + json;
    const [items, setItems] = React.useState(null);
    const [grid, setGrid] = React.useState([]);
    if(!groups) groups = 1;
    
    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        const items = json["items"];
        return items;
    };

    const expand_desc = (e) => {
        let elem = e.target;

        while(elem && !elem.matches("li:not(.description)")) {
            elem = elem.parentNode;
        }

        if(!elem.nextSibling.classList.contains("expanded")) {
            elem.nextSibling.classList.add("expanded");
        } else {
            elem.nextSibling.classList.remove("expanded");
        }
    }

    React.useEffect(() => {
        fetchItems().then(result => setItems(result));
    }, []);
        
    React.useEffect(() => {
        if (items) {
            const elements = [];
            let i=0;

            items.forEach((item) => {
                elements.length < groups ? elements.push([item]) : elements[i%groups].push(item);
                i++
            });

            setGrid(elements);
        }
    }, [items]);

    React.useEffect(() => {
        if (items && grid) {
            grid.forEach((list, index) => {
                let group = document.querySelectorAll("#" + id + "-" + index + " .list-group-item-action:not(.description)");
                let last = document.querySelector("#" + id + "-" + index + " .list-group-item-action:last-child");
                
                group.forEach((line) => {
                    line.addEventListener("click", expand_desc);
                    
                    if(line.nextSibling === last) {
                        line.classList.add("last-item");
                    }
                });
            });
        }
    }, [grid]);

    return (
        <>{grid ? grid.map((group, index) => (
            <ul id={id + "-" + index} className="list-group list-group-wallet" key={id + "-group-" + index}>
                {group.map((item) => (
                    <ListGroupWalletItem item={item} body={body} head={head} key={id + "-" + item.key} />
                ))}
            </ul>
        )) : null}</>
    );
}

function ListGroupWalletItem({ item, body, head }) {
    return (
        <>
            <li className="list-group-item list-group-item-action">
                {head ? head(item) :
                <div className="d-flex flex-row flex-nowrap align-items-center justify-content-center gap-3">
                    {iconMap[item.icon] ? iconMap[item.icon](20, 20) : null}
                    {item.name}
                </div>}
            </li>
            <li className="list-group-item list-group-item-action description">
                {body ? body(item) : item.desc}
            </li>
        </>
    );
}

// ---------------------------- Links

function LinkPage({ page, classes, table=false }) {
    let href = root_url + page.path;
    let link;

    let attr = "navigation lexend my-2";

    if (classes) { attr = classes + " " + attr; }

    if (page.active) {

        if (classes) { attr += " active "; }

        link = <a href={href} aria-current="page" className={attr}>{page.name}</a>;
    } else {
        link = <a href={href} className={attr}>{page.name}</a>;
    }

    return (
        <>
            {link}
            {table && page.active ? <TableOfContent json={page.table} /> : null}
        </>
    );
}

// ---------------------------- Carousel in a card

function CardCarousel({ id, json }) {
    const url = json_dir + json ;
    const [items, setItems] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    
    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        const items = json["items"];
        return items;
    };

    React.useEffect(() => {
        fetchItems().then(result => setItems(result));
    }, []);

    React.useEffect(() => {
        const carousel = document.getElementById('carousel-certificates');

        if (carousel) {
            const handler = (e) => setActiveIndex(e.to);
            carousel.addEventListener('slide.bs.carousel', handler);
            return () => carousel.removeEventListener('slide.bs.carousel', handler);
        }
    }, []);

    return (
        <div id={id + "-card"} className="card w-100">
            <div id={id} className="carousel slide card-img-top" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {items ? items.map((item, index) => (
                    <button type="button" data-bs-target={"#" + id} data-bs-slide-to={index} aria-label={"Slide " + (index+1)} key={"indicator-for-" + item.key} className={index===0?'active':null} aria-current={index===0?'True':null}></button>
                    )) : null}
                </div>
                <div className="carousel-inner">
                    {items ? items.map((item, index) => (
                    <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={item.key}>
                        <img src={img_dir + item.src} className="d-block img-fluid" alt={item.alt}></img>
                    </div>
                    )) : null}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={"#" + id} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={"#" + id} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="card-body">
                <h5 className="card-title">{items && items[activeIndex]?.title}</h5>
                <p className="card-text">{items && items[activeIndex]?.mention}</p>
            </div>
        </div>
    );
}

// Table Of Content

function TableOfContent({ objects, json, panel, refnav }) {

    if (objects && json) {
        throw TypeError(`You cannot specified a table from an object and a json file at the same time`);
    }

    if ((panel && json) || (panel && objects)) {
        throw TypeError(`You cannot specified a panels with a json or objects. Note : You shouln't call TableOfContent withe the param panel`);
    }

    const url = json_dir + json;
    const [items, setItems] = React.useState(null);
    const [table, setTable] = React.useState(null);
    const [tabPanels, setTabPanels] = React.useState(panel);
    const [isSubJson, setIsSubJson] = React.useState(false);
    
    if (json) {
        async function fetchTable() {
            const response = await fetch(url);
            const json = await response.json();
            const table = json["table-of-content"];
            const items = json["items"];
            return { table: table , items: items };
        };
        
        React.useEffect(() => {
            fetchTable().then(result => {
                if (refnav) {
                    setIsSubJson(true);
                    setItems(refnav);
                } else {
                    setItems(result.items);
                }
                setTable(result.table);
            });
        }, []);
    }
    
    if (objects) {
        React.useEffect(() => {
            setTable(objects);
            
            if(refnav) {
                setItems(refnav);
            }
        }, [objects]);
    }

    if (tabPanels) {
        return (
            <div className="tab-content">
                {tabPanels ? tabPanels.map((tab) => (<PanelOfContent tab={tab} table={tab.childrens} refnav={refnav} key={tab.key} />)) : null}
            </div>
        );
    }
    
    if (isSubJson) { return <>{table ? table.map((content) => ( <PieceOfContent content={content} refnav={items} key={content.key} /> )) : null} </>; }

    return (
        <ul>
        {table ? table.map((content) => (
            <PieceOfContent content={content} refnav={items} key={content.key} />
        )) : null}
        </ul>
    );
}

function PieceOfContent({ content, refnav }) {
    let childrens;
    let hasChilds = false;

    if (content && content.childrens && content.tabpanels) {
        throw TypeError(`You cannot specified childrens and tabpanels for the same content`);
    }

    if (content && content.tableref && content.tabpanels) {
        throw TypeError(`You cannot specified subjson table and tabpanels in the same content. Suggest you move the tabpanels in the subjson`);
    }
    
    if (content && content.tabpanels) {
        hasChilds = true;
        childrens = <TableOfContent panel={content.tabpanels} refnav={refnav} />;
    }

    if (content && content.tableref) {
        return <TableOfContent json={content.tableref} refnav={refnav} />;
    }

    if (content && content.childrens) {
        hasChilds = true;
        childrens = <TableOfContent object={content.childrens} refnav={refnav} />;
    }

    return ( 
        <li>
            <a href={content?.target} className="navigation lexend">{content?.title}</a>
            {hasChilds ? childrens : null}
        </li>
    );
}

function PanelOfContent( { tab, table, refnav } ) {
    function getTabAttrs(panelref) {
        if (!refnav) return null;
        const found = refnav.find(item => item.key === panelref);
        return found;
    }

    const item = getTabAttrs(tab.panelref);

    React.useEffect(() => {
        if (item) {
            var panel = new bootstrap.Tab(document.querySelector("#table-" + item?.target + "[role=tabpanel]"));
        }
    }, [])

    let attr = "tab-pane fade";
    attr = item.active ? attr + " show active" : attr;
    const role = "tabpanel";

    return (
        <ul key={item?.key} id={"table-" + item?.target} className={attr} role={role} aria-labelledby={item?.idname}>
            {table ? table.map((content) => (
                <PieceOfContent content={content} refnav={refnav} key={content.key} />
            )) : null}
        </ul>
    );
}

// ---------------------------- Masonry-like card grid

function CardGrid({ id, objects, json, card, columns, attr }) {

    if (!id) { throw ReferenceError(`You must specified a unique id`); }
    if (!card) { throw ReferenceError(`You must specified a default card or a array of cards for each break points (` + breaks.length + `)`); }

    if (objects && json) {
        throw TypeError(`You cannot specified a table from an object and a json file at the same time`);
    }

    if (columns && columns.length !== 5) {
        throw TypeError(breaks.length +` columns are required ` + columns.length + ` given. Give numbers of columns related to each break points`);
    }

    if (Array.isArray(card) && card.length !== 5) {
        throw TypeError(breaks.length + ` cards are required ` + card.length + ` given. Give cards related to each break points`);
    }

    const url = json_dir + json ;
    const [items, setItems] = React.useState([]);
    if (!columns) columns = [2, 3, 4, 5, 5];
    if (!Array.isArray(card)) card = [card, card, card, card, card];

    React.useEffect(() => {
        if (json) {
            async function fetchItems() {
                const response = await fetch(url);
                const json = await response.json();
                setItems(json["items"]);
            };
            fetchItems();
        } else if (objects) {
            setItems(objects);
        }

        const grids = document.querySelectorAll("#" + id + " .grid-columns");

        if (attr) {
            grids.forEach((grid) => {
                grid.style.setProperty('--grid-items-min-width', attr?.itemsMinWidth);
                grid.style.setProperty('--grid-items-height', attr?.itemsHeight);
                grid.style.setProperty('--grid-columns-gap', attr?.gap);
            });
        }

    }, [json, objects, url]);

    return (
        <div id={id}>
        {breaks.map((point, index) => 
            <div className={"grid-columns " + point.attr} data-columns={columns[index]} key={id + "-grid-columns-" + index}>
            {items ? items.map((item) => 
                item.group ? (
                    <CardPack pack={item} card={card[index]} columns={columns[index]} key={item.key} />
                ) : (
                    card[index](item)
            )) : null}
            </div>
        )}
        </div>
    );
}

function CardPack({ pack, card, columns }) {
    const rows = [];
    const group = pack.group;
    const getSizes = (sizes) => {
        if(sizes?.xl && columns >= 5) return sizes.xl;
        if(sizes?.lg && columns >= 4) return sizes.lg;
        if(sizes?.md && columns >= 3) return sizes.md;
        if(sizes?.sm && columns >= 2) return sizes.sm;
        return sizes;
    }
    const sizes = getSizes(pack.sizes);

    if (columns === 1 || sizes.width > columns) {
        return (
            <>{pack.group.map((item) => card(item))}</>
        );
    }

    for (var h = 0; h < sizes.height; h++) {
        const row = [];

        for (var w = 0; w < sizes.width; w++) {
            let item = group[(h*sizes.height)+w];
            row.push(card(item));
        }

        rows.push(<div className="card-group p-0" key={pack.key + "-line-" + rows.length}>{row}</div>);
    }

    return (
        <div className="card-pack h-100" style={{ gridColumn: "span " + sizes.width, gridRow: "span " + sizes.height }}>
            {rows}
        </div>
    );
}

// ------------------------------------------------------------------------ Assets ------------------------------------------------------------------------ //

// ---------------------------- Elements

function Credit() {
    return (
        <section className="credit">
            <p className="lexend m-0">© 2025 by Aglyonix</p>
        </section>
    );
}

function SocialNetworks() {
    return (
        <section className="social-networks d-flex flex-row flex-nowrap gap-2">
            <GithubIcon />
            <LinkedinIcon />
        </section>
    );
}

// ---------------------------- Icons

function GithubIcon({ attr }) {
    const src = icon_dir + "github-icon-480x480.png";
    const attrs = "icon" + " " + attr;

    return (
        <a href="https://github.com/Aglyonix" className={attrs}>
            <img src={src} alt="Github" />
        </a>
    );
}

function LinkedinIcon({ attr }) {
    const src = icon_dir + "linkedin-icon-480x480.png";
    const attrs = "icon" + " " + attr;

    return (
        <a href="https://www.linkedin.com/in/aëlig-jimenez-a10046292/" className={attrs}>
            <img src={src} alt="Linkedin" />
        </a>
    );
}

function FilterIcon({ width, height, stroke }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width??32} height={height??32} viewBox="0 0 24 24" fill="none">
            <path d="M3.99961 3H19.9997C20.552 3 20.9997 3.44764 20.9997 3.99987L20.9999 5.58569C21 5.85097 20.8946 6.10538 20.707 6.29295L14.2925 12.7071C14.105 12.8946 13.9996 13.149 13.9996 13.4142L13.9996 19.7192C13.9996 20.3698 13.3882 20.8472 12.7571 20.6894L10.7571 20.1894C10.3119 20.0781 9.99961 19.6781 9.99961 19.2192L9.99961 13.4142C9.99961 13.149 9.89425 12.8946 9.70672 12.7071L3.2925 6.29289C3.10496 6.10536 2.99961 5.851 2.99961 5.58579V4C2.99961 3.44772 3.44732 3 3.99961 3Z" stroke={stroke??"#000000"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

function VideoGameIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width??32} height={height??32} viewBox="0 0 1024 1024">
            <path d="M798.071 357.531c-16.527 24.259-51.62 24.259-68.147 0-9.185-13.476-9.185-32.01 0-45.486 16.527-24.259 51.62-24.259 68.147 0 9.185 13.476 9.185 32.01 0 45.486zm93.628 92.093c-16.527 24.259-51.62 24.259-68.147 0-9.185-13.476-9.185-32.01 0-45.486 16.527-24.259 51.62-24.259 68.147 0 9.185 13.476 9.185 32.01 0 45.486zm-189.305 0c-16.527 24.259-51.62 24.259-68.147 0-9.185-13.476-9.185-32.01 0-45.486 16.527-24.259 51.62-24.259 68.147 0 9.185 13.476 9.185 32.01 0 45.486zm95.677 95.164c-16.527 24.259-51.62 24.259-68.147 0-9.185-13.476-9.185-32.01 0-45.486 16.527-24.259 51.62-24.259 68.147 0 9.185 13.476 9.185 32.01 0 45.486zM360.192 428.417c0-53.017-42.983-96-96-96s-96 42.983-96 96 42.983 96 96 96 96-42.983 96-96zm40.96 0c0 75.638-61.322 136.96-136.96 136.96s-136.96-61.322-136.96-136.96 61.322-136.96 136.96-136.96 136.96 61.322 136.96 136.96z" />
            <path d="M983.038 727.533c-.352 61.995-50.737 112.151-112.843 112.151-39.998 0-76.347-20.949-96.661-54.546-5.852-9.679-18.443-12.782-28.122-6.929s-12.782 18.443-6.929 28.122c27.659 45.746 77.229 74.314 131.712 74.314 84.943 0 153.805-68.844 153.805-153.764l-1.254-19.506-40.634-281.277c-23.484-162.304-162.639-282.733-326.691-282.733H467.343c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48h188.078c143.699 0 265.584 105.483 286.153 247.638l40.355 278.923 1.109 16.649z" />
            <path d="M511.904 687.705c90.526 0 173.645 43.889 225.067 116.315 6.548 9.223 19.333 11.391 28.555 4.843s11.391-19.333 4.843-28.555c-59.025-83.133-154.528-133.562-258.465-133.562-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48zM42.071 710.884l40.355-278.923c20.569-142.154 142.454-247.638 286.153-247.638h188.078c11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48H368.579c-164.052 0-303.207 120.429-326.691 282.733L1.419 705.802.045 725.519C0 811.8 68.862 880.644 153.805 880.644c54.483 0 104.053-28.568 131.712-74.314 5.852-9.679 2.75-22.27-6.929-28.122s-22.27-2.75-28.122 6.929c-20.314 33.598-56.663 54.546-96.661 54.546-62.105 0-112.491-50.155-112.843-112.151l1.109-16.649z" />
            <path d="M512.096 646.745c-103.937 0-199.44 50.429-258.465 133.562-6.548 9.223-4.38 22.007 4.843 28.555s22.007 4.38 28.555-4.843c51.423-72.425 134.541-116.315 225.067-116.315 11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48z" />
        </svg>
    );
}

function ProblemSolvingIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width??32} height={height??32} viewBox="0 0 32 32" version="1.1">
            <path d="M23.994 18.252h-2.711c-0.014-0.001-0.025-0.008-0.039-0.008-0.414 0-0.75 0.336-0.75 0.75v0c0 0.002 0 0.004 0 0.006 0 1.104-0.895 2-2 2s-2-0.895-2-2c0-0.002 0-0.004 0-0.007v0c-0-0.414-0.336-0.75-0.75-0.75v0c-0.014 0-0.025 0.007-0.039 0.008h-1.957v-1.33c1.584-0.354 2.75-1.748 2.75-3.415s-1.166-3.060-2.727-3.41l-0.023-0.004v-2.095c-0-0.414-0.336-0.75-0.75-0.75h-10.999c-0.414 0-0.75 0.336-0.75 0.75v0 10.976l-0.005 0.024v11c0 0.414 0.336 0.75 0.75 0.75l21.999 0.004c0.414-0 0.75-0.336 0.75-0.75v0-11c-0-0.414-0.336-0.75-0.75-0.75v0zM2.75 8.748h9.499v2.010c0 0.414 0.336 0.75 0.75 0.75v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0c-0.414 0-0.75 0.336-0.75 0.75v0 1.99h-1.331c-0.351-1.588-1.746-2.758-3.415-2.758s-3.064 1.17-3.411 2.734l-0.004 0.023h-1.338zM2.745 19.748h1.957c0.017 0.001 0.031 0.010 0.048 0.010 0.416-0.006 0.751-0.343 0.754-0.759v-0c0.003-1.101 0.896-1.993 1.998-1.993 1.103 0 1.998 0.894 1.998 1.998 0 0.002 0 0.003 0 0.005v-0c0 0.414 0.336 0.75 0.75 0.75v0c0.017 0 0.031-0.009 0.048-0.010h1.948v1.332c-1.584 0.355-2.75 1.75-2.75 3.416 0 1.442 0.873 2.681 2.12 3.215l0.023 0.009c0.171 0.074 0.374 0.139 0.584 0.186l0.023 0.004v1.338h-9.5zM23.244 29.252h-9.499v-1.96c0.001-0.015 0.009-0.028 0.009-0.043-0.006-0.416-0.343-0.751-0.758-0.754h-0c-1.102-0.003-1.994-0.896-1.994-1.998 0-1.104 0.895-1.998 1.998-1.998 0.002 0 0.003 0 0.005 0h-0c0.414-0 0.75-0.336 0.75-0.75v0c0-0.015-0.008-0.028-0.009-0.043v-1.953h1.338c0.357 1.58 1.749 2.742 3.412 2.742s3.055-1.162 3.407-2.719l0.004-0.023h1.338zM29.994 1.25h-10.998c-0.414 0-0.75 0.336-0.75 0.75v0 2.702c-0.001 0.017-0.010 0.031-0.010 0.048 0 0.414 0.336 0.75 0.75 0.75v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0c-0.414 0-0.75 0.336-0.75 0.75v0c0 0.017 0.009 0.031 0.010 0.048v2.702c0 0.414 0.336 0.75 0.75 0.75h2.076c0.354 1.584 1.748 2.75 3.415 2.75s3.060-1.166 3.41-2.727l0.004-0.023h2.093c0.414-0 0.75-0.336 0.75-0.75v0-11c-0-0.414-0.336-0.75-0.75-0.75h-0zM29.244 12.25h-2.008c-0.414 0-0.75 0.336-0.75 0.75v0c0 1.105-0.895 2-2 2s-2-0.895-2-2v0c-0-0.414-0.336-0.75-0.75-0.75h-1.99v-1.338c1.579-0.358 2.74-1.749 2.74-3.412s-1.161-3.054-2.717-3.407l-0.023-0.004v-1.338h9.498z" />
        </svg>
    );
}

function MangaIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width??32} height={height??32} viewBox="0 0 24 24">
            <path className="stroke" d="M4 8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8Z" />
            <path className="stroke" d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235" />
            <path className="stroke" d="M8 7H16" />
            <path className="stroke" d="M8 10.5H13" />
        </svg>
    );
}

function ShareIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} version="1.1" viewBox="0 0 512 512">
            <path d="M398.73,227.402c62.563,0,113.27-50.793,113.27-113.359c0-62.656-50.707-113.36-113.27-113.36   c-62.656,0-113.364,50.704-113.364,113.36c0,11.587,1.733,22.711,4.926,33.292l-114.914,69.397   c-18.512-20.154-44.959-32.739-74.417-32.739C45.146,183.993,0,229.228,0,284.954c0,55.816,45.146,100.962,100.962,100.962   c30.736,0,58.278-13.778,76.79-35.482l86.824,45.787c-2.646,8.39-4.106,17.323-4.106,26.63   c0.093,48.878,39.673,88.466,88.555,88.466c48.976,0,88.556-39.588,88.556-88.466c0-48.976-39.58-88.554-88.556-88.554   c-26.812,0-50.886,11.942-67.122,30.825l-84.726-49.431c3.104-9.672,4.742-19.976,4.742-30.736c0-10.393-1.55-20.43-4.56-29.827   l118.013-64.294C335.985,213.268,365.715,227.402,398.73,227.402z M344.282,59.687c14.045-13.956,33.11-22.524,54.448-22.524   c21.251,0,40.31,8.567,54.356,22.524c13.862,13.956,22.434,33.016,22.434,54.356c0,21.25-8.572,40.399-22.434,54.354   c-14.046,13.956-33.105,22.525-54.356,22.525c-19.059,0-36.298-6.84-49.794-18.419h-0.094c-1.55-1.273-3.099-2.645-4.56-4.106   c-10.852-10.946-18.422-24.991-21.246-40.852c-0.824-4.382-1.189-8.942-1.189-13.502C321.846,92.703,330.419,73.644,344.282,59.687   z M164.343,296.532c-2.28,13.138-8.661,24.902-17.781,34.022c-0.731,0.73-1.55,1.461-2.373,2.192   c-11.49,10.393-26.536,16.69-43.227,16.69c-17.874,0-33.928-7.205-45.6-18.881c-11.676-11.765-18.881-27.725-18.881-45.6   c0-17.874,7.205-33.834,18.881-45.6c11.672-11.676,27.726-18.881,45.6-18.881c16.232,0,30.825,5.932,42.225,15.782   c1.185,0.997,2.28,2.004,3.376,3.099c9.027,9.12,15.413,20.698,17.781,33.746c0.73,3.83,1.095,7.748,1.095,11.854   C165.438,288.873,165.074,292.801,164.343,296.532z M297.773,413.73c1.915-10.767,7.022-20.253,14.499-27.725   c0.638-0.641,1.367-1.372,2.098-1.915c9.21-8.39,21.251-13.314,34.654-13.314c14.504,0,27.36,5.745,36.846,15.23   c9.485,9.485,15.23,22.346,15.23,36.845c0,14.411-5.745,27.272-15.23,36.748c-9.486,9.486-22.342,15.238-36.846,15.238   c-14.406,0-27.266-5.753-36.752-15.238c-9.485-9.476-15.23-22.337-15.322-36.748C296.95,419.751,297.225,416.643,297.773,413.73z" />
        </svg>
    );
}

function ExperiencesIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 32 32" xmlSpace="preserve">
            <path className="stroke" d="M28,20.6V25c0,1.1-0.9,2-2,2H6c-1.1,0-2-0.9-2-2v-4.4" />
            <path className="stroke" d="M16,24L16,24c-1.1,0-2-0.9-2-2v-3h4v3C18,23.1,17.1,24,16,24z" />
            <path className="stroke" d="M14,22H7c-2.2,0-4-1.8-4-4v-8c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2v8c0,2.2-1.8,4-4,4h-7" />
            <path className="stroke" d="M20,8h-8V6c0-1.1,0.9-2,2-2h4c1.1,0,2,0.9,2,2V8z" />
        </svg>
    );
}

function CertificatesIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 512.001 512.001" xmlSpace="preserve">
            <path d="M438.172,143.627l-9.686-66.138l-59.923-29.61L321.896,0l-65.895,11.32L190.106,0L143.44,47.879l-59.923,29.61    l-9.688,66.138l-31.021,59.192l31.021,59.193l9.686,66.137l53.775,26.573v135.869l51.651-22.41v43.822L256,485.24l67.059,26.761    v-43.822l51.651,22.41V354.721l53.775-26.573l9.688-66.138l31.021-59.192L438.172,143.627z M188.942,434.955l-21.174,9.189    v-61.424l21.174,21.725V434.955z M292.583,454.955v12.069l-36.582-14.598l-36.582,14.598v-12.069v-54.331l36.582-6.305    l36.582,6.305V454.955z M344.234,444.144l-21.174-9.188v-30.511l21.174-21.726V444.144z M408.769,252.46l-8.122,55.45    l-50.266,24.838l-39.122,40.139l-53.451-9.181L256,363.394l-1.869,0.322l-53.39,9.171l-39.122-40.14l-50.266-24.838l-8.121-55.45    l-26.016-49.64l26.016-49.64l8.122-55.451L161.62,72.89l39.122-40.139l55.259,9.492l55.259-9.492l39.122,40.139l50.266,24.838    l8.121,55.451l26.016,49.64L408.769,252.46z" />
            <path d="M256.001,67.539c-74.592,0-135.278,60.686-135.278,135.279s60.685,135.279,135.278,135.279    s135.278-60.686,135.278-135.279S330.593,67.539,256.001,67.539z M256.001,307.622c-57.788,0-104.802-47.014-104.802-104.803    S198.213,98.016,256.001,98.016s104.802,47.015,104.802,104.803S313.789,307.622,256.001,307.622z" />
        </svg>
    );
}

function TechStackIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 86.02 86.02" xmlSpace="preserve">
            <path d="M0.354,48.874l0.118,25.351c0.001,0.326,0.181,0.624,0.467,0.779l20.249,10.602c0.132,0.071,0.276,0.106,0.421,0.106   c0.001,0,0.001,0,0.002,0c0.061,0.068,0.129,0.133,0.211,0.182c0.14,0.084,0.297,0.126,0.455,0.126   c0.146,0,0.291-0.035,0.423-0.106l19.992-10.842c0.183-0.099,0.315-0.261,0.392-0.445c0.081,0.155,0.203,0.292,0.364,0.379   l20.248,10.602c0.132,0.071,0.277,0.106,0.422,0.106c0.001,0,0.001,0,0.002,0c0.062,0.068,0.129,0.133,0.21,0.182   c0.142,0.084,0.299,0.126,0.456,0.126c0.146,0,0.29-0.035,0.422-0.106L85.2,75.071c0.287-0.154,0.467-0.456,0.467-0.783V47.911   c0-0.008-0.004-0.016-0.004-0.022c0-0.006,0.002-0.013,0.002-0.021c-0.001-0.023-0.01-0.049-0.014-0.072   c-0.007-0.05-0.014-0.098-0.027-0.146c-0.011-0.031-0.023-0.062-0.038-0.093c-0.019-0.042-0.037-0.082-0.062-0.12   c-0.019-0.03-0.04-0.058-0.062-0.084c-0.028-0.034-0.059-0.066-0.092-0.097c-0.025-0.023-0.054-0.045-0.083-0.066   c-0.02-0.012-0.034-0.03-0.056-0.043c-0.02-0.011-0.041-0.017-0.062-0.025c-0.019-0.01-0.03-0.022-0.049-0.029l-20.603-9.978   c-0.082-0.034-0.17-0.038-0.257-0.047V10.865c0-0.007-0.002-0.015-0.002-0.022c-0.001-0.007,0.001-0.013,0.001-0.02   c-0.001-0.025-0.012-0.049-0.015-0.073c-0.007-0.049-0.014-0.098-0.027-0.145c-0.01-0.032-0.024-0.063-0.038-0.093   c-0.02-0.042-0.036-0.083-0.062-0.12c-0.02-0.03-0.041-0.057-0.062-0.084c-0.028-0.034-0.058-0.067-0.091-0.097   c-0.025-0.023-0.055-0.045-0.083-0.065c-0.021-0.014-0.035-0.032-0.056-0.045c-0.021-0.011-0.042-0.016-0.062-0.026   c-0.019-0.009-0.031-0.021-0.048-0.027L43.118,0.07c-0.24-0.102-0.512-0.093-0.746,0.025L22.009,10.71   c-0.299,0.151-0.487,0.456-0.489,0.79c0,0.006,0.002,0.011,0.002,0.016c-0.037,0.099-0.063,0.202-0.063,0.312l0.118,25.233   c-0.106,0.011-0.213,0.03-0.311,0.079L0.903,47.755c-0.298,0.15-0.487,0.456-0.489,0.791c0,0.005,0.003,0.009,0.003,0.015   C0.379,48.659,0.353,48.764,0.354,48.874z M61.321,10.964L43.372,21l-19.005-9.485l18.438-9.646L61.321,10.964z M62.486,37.008   l-18.214,9.586V22.535l18.214-10.18V37.008z M65.674,59.58l18.214-10.179v24.355l-18.214,9.883V59.58z M45.77,48.559l18.438-9.646   l18.515,9.099L64.775,58.045L45.77,48.559z M23.165,59.58L41.38,49.402v24.355l-18.215,9.882V59.58z M3.262,48.559L21.7,38.913   l18.515,9.099L22.266,58.045L3.262,48.559z" />
        </svg>
    );
}

function CppIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 256 288" version="1.1">
            <path d="M255.569 84.72c-.002-4.83-1.035-9.098-3.124-12.761-2.052-3.602-5.125-6.621-9.247-9.008-34.025-19.619-68.083-39.178-102.097-58.817-9.17-5.294-18.061-5.101-27.163.269C100.395 12.39 32.59 51.237 12.385 62.94 4.064 67.757.015 75.129.013 84.711 0 124.166.013 163.62 0 203.076c.002 4.724.991 8.909 2.988 12.517 2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.269 34.015-19.64 68.075-39.198 102.105-58.817 4.217-2.44 7.333-5.544 9.386-9.252 1.994-3.608 2.985-7.793 2.987-12.518 0 0 0-78.889-.013-118.345" fill="#5C8DBC"/>
            <path d="M128.182 143.509L2.988 215.593c2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.269 34.015-19.64 68.075-39.198 102.105-58.817 4.217-2.44 7.333-5.544 9.386-9.252l-124.413-72.074" fill="#1A4674"/>
            <path d="M91.101 164.861c7.285 12.718 20.98 21.296 36.69 21.296 15.807 0 29.58-8.687 36.828-21.541l-36.437-21.107-37.081 21.352" fill="#1A4674"/>
            <path d="M255.569 84.72c-.002-4.83-1.035-9.098-3.124-12.761l-124.263 71.55 124.413 72.074c1.994-3.608 2.985-7.793 2.987-12.518 0 0 0-78.889-.013-118.345" fill="#1B598E"/>
            <path d="M248.728 148.661h-9.722v9.724h-9.724v-9.724h-9.721v-9.721h9.721v-9.722h9.724v9.722h9.722v9.721M213.253 148.661h-9.721v9.724h-9.722v-9.724h-9.722v-9.721h9.722v-9.722h9.722v9.722h9.721v9.721" fill="#FFF"/>
            <path d="M164.619 164.616c-7.248 12.854-21.021 21.541-36.828 21.541-15.71 0-29.405-8.578-36.69-21.296a42.062 42.062 0 0 1-5.574-20.968c0-23.341 18.923-42.263 42.264-42.263 15.609 0 29.232 8.471 36.553 21.059l36.941-21.272c-14.683-25.346-42.096-42.398-73.494-42.398-46.876 0-84.875 38-84.875 84.874 0 15.378 4.091 29.799 11.241 42.238 14.646 25.48 42.137 42.637 73.634 42.637 31.555 0 59.089-17.226 73.714-42.781l-36.886-21.371" fill="#FFF"/>
        </svg>
    );
}

function CSharpIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 -1.428 255.582 290.108" version="1.1">
            <path d="m255.569 84.452c-.002-4.83-1.035-9.098-3.124-12.76-2.052-3.603-5.125-6.622-9.247-9.009-34.025-19.619-68.083-39.178-102.097-58.817-9.17-5.294-18.061-5.1-27.163.27-13.543 7.986-81.348 46.833-101.553 58.536-8.321 4.818-12.37 12.19-12.372 21.771-.013 39.455 0 78.91-.013 118.365 0 4.724.991 8.91 2.988 12.517 2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.27 34.015-19.64 68.075-39.199 102.105-58.818 4.217-2.44 7.333-5.544 9.386-9.252 1.994-3.608 2.987-7.793 2.987-12.518 0 0 0-78.889-.013-118.345" fill="#a179dc"/>
            <path d="m128.182 143.241-125.194 72.084c2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.27 34.015-19.64 68.075-39.199 102.105-58.818 4.217-2.44 7.333-5.544 9.386-9.252z" fill="#280068"/>
            <path d="m255.569 84.452c-.002-4.83-1.035-9.098-3.124-12.76l-124.263 71.55 124.413 72.073c1.994-3.608 2.985-7.793 2.987-12.518 0 0 0-78.889-.013-118.345" fill="#390091"/>
            <g fill="#fff">
                <path d="m201.892 116.294v13.474h13.474v-13.474h6.737v13.474h13.474v6.737h-13.474v13.473h13.474v6.737h-13.474v13.474h-6.737v-13.474h-13.474v13.474h-6.737v-13.474h-13.473v-6.737h13.473v-13.473h-13.473v-6.737h13.473v-13.474zm13.474 20.21h-13.474v13.474h13.474z"/>
                <path d="m128.457 48.626c35.144 0 65.827 19.086 82.262 47.456l-.16-.273-41.35 23.808c-8.146-13.793-23.08-23.102-40.213-23.294l-.54-.003c-26.125 0-47.305 21.18-47.305 47.305a47.08 47.08 0 0 0 6.239 23.47c8.154 14.235 23.483 23.836 41.067 23.836 17.693 0 33.109-9.723 41.221-24.11l-.197.345 41.287 23.918c-16.255 28.13-46.518 47.157-81.253 47.536l-1.058.006c-35.255 0-66.025-19.204-82.419-47.724-8.003-13.923-12.582-30.064-12.582-47.277 0-52.466 42.532-95 95-95z"/>
            </g>
        </svg>
    );
}

function JavaIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 192.756 192.756" version="1.1">
            <g fillRule="evenodd" clipRule="evenodd">
                <path d="M80.372 101.729s-4.604 2.679 3.28 3.584c9.554 1.091 14.434.934 24.959-1.057 0 0 2.771 1.735 6.639 3.236-23.601 10.113-53.413-.585-34.878-5.763zM77.487 88.532s-5.165 3.823 2.726 4.639c10.206 1.054 18.262 1.14 32.211-1.544 0 0 1.926 1.955 4.957 3.023-28.531 8.345-60.307.657-39.894-6.118z" fill="#3174b9"/>
                <path d="M101.797 66.143c5.818 6.697-1.525 12.72-1.525 12.72s14.766-7.621 7.984-17.168c-6.332-8.899-11.189-13.32 15.102-28.566-.001-.001-41.27 10.303-21.561 33.014z" fill="#ca3132"/>
                <path d="M133.01 111.491s3.408 2.81-3.754 4.983c-13.619 4.125-56.694 5.369-68.659.164-4.298-1.872 3.766-4.467 6.303-5.015 2.646-.572 4.156-.468 4.156-.468-4.783-3.368-30.916 6.615-13.272 9.479 48.112 7.801 87.704-3.512 75.226-9.143zM82.587 74.857s-21.908 5.205-7.757 7.097c5.977.799 17.883.615 28.982-.316 9.068-.761 18.17-2.389 18.17-2.389s-3.195 1.371-5.51 2.949c-22.251 5.853-65.229 3.127-52.855-2.856 10.462-5.061 18.97-4.485 18.97-4.485zM121.891 96.824c22.617-11.75 12.16-23.044 4.859-21.522-1.785.373-2.586.695-2.586.695s.666-1.042 1.932-1.49c14.441-5.075 25.545 14.972-4.656 22.911-.001 0 .347-.314.451-.594z" fill="#3174b9"/>
                <path d="M108.256 8.504s12.523 12.531-11.881 31.794c-19.571 15.458-4.462 24.269-.006 34.34-11.426-10.307-19.807-19.382-14.185-27.826 8.254-12.395 31.125-18.406 26.072-38.308z" fill="#ca3132"/>
                <path d="M84.812 128.674c21.706 1.388 55.045-.771 55.836-11.044 0 0-1.518 3.894-17.941 6.983-18.529 3.488-41.386 3.082-54.938.845 0 0 2.777 2.298 17.043 3.216z" fill="#3174b9"/>
                <path d="M139.645 147.096h-.66v-.37h1.781v.37h-.66v1.848h-.461v-1.848zm3.554.092h-.008l-.656 1.755h-.301l-.652-1.755h-.008v1.755h-.438v-2.218h.643l.604 1.569.604-1.569h.637v2.218h-.424v-1.755h-.001zM81.255 167.921c-2.047 1.774-4.211 2.772-6.154 2.772-2.768 0-4.27-1.663-4.27-4.324 0-2.881 1.608-4.989 8.044-4.989h2.379v6.541h.001zm5.65 6.374v-19.732c0-5.043-2.876-8.371-9.809-8.371-4.045 0-7.591.999-10.474 2.272l.83 3.495c2.271-.834 5.207-1.607 8.089-1.607 3.994 0 5.713 1.607 5.713 4.934v2.495h-1.996c-9.702 0-14.08 3.764-14.08 9.423 0 4.876 2.885 7.648 8.316 7.648 3.491 0 6.099-1.441 8.534-3.55l.443 2.993h4.434zM105.762 174.295h-7.045l-8.483-27.601h6.154l5.265 16.961 1.172 5.096c2.656-7.371 4.541-14.854 5.484-22.057h5.984c-1.602 9.088-4.488 19.066-8.531 27.601zM132.799 167.921c-2.053 1.774-4.217 2.772-6.156 2.772-2.768 0-4.268-1.663-4.268-4.324 0-2.881 1.609-4.989 8.041-4.989h2.383v6.541zm5.652 6.374v-19.732c0-5.043-2.885-8.371-9.811-8.371-4.049 0-7.594.999-10.477 2.272l.83 3.495c2.271-.834 5.213-1.607 8.096-1.607 3.988 0 5.709 1.607 5.709 4.934v2.495h-1.996c-9.703 0-14.078 3.764-14.078 9.423 0 4.876 2.879 7.648 8.311 7.648 3.494 0 6.098-1.441 8.539-3.55l.445 2.993h4.432zM58.983 178.985c-1.61 2.353-4.214 4.216-7.061 5.267l-2.79-3.286c2.169-1.113 4.027-2.91 4.892-4.582.745-1.49 1.056-3.406 1.056-7.992v-31.515h6.005v31.08c0 6.134-.49 8.613-2.102 11.028z" fill="#ca3132"/>
            </g>
        </svg>
    );
}

function PythonIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 256 255" version="1.1">
            <defs>
                <linearGradient x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%" id="svg-python-id-1">
                    <stop stopColor="#387EB8" offset="0%"/>
                    <stop stopColor="#366994" offset="100%"/>
                </linearGradient>
                <linearGradient x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%" id="svg-python-id-2">
                    <stop stopColor="#FFE052" offset="0%"/>
                    <stop stopColor="#FFC331" offset="100%"/>
                </linearGradient>
            </defs>
            <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#svg-python-id-1)"/>
            <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#svg-python-id-2)"/>
        </svg>
    );
}

function DjangoIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width??32} height={height??32} viewBox="0 0 32 32">
            <path d="M14.135,4H18.1V22.169a26.218,26.218,0,0,1-5.143.535c-4.842-.005-7.362-2.168-7.362-6.322,0-4,2.673-6.6,6.816-6.6a6.448,6.448,0,0,1,1.724.2V4Zm0,9.142a3.992,3.992,0,0,0-1.337-.2c-2,0-3.163,1.223-3.163,3.366,0,2.087,1.107,3.239,3.138,3.239a9.355,9.355,0,0,0,1.362-.1v-6.3Z" fill="#44b78b"/>
            <path d="M24.4,10.059v9.1c0,3.133-.235,4.639-.923,5.938A6.316,6.316,0,0,1,20.237,28l-3.678-1.733A5.708,5.708,0,0,0,19.7,23.638c.566-1.121.745-2.42.745-5.837V10.059Z" fill="#44b78b"/>
            <rect x="20.441" y="4.02" width="3.964" height="4.028" fill="#44b78b"/>
        </svg>
    );
}

function AndroidIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 413.137 413.137" version="1.1">
            <g xmlns="http://www.w3.org/2000/svg">
                <path fill="#AAC148" d="M311.358,136.395H101.779c-4.662,0-8.441,3.779-8.441,8.441v175.749   c0,4.662,3.779,8.441,8.441,8.441h37.363v59.228c0,13.742,11.14,24.883,24.883,24.883l0,0c13.742,0,24.883-11.14,24.883-24.883   v-59.228h34.803v59.228c0,13.742,11.14,24.883,24.883,24.883l0,0c13.742,0,24.883-11.14,24.883-24.883v-59.228h37.882   c4.662,0,8.441-3.779,8.441-8.441V144.836C319.799,140.174,316.02,136.395,311.358,136.395z"/>
                <path fill="#AAC148" d="M57.856,136.354L57.856,136.354c-13.742,0-24.883,11.14-24.883,24.883v101.065   c0,13.742,11.14,24.883,24.883,24.883l0,0c13.742,0,24.883-11.14,24.883-24.883V161.237   C82.738,147.495,71.598,136.354,57.856,136.354z"/>
                <path fill="#AAC148" d="M355.281,136.354L355.281,136.354c-13.742,0-24.883,11.14-24.883,24.883v101.065   c0,13.742,11.14,24.883,24.883,24.883l0,0c13.742,0,24.883-11.14,24.883-24.883V161.237   C380.164,147.495,369.024,136.354,355.281,136.354z"/>
                <path fill="#AAC148" d="M103.475,124.069h205.692c5.366,0,9.368-4.943,8.266-10.195   c-6.804-32.428-27.45-59.756-55.465-75.543l17.584-31.727c1.19-2.148,0.414-4.855-1.734-6.045   c-2.153-1.193-4.856-0.414-6.046,1.734l-17.717,31.966c-14.511-6.734-30.683-10.495-47.734-10.495   c-17.052,0-33.224,3.761-47.735,10.495L140.869,2.292c-1.191-2.149-3.898-2.924-6.045-1.734c-2.148,1.19-2.924,3.897-1.734,6.045   l17.584,31.727c-28.015,15.788-48.661,43.115-55.465,75.544C94.106,119.126,98.108,124.069,103.475,124.069z M267.697,76.786   c0,5.282-4.282,9.565-9.565,9.565c-5.282,0-9.565-4.282-9.565-9.565c0-5.282,4.282-9.565,9.565-9.565   C263.415,67.221,267.697,71.504,267.697,76.786z M154.508,67.221c5.282,0,9.565,4.282,9.565,9.565c0,5.282-4.282,9.565-9.565,9.565   c-5.282,0-9.565-4.282-9.565-9.565C144.943,71.504,149.225,67.221,154.508,67.221z"/>
            </g>
        </svg>
    );
}

function SQLIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 512 512" version="1.1">
            <path fill="#E2E5E7" d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"/>
            <path fill="#B0B7BD" d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"/>
            <polygon fill="#CAD1D8" points="480,224 384,128 480,128 "/>
            <path fill="#F15642" d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16  V416z"/>
            <g>
                <path fill="#FFFFFF" d="M98.128,314.672c2.944-24.832,40.416-29.296,58.064-15.728c8.704,7.024-0.496,18.16-8.192,12.528   c-9.456-6-30.96-8.816-33.648,4.464c-3.456,20.992,52.208,8.976,51.296,43.008c-0.896,32.496-47.968,33.248-65.632,18.672   c-4.224-3.456-4.096-9.072-1.776-12.544c3.312-3.312,7.024-4.464,11.376-0.88c10.496,7.152,37.488,12.528,39.408-5.648   C147.376,339.632,94.16,351.008,98.128,314.672z"/>
                <path fill="#FFFFFF" d="M265.488,369.424l2.048,2.416c8.432,7.68-2.56,20.224-11.136,12.16l-4.336-3.44   c-6.656,4.592-14.448,6.784-24.816,6.784c-22.512,0-48.24-15.504-48.24-46.976s25.584-47.456,48.24-47.456   c23.776,0,47.072,15.984,47.072,47.456C274.32,352.528,271.232,361.504,265.488,369.424z M257.792,340.368   c0-20.336-15.984-30.688-30.56-30.688c-15.728,0-31.216,10.336-31.216,30.688c0,15.504,13.168,30.208,31.216,30.208   c4.592,0,9.072-1.152,13.552-2.304l-14.576-13.44c-6.784-8.192,3.968-19.84,12.528-12.288l14.464,14.448   C256.384,352.528,257.792,347.024,257.792,340.368z"/>
                <path fill="#FFFFFF" d="M293.168,303.152c0-4.224,3.584-7.808,8.064-7.808c4.096,0,7.552,3.6,7.552,7.808v64.096h34.8   c12.528,0,12.8,16.752,0,16.752h-42.336c-4.48,0-8.064-3.184-8.064-7.792v-73.056H293.168z"/>
            </g>
            <path fill="#CAD1D8" d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"/>
        </svg>
    );
}

function HTMLIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 108.35 122.88" version="1.1">
            <g>
                <polygon fill="#E44D26" points="108.35,0 98.48,110.58 54.11,122.88 9.86,110.6 0,0 108.35,0"/>
                <polygon fill="#F16529" points="54.17,113.48 90.03,103.54 98.46,9.04 54.17,9.04 54.17,113.48"/>
                <path fill="#EBEBEB" d="M34.99,36.17h19.19V22.61H20.16l0.32,3.64l3.33,37.38h30.35V50.06H36.23L34.99,36.17L34.99,36.17L34.99,36.17z M38.04,70.41H24.43l1.9,21.3l27.79,7.71l0.06-0.02V85.29l-0.06,0.02l-15.11-4.08L38.04,70.41L38.04,70.41L38.04,70.41z"/>
                <path fill="#FFFFFF" d="M54.13,63.63h16.7l-1.57,17.59L54.13,85.3v14.11l27.81-7.71l0.2-2.29l3.19-35.71l0.33-3.64H54.13V63.63 L54.13,63.63z M54.13,36.14v0.03h32.76l0.27-3.05l0.62-6.88l0.32-3.64H54.13V36.14L54.13,36.14L54.13,36.14z"/>
            </g>
        </svg>
    );
}

function CSSIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 296297 333333" version="1.1">
            <defs xmlns="http://www.w3.org/2000/svg">
                <linearGradient id="svg-css-id-4" gradientUnits="userSpaceOnUse" x1="54128.7" y1="79355.5" x2="240318" y2="79355.5">
                    <stop offset="0" stopColor="#e8e7e5"/>
                    <stop offset="1" stopColor="#fff"/>
                </linearGradient>
                <linearGradient id="svg-css-id-5" gradientUnits="userSpaceOnUse" x1="62019.3" y1="202868" x2="233515" y2="202868">
                    <stop offset="0" stopColor="#e8e7e5"/>
                    <stop offset="1" stopColor="#fff"/>
                </linearGradient>
                <linearGradient id="svg-css-id-6" gradientUnits="userSpaceOnUse" x1="104963" y1="99616.9" x2="104963" y2="171021">
                    <stop offset="0" stopColor="#d1d3d4"/>
                    <stop offset=".388" stopColor="#d1d3d4"/>
                    <stop offset="1" stopColor="#d1d3d4"/>
                </linearGradient>
                <linearGradient id="svg-css-id-7" gradientUnits="userSpaceOnUse" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-css-id-6" x1="194179" y1="61185.8" x2="194179" y2="135407">
                    <mask id="svg-css-id-0">
                        <linearGradient id="svg-css-id-1" gradientUnits="userSpaceOnUse" x1="104963" y1="99616.9" x2="104963" y2="171021">
                            <stop offset="0" stopOpacity="0" stopColor="#fff"/>
                            <stop offset=".388" stopColor="#fff"/>
                            <stop offset="1" stopOpacity=".831" stopColor="#fff"/>
                        </linearGradient>
                        <path fill="url(#svg-css-id-1)" d="M61737 99467h86453v71704H61737z"/>
                    </mask>
                    <mask id="svg-css-id-2">
                        <linearGradient id="svg-css-id-3" gradientUnits="userSpaceOnUse" x1="194179" y1="61185.8" x2="194179" y2="135407">
                            <stop offset="0" stopOpacity="0" stopColor="#fff"/>
                            <stop offset=".388" stopColor="#fff"/>
                            <stop offset="1" stopOpacity=".831" stopColor="#fff"/>
                        </linearGradient>
                        <path fill="url(#svg-css-id-3)" d="M147890 61036h92578v74521h-92578z"/>
                    </mask>
                </linearGradient>
            </defs>
            <g xmlns="http://www.w3.org/2000/svg" id="Layer_x0020_1">
                <g id="_513085304">
                    <path fill="#2062af" d="M268517 300922l-120369 32411-120371-32411L0 0h296297z"/>
                    <path fill="#3c9cd7" d="M148146 24374v283109l273 74 97409-26229 22485-256954z"/>
                    <path fill="#fff" d="M148040 99617l-86153 35880 2857 35524 83296-35614 88604-37883 3674-36339-92278 38432z"/>
                    <path mask="url(#svg-css-id-0)" fill="url(#svg-css-id-6)" d="M61887 135497l2857 35524 83295-35614V99617z"/>
                    <path mask="url(#svg-css-id-2)" fill="url(#svg-css-id-7)" d="M240318 61186l-92278 38431v35790l88604-37883z"/>
                    <path fill="url(#svg-css-id-5)" d="M62019 135497l2858 35524 127806 407-2859 47365-42055 11840-40428-10208-2450-29399H67327l4900 56756 75950 22457 75538-22050 9800-112692z"/>
                    <path fill="#000" fillOpacity=".05098" d="M148040 135497H61888l2857 35524 83295 266v-35790zm0 95022l-408 114-40422-10208-2450-29399H67197l4899 56756 75944 22457v-39720z"/>
                    <path fill="url(#svg-css-id-4)" d="M54129 61186h186189l-3674 36339H58620l-4491-36339z"/>
                    <path fill="#000" fillOpacity=".05098" d="M148040 61186H54129l4491 36339h89420z"/>
                </g>
            </g>
        </svg>
    );
}

function BootstrapIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 512 408" version="1.1">
            <defs>
                <linearGradient id="svg-bootstrap-id" gradientUnits="userSpaceOnUse" x1="76" y1="10" x2="523" y2="365">
                    <stop offset="0" stopColor="#9013FE"/>
                    <stop offset="1" stopColor="#6610F2"/>
                </linearGradient>
            </defs>
            <path fill="url(#svg-bootstrap-id)" fillRule="nonzero" d="M56.48 53.32C55.52 25.58 77.13 0 106.34 0H405.7c29.21 0 50.82 25.58 49.86 53.32-.93 26.65.27 61.16 8.96 89.31 8.72 28.23 23.41 46.08 47.48 48.37v26c-24.07 2.29-38.76 20.14-47.48 48.37-8.69 28.15-9.89 62.66-8.96 89.31.96 27.74-20.65 53.32-49.86 53.32H106.34c-29.21 0-50.82-25.58-49.86-53.32.93-26.65-.28-61.16-8.96-89.31C38.8 237.14 24.07 219.29 0 217v-26c24.07-2.29 38.8-20.14 47.52-48.37 8.68-28.15 9.89-62.66 8.96-89.31z"/>
            <path fill="#fff" fillRule="evenodd" d="M342.9 251.1c0 38.2-28.5 61.36-75.8 61.36h-89.2v-217h88.74c39.44 0 65.32 21.35 65.32 54.13 0 23.01-17.4 43.62-39.59 47.22v1.21c30.2 3.31 50.53 24.21 50.53 53.08zm-130.49 33.84v-71.43h45.6c32.66 0 49.61 12.03 49.61 35.49s-16.48 35.94-47.6 35.94h-47.61zm0-161.96h45.91c24.96 0 39.13 11.13 39.13 31.28 0 21.5-16.48 33.53-46.37 33.53h-38.67v-64.81z"/>
        </svg>
    );
}

function JavaScriptIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 256 256" version="1.1">
            <path d="M0,0 L256,0 L256,256 L0,256 L0,0 Z" fill="#F7DF1E"/>
            <path d="M67.311746,213.932292 L86.902654,202.076241 C90.6821079,208.777346 94.1202286,214.447137 102.367086,214.447137 C110.272203,214.447137 115.256076,211.354819 115.256076,199.326883 L115.256076,117.528787 L139.313575,117.528787 L139.313575,199.666997 C139.313575,224.58433 124.707759,235.925943 103.3984,235.925943 C84.1532952,235.925943 72.9819429,225.958603 67.3113397,213.93026" fill="#000000"/>
            <path d="M152.380952,211.354413 L171.969422,200.0128 C177.125994,208.433981 183.827911,214.619835 195.684368,214.619835 C205.652521,214.619835 212.009041,209.635962 212.009041,202.762159 C212.009041,194.513676 205.479416,191.592025 194.481168,186.78207 L188.468419,184.202565 C171.111213,176.81473 159.597308,167.53534 159.597308,147.944838 C159.597308,129.901308 173.344508,116.153295 194.825752,116.153295 C210.119924,116.153295 221.117765,121.48094 229.021663,135.400432 L210.29059,147.428775 C206.166146,140.040127 201.699556,137.119289 194.826159,137.119289 C187.78047,137.119289 183.312254,141.587098 183.312254,147.428775 C183.312254,154.646349 187.78047,157.568406 198.089956,162.036622 L204.103924,164.614095 C224.553448,173.378641 236.067352,182.313448 236.067352,202.418387 C236.067352,224.071924 219.055137,235.927975 196.200432,235.927975 C173.860978,235.927975 159.425829,225.274311 152.381359,211.354413" fill="#000000"/>
        </svg>
    );
}

function PHPIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 32 32" version="1.1">
            <path d="M7.6,13.791a2.352,2.352,0,0,1,1.745.483,1.916,1.916,0,0,1,.207,1.66,2.78,2.78,0,0,1-.918,1.748,3.375,3.375,0,0,1-2.07.529h-1.4L6.024,13.8ZM2,22.677H4.3l.545-2.8H6.812A7.049,7.049,0,0,0,8.956,19.6a4.06,4.06,0,0,0,1.53-.918A4.585,4.585,0,0,0,11.93,16.1a3.288,3.288,0,0,0-.55-2.922A3.671,3.671,0,0,0,8.47,12.129H4.057Z" fill="#8993be"/>
            <path d="M13.617,9.323H15.9l-.553,2.8h2.031a3.956,3.956,0,0,1,2.645.669,2.213,2.213,0,0,1,.436,2.167l-.954,4.909H17.195l.908-4.667a1.267,1.267,0,0,0-.114-1.086,1.6,1.6,0,0,0-1.144-.286H15.022l-1.175,6.044H11.559Z" fill="#8993be"/>
            <path d="M25.539,13.791a2.352,2.352,0,0,1,1.745.483,1.916,1.916,0,0,1,.207,1.66,2.78,2.78,0,0,1-.918,1.748,3.375,3.375,0,0,1-2.074.529H23.1l.858-4.416Zm-5.6,8.886h2.3l.545-2.8h1.968A7.049,7.049,0,0,0,26.9,19.6a4.06,4.06,0,0,0,1.53-.918A4.585,4.585,0,0,0,29.869,16.1a3.288,3.288,0,0,0-.55-2.922,3.671,3.671,0,0,0-2.909-1.046h-4.42Z" fill="#8993be"/>
        </svg>
    );
}

function SymfonyIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 512 512" version="1.1">
            <g>
                <path display="inline" d="M255.991,0.5C114.889,0.5,0.5,114.882,0.5,255.985C0.5,397.105,114.889,511.5,255.991,511.5   C397.11,511.5,511.5,397.105,511.5,255.985C511.5,114.882,397.11,0.5,255.991,0.5z M393.788,148.373   c-11.83,0.416-19.993-6.649-20.376-17.391c-0.121-3.941,0.89-7.368,3.597-11.402c2.633-5.16,3.202-5.759,3.136-8.013   c-0.245-6.758-10.463-7.012-13.257-6.883c-38.354,1.272-48.464,53.028-56.656,95.12l-4.009,22.193   c22.082,3.231,37.759-0.752,46.509-6.412c12.31-7.988-3.452-16.205-1.473-25.296c2.029-9.265,10.451-13.739,17.143-13.918   c9.377-0.245,16.072,9.489,15.86,19.357c-0.329,16.322-21.981,38.74-65.293,37.821c-5.273-0.117-10.127-0.495-14.646-1.044   l-8.176,45.102c-7.311,34.133-17.024,80.79-51.795,121.493c-29.87,35.529-60.178,41.031-73.747,41.492   c-25.4,0.874-42.229-12.675-42.841-30.747c-0.582-17.507,14.891-27.071,25.051-27.388c13.549-0.449,22.93,9.373,23.292,20.692   c0.345,9.564-4.653,12.559-7.972,14.363c-2.204,1.784-5.527,3.605-5.402,7.544c0.079,1.68,1.884,5.563,7.522,5.381   c10.741-0.366,17.874-5.677,22.852-9.231c24.739-20.602,34.258-56.53,46.725-121.926l2.611-15.839   c4.259-21.271,8.967-44.974,16.161-68.602c-17.434-13.128-27.892-29.4-51.342-35.767c-16.077-4.37-25.883-0.661-32.77,8.055   c-8.162,10.321-5.455,23.753,2.429,31.629l13.029,14.405c15.96,18.455,24.705,32.813,21.408,52.113   c-5.211,30.847-41.951,54.491-85.379,41.143c-37.073-11.419-44.001-37.667-39.544-52.138c3.926-12.721,14.035-15.124,23.925-12.102   c10.587,3.285,14.741,16.156,11.71,26.023c-0.346,1.057-0.886,2.845-1.988,5.198c-1.234,2.729-3.505,5.119-4.495,8.292   c-2.379,7.768,8.259,13.282,15.67,15.561c16.588,5.106,32.777-3.567,36.878-16.991c3.813-12.338-3.988-20.945-7.224-24.243   l-15.707-16.817c-7.182-8.009-22.98-30.311-15.282-55.364c2.973-9.656,9.24-19.902,18.318-26.689   c19.179-14.288,40.034-16.642,59.896-10.924c25.687,7.386,38.038,24.381,54.048,37.496c8.953-26.269,21.375-51.992,40.047-73.703   c16.867-19.778,39.522-34.096,65.477-34.985c25.936-0.856,45.539,10.899,46.184,29.504   C414.153,132.455,409.604,147.846,393.788,148.373z"/>
            </g>
        </svg>
    );
}

function TwigIcon({ width, height }) {
    if(width && !height) height = width;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width??32} height={height??32} viewBox="0 0 32 32" version="1.1">
            <path d="M4.574,5.463c.262.4,2.5-1.608,4.454-1.161,2.061.472,4.014,3.724,4.848,13.7a40.18,40.18,0,0,1,3.541,3.61q.53.614,1.013,1.22a11.847,11.847,0,0,1,.229-1.4,12.3,12.3,0,0,1,1.981-4.4A19.151,19.151,0,0,0,17.272,7.9c-1.03-1.445-4.6-6.478-8.546-5.843C6.182,2.465,4.3,5.054,4.574,5.463Z" fill="#63bf6a"/>
            <path d="M24.4,30c-.32-2.567-.448-4.76-.5-6.449-.094-3.232.1-4.541.9-5.756.193-.295,1.288-1.975,2.58-1.863,1.466.128,2.213,2.414,2.362,2.337.175-.09-.36-3.543-2.532-4.431-2.6-1.063-6.312,2.07-7.8,5.154a12.223,12.223,0,0,0-.857,2.81,32.555,32.555,0,0,0-.71,8.2Z" fill="#74d74d"/>",
            <path d="M2.238,13.935c.145-.447,2.468-.259,4.54.293,2.5.666,7,2.344,11.651,8.606A12.544,12.544,0,0,1,20.279,30H10.386a21.875,21.875,0,0,0-.175-4.62,14.9,14.9,0,0,0-2.459-7.158C5.441,15.159,2.055,14.5,2.238,13.935Z" fill="#78dc50"/>
            <path d="M17.3,21.323a1.753,1.753,0,1,1-.513-1.24A1.748,1.748,0,0,1,17.3,21.323Z" fill="#fff"/>
            <path d="M21.975,21.323a1.753,1.753,0,1,1-.513-1.24A1.748,1.748,0,0,1,21.975,21.323Z" fill="#fff"/>
        </svg>
    );
}

// ---------------------------- Buttons

function CVButton() {
    return (
        <a className="btn btn-outline-main lexend"> {/* TODO : Href to CV */}
            <div className="d-flex flex-row flex-nowrap align-items-center justify-content-center gap-3">
                <svg className="i-document center-verticaly" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z" />
                </svg>
                Télécharger CV
            </div>
        </a>
    );
}

function ProjectsLinkButton() {
    return (
        <a className="btn btn-main lexend"> {/* TODO : Href to Projects */}
            <div className="d-flex flex-row flex-nowrap align-items-center justify-content-center gap-3">
                <svg className="i-code center-verticaly" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                    <path d="M14.1809 4.2755C14.581 4.3827 14.8185 4.79396 14.7113 5.19406L10.7377 20.0238C10.6304 20.4239 10.2192 20.6613 9.81909 20.5541C9.41899 20.4469 9.18156 20.0356 9.28876 19.6355L13.2624 4.80583C13.3696 4.40573 13.7808 4.16829 14.1809 4.2755Z" />
                    <path d="M16.4425 7.32781C16.7196 7.01993 17.1938 6.99497 17.5017 7.27206L19.2392 8.8358C19.9756 9.49847 20.5864 10.0482 21.0058 10.5467C21.4468 11.071 21.7603 11.6342 21.7603 12.3295C21.7603 13.0248 21.4468 13.5881 21.0058 14.1123C20.5864 14.6109 19.9756 15.1606 19.2392 15.8233L17.5017 17.387C17.1938 17.6641 16.7196 17.6391 16.4425 17.3313C16.1654 17.0234 16.1904 16.5492 16.4983 16.2721L18.1947 14.7452C18.9826 14.0362 19.5138 13.5558 19.8579 13.1467C20.1882 12.7541 20.2603 12.525 20.2603 12.3295C20.2603 12.1341 20.1882 11.9049 19.8579 11.5123C19.5138 11.1033 18.9826 10.6229 18.1947 9.91383L16.4983 8.387C16.1904 8.10991 16.1654 7.63569 16.4425 7.32781Z" />
                    <path d="M7.50178 8.387C7.80966 8.10991 7.83462 7.63569 7.55752 7.32781C7.28043 7.01993 6.80621 6.99497 6.49833 7.27206L4.76084 8.8358C4.0245 9.49847 3.41369 10.0482 2.99428 10.5467C2.55325 11.071 2.23975 11.6342 2.23975 12.3295C2.23975 13.0248 2.55325 13.5881 2.99428 14.1123C3.41369 14.6109 4.02449 15.1606 4.76082 15.8232L6.49833 17.387C6.80621 17.6641 7.28043 17.6391 7.55752 17.3313C7.83462 17.0234 7.80966 16.5492 7.50178 16.2721L5.80531 14.7452C5.01743 14.0362 4.48623 13.5558 4.14213 13.1467C3.81188 12.7541 3.73975 12.525 3.73975 12.3295C3.73975 12.1341 3.81188 11.9049 4.14213 11.5123C4.48623 11.1033 5.01743 10.6229 5.80531 9.91383L7.50178 8.387Z" />
                </svg>
                Voir Projets
            </div>
        </a>
    );
}