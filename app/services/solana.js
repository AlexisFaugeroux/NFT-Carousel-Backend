import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';

// Solana API Address
const endpoint = process.env.SOLANA_RPC_HOST;

// Connect to API
const connection = new Connection(endpoint, { commitment: 'confirmed', disableRetryOnRateLimit: true });
const metaplex = Metaplex.make(connection);

const solana = {
    findByOwner: async (pubKeyString) => {
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
    findByCreator: async (pubKeyString) => {
        if (!pubKeyString) throw new Error('Please provide a public key');

        const nfts = [];
        try {
            const metadataList = await metaplex.nfts().findAllByCreator({
                creator: new PublicKey(pubKeyString),
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
    findCandyMachineDetails: async (pubKeyString) => {
        if (!pubKeyString) throw new Error('Please provide a public key');

        const candyMachine = await metaplex.candyMachinesV2().findByAddress({
            address: new PublicKey(pubKeyString),
        });

        // Price of nfts is returned in hexadecimal
        // Conversion to decimal
        candyMachine.price.basisPoints = parseInt(candyMachine.price.basisPoints, 10) / 1000000000;

        console.log(`Found CandyMachine V2 for pubKey ${pubKeyString}`);

        // Fetch nfts metadata from uri property provided in candyMachine object
        const { items } = candyMachine;
        const nftsMetadata = [];

        await Promise.all(items.map(async (item) => {
            const metadata = await fetch(item.uri);
            const metadataJSON = await metadata.json();
            nftsMetadata.push(metadataJSON);
        }));

        console.log(`Found ${nftsMetadata?.length} NFT(s) for CandyMachine ${pubKeyString}`);

        candyMachine.items = nftsMetadata;

        return candyMachine;
    },
};

export default solana;
