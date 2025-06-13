class Json {
    
    constructor() {
        this.url = null;
        this.base_url = null;
    }

    setUrl(url) {
        this.url = url;
    }

    setBaseUrl(base_url) {
        this.base_url = base_url;
    }

    async json() {
        if(this.url === null) {
            throw TypeError("The given url is null");
        }

        if(this.base_url === null) {
            throw TypeError("The given base url is null");
        }

        try {
            const response = await fetch(this.base_url+this.url);

            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Fetch failed : ", error.message);
        }
    }

}

export default Json;