const app = document.getElementById('app');
const body = document.getElementsByTagName('body')[0];

const root_url = body.id === "page-main" ? "view/" : "";
const asset_dir = body.id === "page-main" ? "assets/" : "../assets/";
const icon_dir = asset_dir + "icons/";
const json_dir = asset_dir + "json/";
const svg_dir = asset_dir + "svg/";
const img_dir = asset_dir + "images/";

const project_components_dir = (body.id === "page-main" ? "script/" : "../script/") + "components/projects/";

const breaks = [
    {attr: "content-sm"},
    {attr: "content-md"},
    {attr: "content-lg"},
    {attr: "content-xl"},
    {attr: "content-xxl"}
];

const pages = [
    { key: "page.bio",      name: "Bio",      path: "bio.html",       table: "bio-nav.json",  active: body.id === "page-bio" },
    { key: "page.projects", name: "Projets",  path: "projects.html",  table: "",              active: body.id === "page-projects" },
    { key: "page.contact",  name: "Contact",  path: "contact.html",   table: "",              active: body.id === "page-contact" }
];

// Global expose
window.app = app;
window.body = body;

window.root_url = root_url;
window.asset_dir = asset_dir;
window.icon_dir = icon_dir;
window.svg_dir = svg_dir;
window.img_dir = img_dir;

window.project_components_dir = project_components_dir;

window.breaks = breaks;
window.pages = pages;