import ContentGenerator from "./content_generator.js";

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
        this.add("nav-experiences", new ContentGenerator("assets/nav/experience.json", 1));
        this.add("nav-certificates", new ContentGenerator("assets/nav/certificate.json", 3));
        this.add("nav-skills", new ContentGenerator("assets/nav/skill.json", 5));
    },

    build : function() {
        if(this.builder === null) {
            throw TypeError("No builder set : You must set a builder before calling this method");
        }
        return this.builder.build();
    },
    
    build_table_of_content : function() {
        if(this.builder === null) {
            throw TypeError("No builder set : You must set a builder before calling this method");
        }
        return this.builder.table_of_content();
    }
}

builder.init();

export default builder;