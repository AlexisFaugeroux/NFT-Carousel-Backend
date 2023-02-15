import solana from '../services/solana.js';

export default {
    async getTokensInfo(pubKey) {
        // Get nfts
        const nfts = await solana.getTokensByOwner(pubKey);

        if (nfts?.length === 0) {
            return [];
        }

        // Reformat the nfts to keep only wanted information
        const nftsInfo = nfts.map(
            (token) => token?.json,
        );

        return nftsInfo;
    },
};
