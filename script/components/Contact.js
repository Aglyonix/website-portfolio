function ContactPage() {
    return (
        <main role="main">
            <ContactHeader />
            <ContactMain />
        </main>
    );
}

function ContactHeader() {
    return (
        <header className="d-flex flex-column flex-nowrap align-items-start justify-content-center gap-2 h-100 page-title">
            <h1 className="lexend">Contact — À votre écoute</h1>
            <p className="lexend">Prêt à établir la connexion ? Je suis disponible pour échanger. Contactez-moi.</p>
        </header>
    );
}

function ContactMain() {

    React.useEffect(() => {
        const container = document.querySelector("#my-email-clip-btn");

        container.addEventListener('click', () => {
            navigator.clipboard.writeText("aeligj@gmail.com");
            
            const clip = container.querySelector(".bi-copy");
            const check = container.querySelector(".bi-check-lg");

            clip.classList.toggle("d-none");
            check.classList.toggle("d-none");
        });
    }, []);

    return (
        <main id="content" className="container my-5">
            <h1 className="lexend fw-bold mb-4">Mon adresse email</h1>
            <section id="my-email" className="input-group input-group-lg">
                <a href="mailto:aeligj@gmail.com" className="d-flex flex-row">
                    <div id="my-email-label">
                        <div className="content-sm">
                            <span className="lexend h4 ms-4">aeligj@gmail.com</span>
                        </div>
                        <div className="content-lg">
                            <span className="lexend h2 ms-5">aeligj@gmail.com</span>
                        </div>
                    </div>
                    <div id="my-email-send-btn" className="btn my-email-addon align-items-center justify-content-center p-0">
                        <i className="bi bi-send"></i>
                    </div>
                </a>
                <div id="my-email-clip-btn" className="btn my-email-addon align-items-center justify-content-center p-0">
                    <i className="bi bi-copy"></i>
                    <i className="bi bi-check-lg d-none"></i>
                </div>
            </section>
        </main>
    );
}

// Global expose
window.ContactPage = ContactPage;
window.ContactHeader = ContactHeader;
window.ContactMain = ContactMain;
