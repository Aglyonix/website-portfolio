function ImageProcessor({ project }) {
    return (
        <main id="content" className="container my-5">
            <section className="sticky-top header-action bg-white d-flex gap-4 py-3">
                <div className="btn btn-hover-main lexend shadow">
                    <i className="bi bi-arrow-left me-2"></i>
                    Retour à la liste
                </div>
                <div className="btn btn-hover-main lexend shadow">
                    <i className="bi bi-github me-2"></i>
                    Code source
                </div>
            </section>
            <h1 className="lexend fw-normal mt-5">Présentation</h1>
            <p className="lexend">
                Un petit outil de traitement d’images en C++ qui charge/enregistre des <strong>.ppm</strong>,
                crée des composantes couleur, histogrammes, conversions gris/noir-et-blanc,
                transformations (rotation, zoom, crop), filtres et undo.
            </p>
            <p className="lexend">
                Code source et exemples disponibles sur <a className="link-main" href={project.github} target="_blank">GitHub — image-processor-cpp</a>.
            </p>
            <p className="lexend">Le projet a été réalisé par Aelig Jimenez (IUT Orsay) et contient des exemples et un exécutable dans le dépôt.</p>
            <p className="text-muted">
                Exécutable : <code>main.exe</code>
            </p>
            <h1 className="lexend fw-normal mt-5">Table des matières</h1>
            <ul className="lexend">
                <li>
                    <strong>Chargement / sauvegarde</strong> de fichiers .ppm.
                </li>
                <li>
                    <strong>Affichage RGB</strong> et création d’images composantes (R/G/B).
                    </li>
                <li>
                    <strong>Histogrammes</strong> (gris et couleur) avec plusieurs méthodes d’affichage.
                </li>
                <li>
                    <strong>Transformations</strong> : rotation, retournement, zoom, rognage.
                </li>
                <li>
                    <strong>Filtres</strong>, ajustement de luminosité/contraste et simulation daltonisme (approximative).
                </li>
            </ul>
        </main>
    );
}

// Global expose
window.ImageProcessor = ImageProcessor;