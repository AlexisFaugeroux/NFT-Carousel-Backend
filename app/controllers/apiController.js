import solanaController from './solanaController.js';

const apiController = {
    async getTokensByOwner(req, res) {
        const { pubKey } = req.body;

        if (!pubKey) {
            return res.status(400).json({ message: 'Public key is missing' });
        }

        const nftsArray = await solanaController.getTokensInfoOwner(pubKey);

        const response = {
            pubKey,
            data: nftsArray,
            message: 'Token metadata found in user wallet.',
        };

        return res.json(response);
    },

    async getTokensByCreator(req, res) {
        const { pubKey } = req.body;

        if (!pubKey) {
            return res.status(400).json({ message: 'Public key is missing' });
        }

        const nftsArray = await solanaController.getTokensInfoCreator(pubKey);

        const response = {
            pubKey,
            data: nftsArray,
            message: 'Token metadata found in user wallet.',
        };

        return res.json(response);
    },

    async getCandyMachine(req, res) {
        const { pubKey } = req.body;

        if (!pubKey) {
            return res.status(400).json({ message: 'Public key is missing' });
        }

        const candyMachine = await solanaController.getCandyMachineInfo(pubKey);

        // Price of nfts is returned in hexadecimal number when using metaplex
        // Conversion to decimal
        candyMachine.price.basisPoints = parseInt(candyMachine.price.basisPoints, 10);

        const response = {
            pubKey,
            data: candyMachine,
        };

        return res.json(response);
    },
};

export default apiController;
