import solanaController from './solanaController.js';

const apiController = {
    async getTokens(req, res) {
        const { pubKey } = req.body;

        if (!pubKey) {
            return res.status(400).json({ message: 'Public key is missing' });
        }

        const nftsArray = await solanaController.getTokensInfo(pubKey);

        const response = {
            pubKey,
            data: nftsArray,
            message: 'Token metadata found in user wallet.',
        };

        return res.json(response);
    },
};

export default apiController;
