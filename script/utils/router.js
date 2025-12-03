// Hash Getters

function getProjectIdFromHash() {
    const hash = window.location.hash;
    if (!hash.startsWith('#project=')) return null;
    return hash.slice('#project='.length);
}

function getExperienceIdFromHash() {
    const hash = window.location.hash;
    if (!hash.startsWith('#experience=')) return null;
    return hash.slice('#experience='.length);
}

// Component Loader

async function loadComponent(root, config) {
    if(!config.path || !config.component) return null;

    const name = config.component;
    if (window[name]) return window[name];
    
    await loadScript(root + config.path);
    if(!window[name]) return null;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return window[name];
}

async function loadScript(src) {
    const script = await fetch(src).then(r => r.text());

    const compiled = Babel.transform(script, {
        presets: ["react", "env"]
    }).code;

    const node = document.createElement("script");
    node.type = "text/javascript";
    node.text = compiled;
    document.body.appendChild(node);
}


// API

async function doFileExist(path) {
    try {
        const res = await fetch(path, { method: 'HEAD' });
        return res.ok;
    } catch {
        return false;
    }
}

// Global expose
window.getProjectIdFromHash = getProjectIdFromHash;
window.getExperienceIdFromHash = getExperienceIdFromHash;

window.loadComponent = loadComponent;

window.doFileExist = doFileExist;