// Hash Getters

function getProjectIdFromHash() {
    const hash = window.location.hash;
    if (!hash.startsWith('#project=')) return null;
    return hash.slice('#project='.length);
}

// Component Loader

async function loadComponent(config) {
    if(!config.path || !config.component) return null;

    const name = config.component;
    if (window[name]) return window[name];

    await loadScript(window.project_components_dir + config.path);
    return window[name] || null;
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.type = 'text/babel';
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.body.appendChild(s);
        console.log('imported', src);
    });
}

// Global expose
window.getProjectIdFromHash = getProjectIdFromHash;
window.loadComponent = loadComponent;