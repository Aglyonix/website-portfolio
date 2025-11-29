function TableOfContent({ objects, json, panel, refnav }) {

    if (objects && json) {
        throw TypeError(`You cannot specified a table from an object and a json file at the same time`);
    }

    if ((panel && json) || (panel && objects)) {
        throw TypeError(`You cannot specified a panels with a json or objects. Note : You shouln't call TableOfContent withe the param panel`);
    }

    const url = json_dir + json;
    const [items, setItems] = React.useState(null);
    const [table, setTable] = React.useState(null);
    const [tabPanels, setTabPanels] = React.useState(panel);
    const [isSubJson, setIsSubJson] = React.useState(false);
    
    if (json) {
        async function fetchTable() {
            const response = await fetch(url);
            const json = await response.json();
            const table = json["table-of-content"];
            const items = json["items"];
            return { table: table , items: items };
        };
        
        React.useEffect(() => {
            fetchTable().then(result => {
                if (refnav) {
                    setIsSubJson(true);
                    setItems(refnav);
                } else {
                    setItems(result.items);
                }
                setTable(result.table);
            });
        }, []);
    }
    
    if (objects) {
        React.useEffect(() => {
            setTable(objects);
            
            if(refnav) {
                setItems(refnav);
            }
        }, [objects]);
    }

    if (tabPanels) {
        return (
            <div className="tab-content">
                {tabPanels ? tabPanels.map((tab) => ( <PanelOfContent tab={tab} table={tab.childrens} refnav={refnav} key={tab.key} /> )) : null}
            </div>
        );
    }
    
    if (isSubJson) { return <>{table ? table.map((content) => ( <PieceOfContent content={content} refnav={items} key={content.key} /> )) : null} </>; }

    return (
        <ul>
        {table ? table.map((content) => (
            <PieceOfContent content={content} refnav={items} key={content.key} />
        )) : null}
        </ul>
    );
}

function PieceOfContent({ content, refnav }) {
    let childrens;
    let hasChilds = false;

    if (content && content.childrens && content.tabpanels) {
        throw TypeError(`You cannot specified childrens and tabpanels for the same content`);
    }

    if (content && content.tableref && content.tabpanels) {
        throw TypeError(`You cannot specified subjson table and tabpanels in the same content. Suggest you move the tabpanels in the subjson`);
    }
    
    if (content && content.tabpanels) {
        hasChilds = true;
        childrens = <TableOfContent panel={content.tabpanels} refnav={refnav} />;
    }

    if (content && content.tableref) {
        return <TableOfContent json={content.tableref} refnav={refnav} />;
    }

    if (content && content.childrens) {
        hasChilds = true;
        childrens = <TableOfContent object={content.childrens} refnav={refnav} />;
    }

    return ( 
        <li>
            <a href={content?.target} className="navigation lexend">{content?.title}</a>
            {hasChilds ? childrens : null}
        </li>
    );
}

function PanelOfContent( { tab, table, refnav } ) {
    function getTabAttrs(panelref) {
        if (!refnav) return null;
        const found = refnav.find(item => item.key === panelref);
        return found;
    }

    const item = getTabAttrs(tab.panelref);

    if (!item) {
        throw TypeError(`No reference of ` + tab.panelref + ` found. Check your json file. Does your "panelref" match your item key ?`);
    }

    React.useEffect(() => {
        if (item) {
            var panel = new bootstrap.Tab(document.querySelector("#table-" + item?.target + "[role=tabpanel]"));
        }
    }, [])

    let attr = "tab-pane fade";
    attr = item.active ? attr + " show active" : attr;
    const role = "tabpanel";

    return (
        <ul key={item?.key} id={"table-" + item?.target} className={attr} role={role} aria-labelledby={item?.idname}>
            {table ? table.map((content) => (
                <PieceOfContent content={content} refnav={refnav} key={content.key} />
            )) : null}
        </ul>
    );
}

// Global expose
window.TableOfContent = TableOfContent;
window.PieceOfContent = PieceOfContent;
window.PanelOfContent = PanelOfContent;