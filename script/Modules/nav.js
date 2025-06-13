import Json from "../Utils/json.js";
import builder from "../Items/ContentItems.js";
import base_url from "../settings.js";

const route_url = "assets/nav/routing.json";

const nav = {

    init : function() {
        let navs = document.querySelectorAll(".inner-nav");

        navs.forEach((nav) => {
            new InnerNavigation(nav);
        })
    }
}

class InnerNavigation extends Json {

    constructor(nav) {
        super();

        if(!nav.classList.contains("inner-nav")) {
            throw TypeError("The given element doesn't contain the class 'inner-nav'");
        }

        this.setBaseUrl(base_url);
        this.setUrl(route_url);

        this.nav = nav;
        this.items = nav.querySelectorAll(".inner-nav > .item-nav");
        this.active = nav.querySelector(".inner-nav > .item-nav.active");
        
        if(!nav.hasAttribute("for")) {
            throw SyntaxError("The attribute 'for' is missing : The given element need a for attribute the point to a container. Your element must look like this : <element ... for\"id-to-another-element\">");
        }

        this.id = nav.getAttribute("for");

        if(this.id === null || this.id === "") {
            throw TypeError("The given id in the attribute 'for' musn't be empty");
        }

        this.container = document.getElementById(this.id);

        if(this.container === null) {
            throw TypeError(`No container of this name : No container '${this.id}' was found, check the syntax again, or create the container`);
        }

        this.route = null;
        this.builder = builder;

        this.#init();
    }

    navigation(item) {
        if(!(item === this.active)) {
            item.classList.add("active");

            this.active.classList.remove("active");
            this.active = item;
        }
    }

    async #init() {
        try {
            this.route = await this.json();
            this.#setup();
            this.#build();
        } catch (error) {
            console.error(error.message);
        }
    }

    #setup() {
        if(this.active === null) {
            this.active = this.nav.querySelector(".inner-nav > .item-nav");
            this.active.classList.add("active");
        }

        this.items.forEach((item) => {
            if(!(item === this.active)) {
                item.classList.remove("active");
            }
            
            if(!item.hasAttribute("for")) {
                throw SyntaxError("The attribute 'for' is missing : The nav item need a for attribute to identify a route. Your element must look like this : <element class=\"item-nav\" ... for\"id-to-another-element\">");
            }

            item.addEventListener("click", () => {this.navigation(item);})

            if(typeof this.route[item.getAttribute("for")] === 'undefined') {
                throw TypeError(`No route of this name : No route '${item.getAttribute("for")}' was found, check the syntax again, or add the route in your routing json file`);
            }
        });
    }

    async #build() {
        this.#clear();

        if(this.builder.has(this.route[this.active.getAttribute("for")])) {
            this.builder.set(this.route[this.active.getAttribute("for")]);
        } else {
            throw new TypeError(`No content items of this name : No content items named '${this.route[this.active.getAttribute("for")]}' was found, check the syntax again, or add the route in your routing json file`);
        }

        const buffer = await this.builder.build();
        ;
        this.container.insertAdjacentHTML('beforeend', buffer);
    }

    #clear() {
        while(this.container.hasChildNodes()) {
            this.container.firstChild.remove();
        }
    }
}

export default nav;