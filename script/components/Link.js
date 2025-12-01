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
            {iconMap["GithubIcon"]()}
            {iconMap["LinkedinIcon"]()}
        </section>
    );
}

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

// Global expose
window.Credit = Credit;
window.SocialNetworks = SocialNetworks;
window.LinkPage = LinkPage;