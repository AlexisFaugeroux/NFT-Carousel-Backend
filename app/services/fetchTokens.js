import fetch from 'node-fetch';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const fetchTokens = {
    getTokenAccounts: async (connection, pubKeyString) => {
        let accounts = [];
        if (pubKeyString) {
            accounts = await connection.getParsedAccounts(
                TOKEN_PROGRAM_ID,
                {
                    filters: [
                        {
                            dataSize: 165,
                        },
                        {
                            memcmp: {
                                offset: 32,
                                bytes: pubKeyString,
                            },
                        },
                    ],
                },
            );
        }

        console.log(`Found ${accounts?.length} account(s) for pubKey ${pubKeyString}`);
        return accounts;
    },
    getTokenData: async (connection, token) => {
        if (!token || !token.mint) throw new Error('Please provide connection instance and token');

        try {
            const mintPubkey = new PublicKey(token.mint);
            const tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
            const tokenData = await Metadata.load(connection, tokenmetaPubkey);
            return tokenData;
        } catch (error) {
            console.log(error);
        }
        return true;
    },
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

export default fetchTokens;
