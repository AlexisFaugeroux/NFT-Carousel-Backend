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

        return res.status(200).json(response);
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

        return res.status(200).json(response);
    },

    async getCandyMachine(req, res) {
        const { pubKey } = req.body;

        if (!pubKey) {
            return res.status(400).json({ message: 'Public key is missing' });
        }

        const candyMachine = await solanaController.getCandyMachineDetails(pubKey);

        const response = {
            pubKey,
            data: candyMachine,
        };

        return res.status(200).json(response);
    },
};

export default apiController;
