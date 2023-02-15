// import fetch from 'node-fetch';
import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';
// import { PublicKey } from '@solana/web3.js';
// import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Solana API Address
const endpoint = process.env.SOLANA_RPC_HOST;
// Connect to API
const connection = new Connection(endpoint, { commitment: 'confirmed', disableRetryOnRateLimit: true });
const metaplex = Metaplex.make(connection);

const solana = {
    getTokensByOwner: async (pubKeyString) => {
        if (!pubKeyString) throw new Error('Please provide a public key');

        const metadataList = await metaplex.nfts().findAllByOwner({
            owner: new PublicKey(pubKeyString),
        });

        const nfts = [];
        for (const metadata of metadataList) {
            const nft = await metaplex.nfts().load({ metadata });
            nfts.push(nft);
        }

        console.log(`Found ${nfts?.length} NFT(s) for pubKey ${pubKeyString}`);
        return nfts;
    },

    // getTokenData: async (metaplex, token) => {
    //     if (!token || !token.mint) throw new Error('Please provide connection instance and token');

    //     try {
    //         const mintPubkey = new PublicKey(token.mint);
    //         const tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
    //         const tokenData = await Metadata.load(connection, tokenmetaPubkey);
    //         return tokenData;
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     return true;
    // },

    getMetaData: async (tokenData) => {
        let metaData = {};
        if (tokenData) {
            const metaDataUri = tokenData.data?.data?.uri;

            const response = await fetch(metaDataUri)
                .then((res) => res.json())
                .catch((error) => { console.log(error); });

            if (response && response.image) {
                metaData = response;
            }
        }
        return metaData;
    },
};

export default solana;
