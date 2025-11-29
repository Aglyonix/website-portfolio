function MainPage() {
    return (
        <main role="main">
            <Banner />
        </main>
    );
}

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
                {iconMap["GithubIcon"]("focus-link")}
                {iconMap["LinkedinIcon"]("focus-link")}
            </nav>
        </div>
    );
}

// Global expose
window.MainPage = MainPage;
window.Banner = Banner;
window.ProfilImage = ProfilImage;
window.ProfilShowcase = ProfilShowcase;