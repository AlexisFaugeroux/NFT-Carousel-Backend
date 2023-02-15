import { Connection } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import solana from '../services/solana.js';

export default {
    async getMetaData(pubKey) {
        // Get nfts
        const nfts = await solana.getTokensByOwner(pubKey);

        if (nfts?.length > 0) {
            // Reformat the nfts to keep only wanted information
            const tokenList = nfts.map(
                (tokenInfo) => tokenInfo?.json,
            );
            console.log(tokenList);
            // filter out tokens owned previously but no longer in wallet
            const ownedTokens = tokenList.filter(
                (token) => token.owner === pubKey && parseInt(token.tokenAmount?.amount, 10) > 0,
            );

            // Get token data
            const ownedTokenData = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const token of ownedTokens) {
                const tokenData = await solana.getTokenData(metaplex, token);
                if (tokenData) {
                    ownedTokenData.push(tokenData);
                }
            }
            console.log(`Found ${ownedTokens?.length} tokenData for pubKey ${pubKey}.`);

            // Get meta data
            const metaDataList = [];
            // eslint-disable-next-line no-restricted-syntax
            for (const tokenData of ownedTokenData) {
                const metaData = await solana.getMetaData(tokenData);
                if (metaData) {
                    metaDataList.push(metaData);
                }
            }
            console.log(`Found ${metaDataList?.length} metaData for pubKey ${pubKey}.`);

            return metaDataList;
        }
        return [];
    },
};
