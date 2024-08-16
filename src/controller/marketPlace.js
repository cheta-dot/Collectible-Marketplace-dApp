const CollectibleModel = require('../model/collectibleModel');
const CollectibleStorage = require('../storage/collectibleStorage');

class MarketplaceController {
    async createCollectible(data) {
        const { name, description, price } = data;
        if (!name || !description || price <= 0) {
            return { error: 'Invalid collectible data.' };
        }

        const newCollectible = new CollectibleModel(name, description, price);
        CollectibleStorage.addOne(newCollectible);

        return {
            success: true,
            message: 'Collectible created successfully!',
            collectible: newCollectible.getData(),
        };
    }

    async listCollectibles() {
        return { collectibles: CollectibleStorage.getAll() };
    }

    async buyCollectible(id, buyer) {
        const collectible = CollectibleStorage.getOneById(id);
        if (!collectible) {
            return { error: `Collectible not found for id '${id}'` };
        }

        if (collectible.isSold) {
            return { error: `Collectible with id '${id}' has already been sold` };
        }

        collectible.isSold = true;
        collectible.owner = buyer;

        return {
            success: true,
            message: 'Collectible bought successfully!',
            collectible: collectible.getData(),
        };
    }

    async getCollectibleById(id) {
        const collectible = CollectibleStorage.getOneById(id);
        if (!collectible) {
            return { error: `Collectible not found for id '${id}'` };
        }

        return { collectible: collectible.getData() };
    }
}

module.exports = new MarketplaceController();
