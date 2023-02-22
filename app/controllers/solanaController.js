import solana from '../services/solana.js';

export default {
    async getTokensInfoOwner(pubKey) {
        // Get nfts
        const nfts = await solana.findByOwner(pubKey);

        if (nfts?.length === 0) {
            return [];
        }

        // Reformat the nfts to keep only wanted information
        const nftsInfo = nfts.map(
            (token) => token?.json,
        );

        return nftsInfo;
    },

    async getTokensInfoCreator(pubKey) {
        // Get nfts
        const nfts = await solana.findByCreator(pubKey);

        if (nfts?.length === 0) {
            return [];
        }

        // Reformat the nfts to keep only wanted information
        const nftsInfo = nfts.map(
            (token) => token?.json,
        );

        return nftsInfo;
    },

    async getCandyMachineDetails(pubKey) {
        // Get candy machine
        const candyMachine = await solana.findCandyMachineDetails(pubKey);

        if (!candyMachine) return {};

        return candyMachine;
    },
};
