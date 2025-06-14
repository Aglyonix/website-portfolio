import builder from "./builder.js";

export default class InnerNavigation {

    constructor(nav, table_of_content = null) {
        if(!nav.classList.contains("inner-nav")) {
            throw TypeError("The given element doesn't contain the class 'inner-nav'");
        }

        this.nav = nav;
        this.items = this.nav.querySelectorAll(".inner-nav > .item-nav");
        this.active = this.nav.querySelector(".inner-nav > .item-nav.active");
        
        if(!nav.hasAttribute("for")) {
            throw SyntaxError("The attribute 'for' is missing : The given element need a for attribute the point to a container. Your element must look like this : <element ... for\"id-to-another-element\">");
        }

        this.id = nav.getAttribute("for");

        if(this.id === null || this.id === "") {
            throw TypeError("The given id in the attribute 'for' musn't be empty");
        }

        this.container = document.getElementById(this.id);

        this.table = table_of_content;

        if(this.container === null) {
            throw TypeError(`No container of this name : No container '${this.id}' was found, check the syntax again, or create the container`);
        }

        this.builder = builder;

        this.#init();
    }

    navigation(item) {
        if(item !== this.active) {
            item.classList.add("active");

            if(this.active !== null) {
                this.active.classList.remove("active");
            }

            this.active = item;

            this.#clear();
            this.#build();
        }
    }

    async #init() {
        try {
            this.#setup();
        } catch (error) {
            console.error(error.message);
        }
    }

    #setup() {
        this.items.forEach((item) => {
            if(item !== this.active) {
                item.classList.remove("active");
            }
            
            if(!item.hasAttribute("for")) {
                throw SyntaxError("The attribute 'for' is missing : The nav item need a for attribute to identify a route. Your element must look like this : <element class=\"item-nav\" ... for\"id-to-another-element\">");
            }

            item.addEventListener("click", () => {this.navigation(item);})

            if(this.builder.has([item.getAttribute("for")])) {
                throw TypeError(`No id of this name : No id '${item.getAttribute("for")}' was found, check the syntax again, or add the id in your builder`);
            }
        });
    }

    async #build() {
        this.#clear();

        if(this.builder.has(this.active.getAttribute("for"))) {
            this.builder.set(this.active.getAttribute("for"));
        } else {
            throw TypeError(`No id of this name : No id '${this.active.getAttribute("for")}' was found, check the syntax again, or add the id in your builder`);
        }
        
        const buffer = await this.builder.build();

        this.container.insertAdjacentHTML('beforeend', buffer);

        if(this.table !== null) {
            const table = await this.builder.build_table_of_content();

            this.table.insertAdjacentHTML('beforeend', table);
        }

        this.container.classList.add("fullfilled");
        this.container.scrollIntoView({ behavior: "smooth" });
    }

    #clear() {
        this.container.classList.remove("fullfilled");

        while(this.container.hasChildNodes()) {
            this.container.firstChild.remove();
        }

        if(this.table !== null) {
            while(this.table.hasChildNodes()) {
                this.table.firstChild.remove();
            }
        }
    }
}