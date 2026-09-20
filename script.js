const FLAVORS = [
    {
        key: "anko",
        name: "あんこ",
        short: "あん",
        price: 150
    },
    {
        key: "custard",
        name: "カスタード",
        short: "カス",
        price: 150
    },
    {
        key: "apple",
        name: "シナモンアップル",
        short: "シナ",
        price: 200
    },
    {
        key: "potato",
        name: "ジャーマンポテト",
        short: "ポテ",
        price: 200
    }
];

const STORAGE_KEY = "taiyaki-festival-v2";

let state = JSON.parse(
    localStorage.getItem(STORAGE_KEY)
);

if (!state) {

    state = {

        currentDay: "day1",

        days: {
            day1: createDayData(),
            day2: createDayData(),
            day3: createDayData()
        }
    };

    save();
}

function createDayData() {

    return {

        stock: {
            anko: 0,
            custard: 0,
            apple: 0,
            potato: 0
        },

        made: {
            anko: 0,
            custard: 0,
            apple: 0,
            potato: 0
        },

        sold: {
            anko: 0,
            custard: 0,
            apple: 0,
            potato: 0
        },

        revenue: 0,

        waiting: [],

        history: [],

        nextOrderNo: 1
    };
}

function save() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state)
    );

    render();
}

function currentData() {

    return state.days[
        document.getElementById("festivalDay").value
    ];
}

function yen(value) {

    return "¥" +
        value.toLocaleString("ja-JP");
}

function render() {

    renderInventory();

    renderWaiting();

    renderSummary();

    renderHistory();

    renderThreeDaySummary();
}

function renderInventory() {

    const day = currentData();

    const area =
        document.getElementById(
            "inventoryArea"
        );

    area.innerHTML = "";

    FLAVORS.forEach(flavor => {

        const qty = day.stock[
            flavor.key
        ];

        let cls = "";

        if (qty <= 5) {

            cls = "stock-danger";

        } else if (qty <= 10) {

            cls = "stock-warning";
        }

        area.innerHTML += `

        <div class="stock-row">

            <span>
                ${flavor.name}
            </span>

            <span class="${cls}">
                ${
                    qty === 0
                    ? "売り切れ"
                    : qty + "個"
                }
            </span>

        </div>

        `;
    });
}

function renderWaiting() {

    const day = currentData();

    document.getElementById(
        "waitingCount"
    ).textContent =
        day.waiting.length;

    const area =
        document.getElementById(
            "waitingList"
        );

    area.innerHTML = "";

    day.waiting.forEach(order => {

        area.innerHTML += `

        <div class="waiting-item">

            <div>

                <strong>
                    No.${order.no}
                </strong>

                <br>

                ${order.text}

            </div>

            <button>

                お渡し

            </button>

        </div>

        `;
    });
}

function renderSummary() {

    const day = currentData();

    const soldCount = Object.values(
        day.sold
    ).reduce(
        (a,b) => a + b,
        0
    );

    document.getElementById(
        "revenue"
    ).textContent =
        yen(day.revenue);

    document.getElementById(
        "soldCount"
    ).textContent =
        soldCount + "個";
}

function renderHistory() {

    const day = currentData();

    const tbody =
        document.getElementById(
            "historyTable"
        );

    tbody.innerHTML = "";

    day.history.forEach(item => {

        tbody.innerHTML += `

        <tr>

            <td>${item.no}</td>

            <td>${item.time}</td>

            <td>${item.detail}</td>

            <td>${yen(item.amount)}</td>

        </tr>

        `;
    });
}

function renderThreeDaySummary() {

    const area =
        document.getElementById(
            "threeDaySummary"
        );

    area.innerHTML = "";

    Object.entries(
        state.days
    ).forEach(([key,data]) => {

        const count =
            Object.values(
                data.sold
            ).reduce(
                (a,b)=>a+b,
                0
            );

        const label =

            key === "day1"
            ? "1日目"

            : key === "day2"
            ? "2日目"

            : "3日目";

        area.innerHTML += `

            <div
                class="stock-row"
            >

                <span>
                    ${label}
                </span>

                <span>

                    ${count}個 /
                    ${yen(data.revenue)}

                </span>

            </div>

        `;
    });
}

document
.getElementById(
    "festivalDay"
)
.addEventListener(
    "change",
    render
);

render();
