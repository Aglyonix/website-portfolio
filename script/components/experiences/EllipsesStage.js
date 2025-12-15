function EllipsesStage({ experience }) {
    return <ExperienceMain experience={experience} flag={{ message: `Encore un peu de patience ! Cette page est en développement.`, level: "info"}} />;
}

// Global expose
window.EllipsesStage = EllipsesStage;