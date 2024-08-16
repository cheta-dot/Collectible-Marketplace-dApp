const crypto = require('crypto');

class CollectibleModel {
    constructor(name, description, price) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.price = price;
        this.isSold = false;
        this.owner = null;
    }

    getData() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            isSold: this.isSold,
            owner: this.owner,
        };
    }
}

module.exports = CollectibleModel;
