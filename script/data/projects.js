const projectComponents = [
    { key: "project.algorithm.dungeon-generator",           path: "DungeonGenerator.js",            component: "DungeonGenerator" },
    { key: "project.application.image-processor-cpp",       path: "ImageProcessor.js",              component: "ImageProcessor" },
    { key: "project.application.python-console-poker",      path: "PokerPython.js",                 component: "PokerPython" },
    { key: "project.web.application-django-tickets",        path: "AppDjangoTickets.js",            component: "AppDjangoTickets" },
    { key: "project.web.website-portfolio",                 path: "WebsitePortfolio.js",            component: "WebsitePortfolio" },
    { key: "project.web.web-semantique-enrichi",            path: "WebSemantiqueEnrichi.js",        component: "WebSemantiqueEnrichi" },
];

async function getProjectInRegistry(key) {
    const response = await fetch(window.json_dir + 'projects.json');
    const json = await response.json();

    if (json.vedette && json.vedette.key === key) {
        return json.vedette;
    }
    return json.items.find(item => item.key === key) || null;
}

function getProjectComponentByKey(key) {
    return projectComponents.find(cmp => cmp.key === key);
}

// Global expose
window.getProjectInRegistry = getProjectInRegistry;
window.getProjectComponentByKey = getProjectComponentByKey;