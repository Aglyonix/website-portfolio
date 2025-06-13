import Json from "../Utils/json.js";
import base_url from "../settings.js";

class ContentItems extends Json {

    constructor(url, col, row = null) {
        super();

        if(col < 1) {
            throw TypeError(`This container has no enough column '${col}' to contain at least 1 item`);
        }
        if(row !== null && row < 1) {
            throw TypeError(`This container has no enough row '${row}' to contain at least 1 item`);
        }

        this.col = col;
        if(row === null) {
            this.row = 1;
            this.wrap = false;
        } else {
            this.row = row;
            this.wrap = true;
        }

        this.setBaseUrl(base_url);
        this.setUrl(url);
    }

    async build() {
        try {
            this.data = await this.json();

            this.html = this.data["html"];
            this.items = this.data["items"];  
            this.buffer = "";

            if(typeof this.data["container"] !== 'undefined') {
                if(typeof this.data["container"]["head"] === 'undefined') {
                    throw TypeError(`No param head found in the container at ${this.url}`);
                }
                if(typeof this.data["container"]["foot"] === 'undefined') {
                    throw TypeError(`No param foot found in the container at ${this.url}`);
                }
                this.buffer = this.data["container"]["head"];
            }

            if(typeof this.html === 'object') {
                let code = "";
                this.html.forEach(line => {
                    code += line;
                });
                this.html = code;
            }

            if(typeof this.html === 'undefined' || this.html === null) {
                throw TypeError(`No param html found in ${this.url}`);
            }

            if(this.html === 0) {
                throw TypeError(`No text found in html at ${this.url}`);
            }

            if(typeof this.items === 'undefined' || this.items === null) {
                throw TypeError(`No param items found in ${this.url}`);
            }

            this.params = Array.from(this.html.matchAll(":[A-Za-z0-9-]+"), (match) => match = {
                name : match[0],
                index : match["index"],
                length : match[0].length
            });

            if (this.params === null) {
                this.params = [];
            }

            this.items.forEach(args => {

                if(this.params.length != Object.values(args).length) {
                    throw TypeError(`No enough args set in ${this.args} : expected ${this.params}`);
                }

                let diff = 0;
                let block = this.html;

                this.params.forEach(param => {
                    param.name = param.name.substring(1);

                    block = block.slice(0, param.index + diff) + args[param.name] + block.slice(param.index + diff + param.length);
                    diff += args[param.name].length - param.length;
                });

                this.buffer += block;
            });

            if(typeof this.data["container"] !== 'undefined') {
                this.buffer += this.data["container"]["foot"];
            }

            return this.buffer;
        } catch (error) {
            console.error(error.message);
        }
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
        this.self.set("ContentItems", new ContentItems("assets/nav/content.json",5));
    },

    build : function() {
        return this.builder.build();
    }
}

builder.init();

export default builder;