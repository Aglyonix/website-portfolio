let style;

export default style = {

    init : function() {
        update_off_road_text();
    }

}

function update_off_road_text() {

    let texts = document.querySelectorAll(".style-off-road");

    texts.forEach((text) => {
        text.setAttribute("data-content", text.textContent);
    })

}