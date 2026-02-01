document.addEventListener("DOMContentLoaded", () => {

    const filterSelects = document.querySelectorAll(".filter-select");

    const typeSelect = filterSelects[0];
    const locationSelect = filterSelects[1];
    const priceSelect = filterSelects[2];
    const bedsSelect = filterSelects[3];

    const applyBtn = document.querySelector(".btn-filter");
    const resetBtn = document.querySelector(".btn-reset");

    const cards = document.querySelectorAll(".listing-card");
    const resultText = document.querySelector(".results-count");

    function parsePrice(priceText) {
        return Number(priceText.replace(/[^0-9]/g, ""));
    }

    function parseBeds(bedText) {
        return Number(bedText.match(/\d+/)[0]);
    }

    applyBtn.addEventListener("click", () => {
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector(".listing-title").innerText.toLowerCase();
            const location = card.querySelector(".listing-location").innerText;
            const price = parsePrice(card.querySelector(".price-badge").innerText);
            const beds = parseBeds(card.querySelector(".listing-features span").innerText);

            let show = true;

            /* PROPERTY TYPE */
            if (typeSelect.value !== "All Types") {
                show = show && title.includes(typeSelect.value.toLowerCase());
            }

            /* LOCATION */
            if (locationSelect.value !== "All Locations") {
                show = show && location.includes(locationSelect.value);
            }

            /* PRICE RANGE */
            if (priceSelect.value !== "Any Price") {
                if (priceSelect.value === "Under $1M") show = show && price < 1000000;
                if (priceSelect.value === "$1M - $2M") show = show && price >= 1000000 && price <= 2000000;
                if (priceSelect.value === "$2M - $5M") show = show && price >= 2000000 && price <= 5000000;
                if (priceSelect.value === "$5M - $10M") show = show && price >= 5000000 && price <= 10000000;
                if (priceSelect.value === "$10M+") show = show && price > 10000000;
            }

            /* BEDROOMS */
            if (bedsSelect.value !== "Any") {
                const minBeds = Number(bedsSelect.value.replace("+", ""));
                show = show && beds >= minBeds;
            }

            card.style.display = show ? "block" : "none";
            if (show) visibleCount++;
        });

        resultText.innerText = `Showing ${visibleCount} properties`;
    });

    resetBtn.addEventListener("click", () => {
        typeSelect.value = "All Types";
        locationSelect.value = "All Locations";
        priceSelect.value = "Any Price";
        bedsSelect.value = "Any";

        cards.forEach(card => card.style.display = "block");
        resultText.innerText = `Showing ${cards.length} properties`;
    });

});
