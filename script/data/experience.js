const experienceComponents = [
    { key: "experience.stage-ellipses",           path: "EllipsesStage.js",                 component: "EllipsesStage" },
    { key: "experience.alternance-ellipses",      path: "EllipsesAlternance.js",            component: "EllipsesAlternance" },
];

async function getExperienceInRegistry(key) {
    const response = await fetch(window.json_dir + 'experience.json');
    const json = await response.json();

    if (json.vedette && json.vedette.key === key) {
        return json.vedette;
    }
    return json.items.find(item => item.key === key) || null;
}

function getExperienceComponentByKey(key) {
    return experienceComponents.find(cmp => cmp.key === key);
}

// Global expose
window.getExperienceInRegistry = getExperienceInRegistry;
window.getExperienceComponentByKey = getExperienceComponentByKey;