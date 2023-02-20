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

    async getCandyMachineInfo(pubKey) {
        // Get candy machine
        const candyMachine = await solana.findCandyMachineByAddress(pubKey);

        if (!candyMachine) return null;

        return candyMachine;
    },
};
