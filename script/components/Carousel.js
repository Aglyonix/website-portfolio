function CardCarousel({ id, json }) {
    const url = json_dir + json ;
    const [items, setItems] = React.useState(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    
    async function fetchItems() {
        const response = await fetch(url);
        const json = await response.json();
        const items = json["items"];
        return items;
    };

    React.useEffect(() => {
        fetchItems().then(result => setItems(result));
    }, []);

    React.useEffect(() => {
        const carousel = document.getElementById('carousel-certificates');

        if (carousel) {
            const handler = (e) => setActiveIndex(e.to);
            carousel.addEventListener('slide.bs.carousel', handler);
            return () => carousel.removeEventListener('slide.bs.carousel', handler);
        }
    }, []);

    return (
        <div id={id + "-card"} className="card w-100">
            <div id={id} className="carousel slide card-img-top" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {items ? items.map((item, index) => (
                    <button type="button" data-bs-target={"#" + id} data-bs-slide-to={index} aria-label={"Slide " + (index+1)} key={"indicator-for." + item.key} className={index===0?'active':null} aria-current={index===0?'True':null}></button>
                    )) : null}
                </div>
                <div className="carousel-inner">
                    {items ? items.map((item, index) => (
                    <div className={`carousel-item${index === 0 ? ' active' : ''}`} key={item.key}>
                        <img src={img_dir + item.src} className="d-block img-fluid" alt={item.alt}></img>
                    </div>
                    )) : null}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={"#" + id} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={"#" + id} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="card-body">
                <h5 className="card-title">{items && items[activeIndex]?.title}</h5>
                <p className="card-text">{items && items[activeIndex]?.mention}</p>
            </div>
        </div>
    );
}

// Global expose
window.CardCarousel = CardCarousel;