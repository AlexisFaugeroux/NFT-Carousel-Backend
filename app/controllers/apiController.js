import solanaController from './solanaController.js';

const apiController = {
    async getTokens(req, res) {
        const { pubKey } = req.body;

        if (!pubKey) {
            return res.status(400).json({ message: 'Public key is missing' });
        }

        const metaDataArray = await solanaController.getMetaData(pubKey);

        const response = {
            pubKey,
            data: metaDataArray,
            message: 'Token metadata found in user wallet.',
        };

        return res.json(response);
    },
};

export default apiController;
