const STORAGE_KEY = "taiyaki-festival-v3";

function createDayData() {
    return {
        stock: {
            anko: 0,
            custard: 0,
            apple: 0,
            potato: 0
        },
        waiting: [],
        history: [],
        revenue: 0,
        sold: {
            anko: 0,
            custard: 0,
            apple: 0,
            potato: 0
        },
        nextOrderNo: 1
    };
}

let state = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (!state) {
    state = {
        days: {
            day1: createDayData(),
            day2: createDayData(),
            day3: createDayData()
        }
    };
}

function currentDay() {
    return document.getElementById("festivalDay").value;
}

function currentData() {
    return state.days[currentDay()];
}

function save() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

    render();
}

function render() {

    renderInventory();
    renderWaiting();
    renderSummary();
}

function renderInventory() {

    const data = currentData();

    const area =
        document.getElementById(
            "inventoryArea"
        );

    area.innerHTML = "";

    const items = [
        ["あんこ", "anko"],
        ["カスタード", "custard"],
        ["シナモンアップル", "apple"],
        ["ジャーマンポテト", "potato"]
    ];

    items.forEach(item => {

        area.innerHTML += `
            <div class="stock-row">
                <span>${item[0]}</span>
                <span>${data.stock[item[1]]}個</span>
            </div>
        `;

    });
}

function renderWaiting() {

    const data = currentData();

    document.getElementById(
        "waitingCount"
    ).textContent =
        data.waiting.length;

    const area =
        document.getElementById(
            "waitingList"
        );

    area.innerHTML = "";

    data.waiting.forEach(order => {

        area.innerHTML += `
            <div class="waiting-item">
                <div>
                    <strong>
                        No.${order.no}
                    </strong>
                    <br>
                    ${order.text}
                </div>
            </div>
        `;
    });
}

function renderSummary() {

    const data = currentData();

    document.getElementById(
        "revenue"
    ).textContent =
        "¥" + data.revenue;

    const sold =
        data.sold.anko +
        data.sold.custard +
        data.sold.apple +
        data.sold.potato;

    document.getElementById(
        "soldCount"
    ).textContent =
        sold + "個";
}

document
.getElementById("stockBtn")
.addEventListener(
    "click",
    () => {

        const data =
            currentData();

        data.stock.anko +=
            Number(
                document.getElementById(
                    "stockAnko"
                ).value
            );

        data.stock.custard +=
            Number(
                document.getElementById(
                    "stockCustard"
                ).value
            );

        data.stock.apple +=
            Number(
                document.getElementById(
                    "stockApple"
                ).value
            );

        data.stock.potato +=
            Number(
                document.getElementById(
                    "stockPotato"
                ).value
            );

        save();
    }
);

document
.getElementById("orderBtn")
.addEventListener(
    "click",
    () => {

        const data =
            currentData();

        const anko =
            Number(
                document.getElementById(
                    "orderAnko"
                ).value
            );

        const custard =
            Number(
                document.getElementById(
                    "orderCustard"
                ).value
            );

        const apple =
            Number(
                document.getElementById(
                    "orderApple"
                ).value
            );

        const potato =
            Number(
                document.getElementById(
                    "orderPotato"
                ).value
            );

        if (
            anko +
            custard +
            apple +
            potato === 0
        ) {
            alert("注文数を入力してください");
            return;
        }

        const parts = [];

        if (anko)
            parts.push(
                `あん${anko}`
            );

        if (custard)
            parts.push(
                `カス${custard}`
            );

        if (apple)
            parts.push(
                `シナ${apple}`
            );

        if (potato)
            parts.push(
                `ポテ${potato}`
            );

        data.waiting.push({
            no:
                data.nextOrderNo++,
            text:
                parts.join(" ")
        });

        save();
    }
);

document
.getElementById(
    "festivalDay"
)
.addEventListener(
    "change",
    render
);

render();
