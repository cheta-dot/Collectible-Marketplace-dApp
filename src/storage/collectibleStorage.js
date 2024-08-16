class CollectibleStorage {
    constructor() {
        this.collectibles = new Map();
    }

    addOne(collectible) {
        this.collectibles.set(collectible.id, collectible);
    }

    getOneById(id) {
        return this.collectibles.get(id);
    }

    getAll() {
        return Array.from(this.collectibles.values());
    }
}

module.exports = new CollectibleStorage();
