function LoadingPage({ header }) {
    return (
        <main role="main">
            {header ? header : 
                <header className="d-flex flex-column flex-nowrap align-items-start justify-content-center gap-2 h-100 page-title">
                    <h1 className="lexend">Page — par défaut</h1>
                    <p className="lexend">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </header>
            }
            <LoadingPageMain />
        </main>
    );
}

function LoadingPageMain() {
    return (
        <main id="content" className="container my-5">
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </main>
    );
}

// Global expose
window.LoadingPage = LoadingPage;
window.LoadingPageMain = LoadingPageMain;