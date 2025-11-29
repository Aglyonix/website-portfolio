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

// Global expose
window.FooterPage = FooterPage;