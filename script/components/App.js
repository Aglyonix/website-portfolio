function App() {
    return ( <AppAssembler /> );
}

function AppAssembler() {

    let main = <MainPage />;

    if(body.id === "page-bio") {
        main = <BioRouter />;
    }

    if(body.id === "page-projects") {
        main = <ProjectRouter />;
    }

    if(body.id === "page-contact") {
        main = <ContactPage />;
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

// Global expose
window.App = App;
window.AppAssembler = AppAssembler;