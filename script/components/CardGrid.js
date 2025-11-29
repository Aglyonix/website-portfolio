function CardGrid({ id, objects, json, card, columns, attr }) {

    if (!id) { throw ReferenceError(`You must specified a unique id`); }
    if (!card) { throw ReferenceError(`You must specified a default card or a array of cards for each break points (` + breaks.length + `)`); }

    if (objects && json) {
        throw TypeError(`You cannot specified a table from an object and a json file at the same time`);
    }

    if (columns && columns.length !== 5) {
        throw TypeError(breaks.length +` columns are required ` + columns.length + ` given. Give numbers of columns related to each break points`);
    }

    if (Array.isArray(card) && card.length !== 5) {
        throw TypeError(breaks.length + ` cards are required ` + card.length + ` given. Give cards related to each break points`);
    }

    const url = json_dir + json ;
    const [items, setItems] = React.useState([]);
    if (!columns) columns = [2, 3, 4, 5, 5];
    if (!Array.isArray(card)) card = [card, card, card, card, card];

    React.useEffect(() => {
        if (json) {
            async function fetchItems() {
                const response = await fetch(url);
                const json = await response.json();
                setItems(json["items"]);
            };
            fetchItems();
        } else if (objects) {
            setItems(objects);
        }

        const grids = document.querySelectorAll("#" + id + " .grid-columns");

        if (attr) {
            grids.forEach((grid) => {
                grid.style.setProperty('--grid-items-min-width', attr?.itemsMinWidth);
                grid.style.setProperty('--grid-items-height', attr?.itemsHeight);
                grid.style.setProperty('--grid-columns-gap', attr?.gap);
            });
        }

    }, [json, objects, url]);

    return (
        <div id={id}>
        {breaks.map((point, index) => 
            <div className={"grid-columns " + point.attr} data-columns={columns[index]} key={id + ".grid-columns." + index}>
            {items ? items.map((item) => 
                item.group ? (
                    <CardPack pack={item} card={card[index]} columns={columns[index]} key={item.key} />
                ) : (
                    card[index](item)
            )) : null}
            </div>
        )}
        </div>
    );
}

function CardPack({ pack, card, columns }) {
    const rows = [];
    const group = pack.group;
    const getSizes = (sizes) => {
        if(sizes?.xl && columns >= 5) return sizes.xl;
        if(sizes?.lg && columns >= 4) return sizes.lg;
        if(sizes?.md && columns >= 3) return sizes.md;
        if(sizes?.sm && columns >= 2) return sizes.sm;
        return sizes;
    }
    const sizes = getSizes(pack.sizes);

    if (columns === 1 || sizes.width > columns) {
        return (
            <>{pack.group.map((item) => card(item))}</>
        );
    }

    for (var h = 0; h < sizes.height; h++) {
        const row = [];

        for (var w = 0; w < sizes.width; w++) {
            let item = group[(h*sizes.height)+w];
            row.push(card(item));
        }

        rows.push(<div className="card-group p-0" key={pack.key + "-line-" + rows.length}>{row}</div>);
    }

    return (
        <div className="card-pack h-100" style={{ gridColumn: "span " + sizes.width, gridRow: "span " + sizes.height }}>
            {rows}
        </div>
    );
}

// Global expose
window.CardGrid = CardGrid;
window.CardPack = CardPack;