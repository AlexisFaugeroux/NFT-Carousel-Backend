import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';

// Solana API Address
const endpoint = process.env.SOLANA_RPC_HOST;

// Connect to API
const connection = new Connection(endpoint, { commitment: 'confirmed', disableRetryOnRateLimit: true });
const metaplex = Metaplex.make(connection);

const solana = {
    getTokensByOwner: async (pubKeyString) => {
        if (!pubKeyString) throw new Error('Please provide a public key');

        const nfts = [];
        try {
            const metadataList = await metaplex.nfts().findAllByOwner({
                owner: new PublicKey(pubKeyString),
            });

            await Promise.all(metadataList.map(async (metadata) => {
                const nft = await metaplex.nfts().load({ metadata });
                nfts.push(nft);
            }));
        } catch (error) {
            console.log(error);
        } finally {
            console.log(`Found ${nfts?.length} NFT(s) for pubKey ${pubKeyString}`);
        }

        return nfts;
    },
};

export default solana;
