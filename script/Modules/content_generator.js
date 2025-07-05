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

        // TODO : Wrapper view and mechanism
        this.col = col;
        if(row === null) {
            this.row = 1;
            this.wrap = false;
        } else {
            this.row = row;
            this.wrap = true;
        }

        this.predefined = ["flex-size"];

        this.setBaseUrl(base_url);
        this.setUrl(url);
    }

    async build() {
        try {
            this.data = await this.json();

            this.html = this.data["template"];
            this.items = this.data["items"];  
            let buffer = "";

            let gap = "gap-small";

            if(typeof this.data["settings"] !== 'undefined' && typeof this.data["settings"]["gap"] !== 'undefined') {
                gap = this.data["settings"]["gap"];
            }

            buffer = `<div class="builder-container ${gap} padding-left-balance padding-right-balance">`;

            if(typeof this.html === 'undefined' || this.html === null) {
                throw TypeError(`No param html found in ${this.url}`);
            }

            if(this.html === 0) {
                throw TypeError(`No text found in html at ${this.url}`);
            }

            if(typeof this.items === 'undefined' || this.items === null) {
                throw TypeError(`No param items found in ${this.url}`);
            }

            if(typeof this.html === 'object') {
                let code = "";
                this.html.forEach(line => {
                    code += line;
                });
                this.html = code;
            }

            this.params = Array.from(this.html.matchAll(":[A-Za-z0-9-]+"), (match) => match = {
                name : match[0],
                index : match["index"],
                length : match[0].length
            });

            if (this.params === null) {
                this.params = [];
            } else {
                this.params.forEach(param => {
                    param.name = param.name.substring(1);
                });
            }
            
            let count = 0;
            let row = 0;

            this.items.forEach(args => {

                this.predefined.forEach(predefined => {
                    if(typeof args[predefined] !== 'undefined') {
                        throw TypeError(`You cannot set predefined param '${predefined}' in ${this.url}`);
                    }
                });

                let predefinedfound = 0;

                this.params.forEach(param => {
                    if(this.predefined.includes(param.name)) {
                        predefinedfound++;
                    }
                });

                if(count%this.col === 0) {
                    if(this.items.length - count < this.col) {
                        buffer += `<div class="row ${gap} justify-center">`;
                    } else {
                        buffer += `<div class="row ${gap}">`;
                    }
                }

                let diff = 0;
                let block = this.html;

                this.params.forEach(param => {

                    if(this.predefined.includes(param.name)) {

                        if(param.name === "flex-size") {
                            if(this.items.length%this.col !== 0 && count >= this.items.length - this.items.length%this.col) {
                                let maxWidth = 100 / this.col + "%";
                                let style = ` style="--flex-size : calc(${maxWidth} - calc(var(--flex-gap)*${this.col-1} / ${this.col}));"`;

                                block = block.slice(0, param.index + diff) + style + block.slice(param.index + diff + param.length);
                                diff += style.length - param.length;
                            } else {
                                block = block.slice(0, param.index + diff) + block.slice(param.index + diff + param.length);
                                diff += 0 - param.length;
                            }
                        }
                    } else {

                        if(typeof args[param.name] !== 'undefined' && typeof args[param.name] === 'string') {

                            block = block.slice(0, param.index + diff) + args[param.name] + block.slice(param.index + diff + param.length);
                            diff += args[param.name].length - param.length;

                        } else if(typeof args[param.name] !== 'undefined' && typeof args[param.name] === 'object') {

                            let code = "";

                            args[param.name].forEach(line => {
                                code += line;
                            });

                            block = block.slice(0, param.index + diff) + code + block.slice(param.index + diff + param.length);
                            diff += code.length - param.length;
                        }
                    }
                });

                if(count === 5) {
                    console.log(block);
                }

                count++;
                buffer += block;

                if(count%this.col === 0) {
                    if (count > 0) {
                        row++;
                    }
                    if(row > 0) {
                        buffer += "</div>";
                    }
                }
            });

            if(count%this.col !== 0) {
                buffer += "</div>";
            }

            buffer += "</div>";

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