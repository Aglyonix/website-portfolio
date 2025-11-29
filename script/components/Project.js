
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
    const vedetteRef = React.useRef(null);
    const vedetteInstance = React.useRef(null);
    const [vedetteVisible, setVedetteVisible] = React.useState(true);
    const vedetteVisibleRef = React.useRef(true)
    const [items, setItems] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [domains, setDomains] = React.useState([]);
    const [filterObject, setFilterObject] = React.useState({});
    const [filter, setFilter] = React.useState([]);
    const url = json_dir + "projects.json";
    
    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        setVedette(json.vedette);
        setItems(json.items);
    };

    async function fetchFilter() {
        const response = await fetch(json_dir + "filter.json");
        const json = await response.json();
        setTags(json.tags);
        setDomains(json.domains);
    };

    React.useEffect(() => {
        fetchItems();
        fetchFilter();

        if (vedetteRef.current && !vedetteInstance.current) {
            vedetteInstance.current = window.bootstrap.Collapse.getOrCreateInstance(vedetteRef.current);
            vedetteRef.current.classList.add("show");
        }

        const btn = document.querySelector("#filter-btn");

        btn.addEventListener("click", () => {
            btn.classList.toggle("selected");
        });

        btn.addEventListener("click", () => {
            if (!vedetteVisibleRef.current) return;
            vedetteInstance.current?.toggle();
        });
    }, []);

    React.useEffect(() => {
        if (items && vedette && tags && domains) {
            const tagsSet = new Set(items.flatMap(p => p.tags || []));
            (vedette?.tags || []).forEach(tag => { tagsSet.add(tag); });
            const domainsSet = new Set(items.flatMap(p => p.domains || []));
            
            setFilterObject({
                tags : tags.map(
                    group => ({
                        key : group.key,
                        familly : group.familly,
                        items: group.items.filter(item => tagsSet.has(item.name))
                    })
                ).filter(group => group.items.length > 0),
                domains : domains.map(
                    group => ({
                        key : group.key,
                        familly : group.familly,
                        items: group.items.filter(item => domainsSet.has(item.name))
                    })
                )
            });
        }
    }, [items, vedette, tags, domains]);

    React.useEffect(() => {
        if (vedette && vedetteInstance.current) {
            let match = vedette.title.toLowerCase().includes(query.toLowerCase());
            match &&= filter.length === 0 || filter.every(f => (vedette.tags || []).includes(f) || (vedette.domains || []).includes(f));
            setVedetteVisible(match);

            const btn = document.querySelector("#filter-btn");
            const target = document.querySelector(btn.dataset.bsTarget);

            if (!match) {
                vedetteInstance.current.hide();
            } else {
                if(!target.classList.contains("show")) {
                    vedetteInstance.current.show();
                }
            }
        }
    }, [vedette, query, filter]);

    React.useEffect(() => {
        vedetteVisibleRef.current = vedetteVisible;
    }, [vedetteVisible]);

    // Apply the filter on items
    let filtered = items.filter(project => {
        const matchQuery = project.title.toLowerCase().includes(query.toLowerCase());

        const matchTags =
            filter.length === 0 ||
            filter.every(f =>
                (project.tags || []).includes(f) || (project.domains || []).includes(f)
            );

        return matchQuery && matchTags;
    });

    // Handle filter options onclick
    const filterSelect = (element, name) => {
        element.classList.toggle('selected');

        if (filter.includes(name)) {
            setFilter(filter.filter(f => f !== name));
        } else {
            setFilter([...filter, name]);
        }
    };

    // Setup project cards
    const LargeCard = (item) => <ProjectItemLarge item={item} key={item.key} />;
    const MediumCard = (item) => <ProjectItemMedium item={item} key={item.key} />;
    const SmallCard = (item) => <ProjectItemSmall item={item} key={item.key} />;
    const cards = [SmallCard, MediumCard, MediumCard, LargeCard, LargeCard];

    return (
        <main id="content" className="container my-5">
            <h1 className="mb-4">Mes projets</h1>

            {/* Barre de recherche */}
            <section className="d-flex flex-row align-items-center gap-4 mb-5">
                <div id="filter-btn" type="button" data-bs-toggle="collapse" data-bs-target="#filter-container" aria-expanded="false" aria-controls="filter-container">
                    {iconMap["FilterIcon"](32, 32)}
                </div>
                <input type="text" className="form-control" placeholder="Rechercher un projet..." value={query} onChange={e => setQuery(e.target.value)} />
            </section>

            <section id="project-top-content">
                {/* Filter */}
                <section id="filter-container" className="collapse top-content px-3 bg-white">
                    <div className="row">

                        <div className="filter-group col">
                        {filterObject?.tags && filterObject.tags.map((group) => 
                            <div className="filter-familly" key={group.key}>
                                <p className="lexend mb-2">{group.familly}</p>
                                <div className="d-flex flex-wrap gap-3">
                                {group.items.map((tag) => 
                                    <FilterOption item={tag} onclick={filterSelect} key={group.key + "-" + tag.key} />
                                )}
                                </div>
                            </div>
                        )}</div>

                        <div className="filter-group col">
                        {filterObject?.domains && filterObject.domains.map((group) => 
                            <div className="filter-familly" key={group.key}>
                                <p className="lexend mb-2">{group.familly}</p>
                                <div className="d-flex flex-wrap gap-3">
                                {group.items.map((domain) => 
                                    <FilterOption item={domain} onclick={filterSelect} key={group.key + "-" + domain.key} />
                                )}
                                </div>
                            </div>
                        )}</div>
                        
                    </div>
                </section>
                {/* Projet vedette */}
                <section id="vedette" ref={vedetteRef} className="collapse show px-3">
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
                {filtered ?
                    filtered.length > 0 ?
                    <CardGrid id="projects-grid" objects={filtered} card={cards} columns={[1, 1, 2, 2, 2]} />
                    :
                    <div className="alert alert-light" role="alert">
                        Aucun projet ne correspond à vos critères de recherche.
                    </div>
                : null }
            </section>
        </main>
    );
}

// ---------------------------- Project Filter

function FilterOption({ item, onclick }) {
    let attr = "filter-option ";
    attr += item.negative ? "black" : "white";
    attr += " badge rounded-pill bg-light text-muted";
    
    const option = React.useRef(null);

    React.useEffect(() => {
        if (option.current) {
            option.current.style.setProperty("--data-color", item.color);
        }
    }, [item.color, item.name]);

    return (<span ref={option} className={attr} onClick={() => {onclick(option.current, item.name)}} data-color={item.color}>{item.name}</span>);
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

// Global expose
window.ProjectsPage = ProjectsPage;
window.ProjectsHeader = ProjectsHeader;
window.ProjectsMain = ProjectsMain;

window.FilterOption = FilterOption;

window.ProjectItemVedette = ProjectItemVedette;
window.ProjectItemVedetteSmall = ProjectItemVedetteSmall;
window.ProjectItemLarge = ProjectItemLarge;
window.ProjectItemMedium = ProjectItemMedium;
window.ProjectItemSmall = ProjectItemSmall;