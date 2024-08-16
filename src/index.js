const { hex2string, string2hex } = require("./utils");
const MarketplaceController = require("./controller/marketPlace");

const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);

async function handle_advance(data) {
    console.log("Received advance request data " + JSON.stringify(data));
    const metadata = data.metadata;
    const sender = metadata.msg_sender;
    const payload = data.payload;

    let action = hex2string(payload);
    let response;

    if (action.startsWith("create_collectible")) {
        response = JSON.stringify(await MarketplaceController.createCollectible(data.payload));
    } else if (action.startsWith("buy_collectible")) {
        const { collectibleId } = data.payload;
        response = JSON.stringify(await MarketplaceController.buyCollectible(collectibleId, sender));
    } else {
        response = JSON.stringify({ error: 'Unknown action' });
    }

    const notice_req = await fetch(rollup_server + "/notice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: string2hex(response) }),
    });
    return "accept";
}

async function handle_inspect(data) {
    console.log("Received inspect request data " + JSON.stringify(data));

    const payload = data.payload;
    const route = hex2string(payload);

    let response;

    if (route === "list_collectibles") {
        response = JSON.stringify(await MarketplaceController.listCollectibles());
    } else if (route.startsWith("collectible/")) {
        response = JSON.stringify(await MarketplaceController.getCollectibleById(route.substring(12)));
    } else {
        response = JSON.stringify({ error: 'Unknown route' });
    }

    const report_req = await fetch(rollup_server + "/report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: string2hex(response) }),
    });
    return "accept";
}

var handlers = {
    advance_state: handle_advance,
    inspect_state: handle_inspect,
};

(async () => {
    while (true) {
        const finish_req = await fetch(rollup_server + "/finish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "accept" }),
        });

        console.log("Received finish status " + finish_req.status);

        if (finish_req.status == 202) {
            console.log("No pending rollup request, trying again");
        } else {
            const rollup_req = await finish_req.json();
            const handler = handlers[rollup_req["request_type"]];
            await handler(rollup_req["data"]);
        }
    }
})();
