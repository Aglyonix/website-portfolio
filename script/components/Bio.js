// ---------------------------- Bio Router

function BioRouter() {
    const [Component, setComponent] = React.useState(null);
    const [config, setConfig] = React.useState(null);
    const [experience, setExperience] = React.useState(null);
    const [key, setKey] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [debug] = React.useState(false);
    const [ressource, setRessource] = React.useState(false);

    React.useEffect(() => {
        function onHashChange() {
            setKey(getExperienceIdFromHash());
        }

        window.addEventListener('hashchange', onHashChange);

        setKey(getExperienceIdFromHash());

        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    React.useEffect(() => {
        if (!key) {
            setConfig(null);
            setExperience(null);
            setComponent(null);
            return;
        }

        const cfg = getExperienceComponentByKey(key);

        if (!cfg) {
            setComponent(null);
            setExperience(null);
            setConfig(null);
            return;
        }

        setConfig(cfg);
        setLoading(true);
        setRessource(false);

        (async () => {
            const exp = await getExperienceInRegistry(key);
            setExperience(exp);

            const exist = await doFileExist(window.experience_components_dir + cfg.path)
            setRessource(exist);

            const cmp = await loadComponent(window.experience_components_dir, cfg);
            setComponent(() => cmp || null);

            setLoading(false);
        })();
    }, [key]);

    if (debug) {
        console.log("Router key :", key);
        console.log("Router config :", config);
        console.log("Router experience :", experience);
        console.log("Router Component :", Component);
        console.log("Router ressource :", ressource);
        console.log("");
    }

    // Default Bio Page
    if (!key) return <BioPage />;

    // Loading Page
    if (loading) return <LoadingPage header={<BioHeader />} />;

    // Bio Page with "Experience not found" Error
    if (!loading && !experience) return <BioPage flag={{ message: `Aucune experience trouvé au nom de ${key}`, level: "danger"}} />;

    // Bio Page with "Experience page doesn't exist" Error
    if (!config.path) return <ExperiencePage experience={experience} flag={{ message: `Aucune ressource spécifiée pour cette experience`, level: "danger"}} />;

    // Bio Page with "Project page not found" Error
    if (!ressource) return <ExperiencePage experience={experience} flag={{ message: `Aucune ressource trouvée vers ${window.experience_components_dir + config.path}`, level: "danger"}} />;

    // Bio Page with "Experience page undefined" Warnning
    if (!Component) return <ExperiencePage experience={experience} flag={{ message: `La page ${config.component} n'existe pas`, level: "danger"}} />;

    // Experience Page
    return (
        <main role="main">
            <ExperienceHeader experience={experience} />
            <Component experience={experience} />
        </main>
    );
}

// ---------------------------- Bio Page

function BioPage({ flag }) {
    return (
        <main role="main">
            <BioHeader />
            <BioMain flag={flag}/>
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

function BioMain({ flag }) {
    return (
        <main id="content" className="container my-5">
            <section>
                {flag ? <div className={`alert alert-${flag.level} mb-5`} role="alert">
                   {flag.message}
                </div> : null}
            </section>
            <BioContent />
        </main>
    );
}

// ---------------------------- Experience Page

function ExperiencePage({ experience, flag }) {
    return (
        <main role="main">
            <ExperienceHeader experience={experience} />
            <ExperienceMain experience={experience} flag={flag} />
        </main>
    );
}

function ExperienceHeader({ experience }) {
    return (
        <header className="d-flex flex-column flex-nowrap align-items-start justify-content-center gap-2 h-100 page-title">
            <h1 className="lexend">{experience.title}</h1>
            <p className="lexend">{experience.date}</p>
        </header>
    );
}

function ExperienceMain({ experience, flag }) {
    return (
        <main id="content" className="container my-5">
            <section>
                {flag ? <div className={`alert alert-${flag.level} mb-5`} role="alert">
                   {flag.message}
                </div> : null}
            </section>
            <p className="lexend">{experience.caption}</p>
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

function BioAboutMe() {
    return (
        <section id="about-me" className="w-100">
            <h1 className="lexend fw--normal w-100 text-center">A propos</h1>
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

function CVButton() {
    return (
        <a href="../assets/pdf/Aëlig JIMENEZ CV.pdf" className="btn btn-outline-main w-100 lexend">
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
        <a href="projects.html" className="btn btn-main w-100 lexend">
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

// ---------------------------- Interest

function BioInterest() {
    return (
        <section id="interests" className="w-100">
            <h1 className="lexend fw--normal w-100 text-center">Centre d'intérêts</h1>
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
                    row.push(<BioInterestMediumItem item={item} key={item.key + ".md"} />);
                    i++;
                }

                pack.push(<div className="card-group" key={"interests-row.md." + i}>{row}</div>);
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

function BioInterestMediumItem({ item }) {
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
                    row.push(<BioInterestLargeItem item={item} key={item.key + ".lg"} />);
                    i++;
                }

                pack.push(<div className="card-pack row" key={"interests-row.lg." + i}>{row}</div>);
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

function BioInterestLargeItem({ item }) {
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

// ---------------------------- Showcase

function BioShowcase() {
    return (
        <section id="showcase" className="w-100">
            <h1 className="lexend fw--normal w-100 text-center">Showcase</h1>
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
                <article key={item.key + ".panel"} id={item.target} className={item.active ? attr + " show active" : attr} role="tabpanel" aria-labelledby={item.idname}>
                    {bioMap[item.react]}
                </article>
            )) : null}
        </section>
    );
}

// ---------------------------- Panes

// Experience Content
function ExperiencePane() {
    const head = (item) => <BioShowcaseItemHead item={item} />;
    const body = (item) => <BioShowcaseItemBody item={item} />;

    return(
        <>
            <section id="education">
                <h1 className="lexend fw--normal w-100 text-center mb-3">Education</h1>
                <div className="content-sm">
                    <ListGroupWallet id="education-list-sm" json="education.json" body={body} head={head} />
                </div>
                <div className="content-lg d-flex flex-row gap-2">
                    <ListGroupWallet id="education-list-lg" json="education.json" body={body} head={head} groups="2" />
                </div>
            </section>
            <section id="experience">
                <h1 className="lexend fw--normal w-100 text-center mt-5 mb-3">Experience</h1>
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
                    <small className="text-muted">— {item.date}</small>
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
            {item.key.startsWith('experience.') ?
            <a href={`#experience=${item.key}`} className="btn btn-main lexend mt-3 px-4">
                Voir
                <i className="bi bi-rocket-takeoff ms-3"></i>
            </a> : null}
            {item.details ?
            <ul className="list-group list-group-flush gap-1 mt-3">
                {item.details.map((detail) => (
                <BioShowcaseListItem detail={detail} key={item.key + "." + detail.key}/>
                ))}
            </ul> : null}
        </>
    );
}

function BioShowcaseListItem({ detail }) {
    return (
        <li className="list-group-item border-0 p-0">
            {detail.text}
            {detail.muted ? <span className="text-muted"> — {detail.muted}</span> : <></> }
            {detail.light ? <span className="text-main"> — {detail.light}</span> : <></> }
        </li>
    );
}

// Certificates Content
function CertificatesPane() {
    return(
        <>
            <h1 id="certificates" className="lexend fw--normal w-100 text-center mb-3">Diplômes</h1>
            <div className="d-flex w-100 justify-content-center">
                <CardCarousel id="carousel-certificates" json="certificate.json" />
            </div>
        </>
    );
}

// TechStack Content
function TechStackPane() {
    const card = (item) => <TechStackCard item={item} key={item.key} />;

    return(
        <>
            <h1 id="tech-stacks" className="lexend fw--normal w-100 text-center mb-3">Tech Stack</h1>
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
                <h6 className="card-title lexend black mt-2">{item.title}</h6>
            </div>
        </div>
    );
}

const bioMap = {
    ExperiencePane: <ExperiencePane />,
    CertificatesPane: <CertificatesPane />,
    TechStackPane: <TechStackPane />
};

// Global expose
window.BioRouter = BioRouter;

window.ExperiencePage = ExperiencePage;
window.ExperienceHeader = ExperienceHeader;
window.ExperienceMain = ExperienceMain;

window.BioPage = BioPage;
window.BioHeader = BioHeader;
window.BioMain = BioMain;

window.BioContent = BioContent;
window.BioAboutMe = BioAboutMe;
window.CVButton = CVButton;
window.ProjectsLinkButton = ProjectsLinkButton;

window.BioInterest = BioInterest;
window.BioInterestMedium = BioInterestMedium;
window.BioInterestMediumItem = BioInterestMediumItem;
window.BioInterestLarge = BioInterestLarge;
window.BioInterestLargeItem = BioInterestLargeItem;

window.BioShowcase = BioShowcase;
window.BioShowcaseNav = BioShowcaseNav;
window.BioShowcaseNavItem = BioShowcaseNavItem;
window.BioShowcaseContent = BioShowcaseContent;

window.ExperiencePane = ExperiencePane;
window.BioShowcaseItemHead = BioShowcaseItemHead;
window.BioShowcaseItemBody = BioShowcaseItemBody;
window.BioShowcaseListItem = BioShowcaseListItem;

window.CertificatesPane = CertificatesPane;

window.TechStackPane = TechStackPane;
window.TechStackCard = TechStackCard;

window.bioMap = bioMap;