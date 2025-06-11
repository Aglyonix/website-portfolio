class ContentItems {

    constructor(width, height = null) {
        if(width < 1) {
            throw TypeError(`This container has no enough column '${width}' to contain at least 1 item`);
        }
        if(height !== null && height < 1) {
            throw TypeError(`This container has no enough row '${height}' to contain at least 1 item`);
        }
        this.width = width;
        if(height === null) {
            this.height = 1;
            this.wrap = false;
        } else {
            this.height = height;
            this.wrap = true;
        }
    }

    build() {
        let container = document.createElement("div");
        container.classList.add("container");
        return container;
    }
}

const builder = {

    self : new Map(),

    builder : null,

    set : function(key) {
        this.builder = this.get(key);
    },

    get : function(key) {
        return this.self.get(key);
    },

    has : function(key) {
        return this.self.has(key);
    },

    add : function(key, value) {
        this.self.set(key, value);
    },

    init : function() {
        this.self.set("ContentItems", new ContentItems(5));
    },

    build : function() {
        return this.builder.build();
    }
}

builder.init();


export default builder;