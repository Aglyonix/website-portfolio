function ListGroupWallet({ id , json, body, head, groups }) {
    const url = json_dir + json;
    const [items, setItems] = React.useState(null);
    const [grid, setGrid] = React.useState([]);
    if(!groups) groups = 1;
    
    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        const items = json["items"];
        return items;
    };

    const expand_desc = (e) => {
        let elem = e.target;

        while(elem && !elem.matches("li:not(.description)")) {
            elem = elem.parentNode;
        }

        if(!elem.nextSibling.classList.contains("expanded")) {
            elem.nextSibling.classList.add("expanded");
        } else {
            elem.nextSibling.classList.remove("expanded");
        }
    }

    React.useEffect(() => {
        fetchItems().then(result => setItems(result));
    }, []);
        
    React.useEffect(() => {
        if (items) {
            const elements = [];
            let i=0;

            items.forEach((item) => {
                elements.length < groups ? elements.push([item]) : elements[i%groups].push(item);
                i++
            });

            setGrid(elements);
        }
    }, [items]);

    React.useEffect(() => {
        if (items && grid) {
            grid.forEach((list, index) => {
                let group = document.querySelectorAll("#" + id + "-" + index + " .list-group-item-action:not(.description)");
                let last = document.querySelector("#" + id + "-" + index + " .list-group-item-action:last-child");
                
                group.forEach((line) => {
                    line.addEventListener("click", expand_desc);
                    
                    if(line.nextSibling === last) {
                        line.classList.add("last-item");
                    }
                });
            });
        }
    }, [grid]);

    return (
        <>{grid ? grid.map((group, index) => (
            <ul id={id + "-" + index} className="list-group list-group-wallet" key={id + "-group-" + index}>
                {group.map((item) => (
                    <ListGroupWalletItem item={item} body={body} head={head} key={id + "-" + item.key} />
                ))}
            </ul>
        )) : null}</>
    );
}

function ListGroupWalletItem({ item, body, head }) {
    return (
        <>
            <li className="list-group-item list-group-item-action">
                {head ? head(item) :
                <div className="d-flex flex-row flex-nowrap align-items-center justify-content-center gap-3">
                    {iconMap[item.icon] ? iconMap[item.icon](20, 20) : null}
                    {item.name}
                </div>}
            </li>
            <li className="list-group-item list-group-item-action description">
                {body ? body(item) : item.desc}
            </li>
        </>
    );
}

// Global expose
window.ListGroupWallet = ListGroupWallet;
window.ListGroupWalletItem = ListGroupWalletItem;