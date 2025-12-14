function AppDjangoTickets({ project }) {
    return <ProjectMain project={project} flag={{ message: `Encore un peu de patience ! Cette page est en développement.`, level: "info"}} />;
}

// Global expose
window.AppDjangoTickets = AppDjangoTickets;