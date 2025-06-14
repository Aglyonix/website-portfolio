import Json from "../Utils/json.js";
import base_url from "../settings.js";

export default class ContentGenerator extends Json {

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
            let buffer = "";

            if(typeof this.data["container"] !== 'undefined') {
                if(typeof this.data["container"]["head"] === 'undefined') {
                    throw TypeError(`No param head found in the container at ${this.url}`);
                }
                if(typeof this.data["container"]["foot"] === 'undefined') {
                    throw TypeError(`No param foot found in the container at ${this.url}`);
                }
                buffer = this.data["container"]["head"];
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

                buffer += block;
            });

            if(typeof this.data["container"] !== 'undefined') {
                buffer += this.data["container"]["foot"];
            }

            return buffer;
        } catch (error) {
            console.error(error.message);
        }
    }

    async table_of_content() {
        try {
            this.data = await this.json();

            if(typeof this.data["table-of-content"] === 'undefined') {
                console.log(`No param table-of-content found in ${this.url}`);
            }

            if(typeof this.data["table-of-content"].length === 0) {
                return "";
            }

            let buffer = "";

            buffer = this.#build_table(this.data["table-of-content"], buffer);

            return buffer;
        } catch (error) {
            console.error(error.message);
        }
    }

    #build_table(items, buffer) {
        items.forEach(item => {
            if(typeof item["title"] === 'undefined') {
                throw TypeError(`No param title found in ${this.url} for item : ${item}`);
            }
            if(typeof item["id"] === 'undefined') {
                throw TypeError(`No param id found in ${this.url} for item : ${item}`);
            }

            buffer += `<li><a href="#${item["id"]}"`;

            if(typeof item["class"] !== 'undefined') {
                buffer += ` class="${item["class"]}"`;
            }

            buffer += `>${item["title"]}</a>`;

            if(typeof item["children"] !== 'undefined' && item["children"].length > 0) {
                buffer += `<ul>`;
                buffer = this.#build_table(item["children"], buffer);
                buffer += `</ul>`;
            }

            buffer += `</li>`;
        });

        return buffer;
    }
}