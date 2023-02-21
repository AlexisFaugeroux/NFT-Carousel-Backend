# NFT Carousel

This project is the backend of the NFT Carousel project. Written in Node.js, this simple API uses Metaplex tool to fetch NFTs on Solana devnet.

Currently, it fetches NFTs metadata from the Brushier Collection created by the artist "Mezange".

The Brushizer collection is not on the main net yet, it will soon. It containts 1000 NFTs, only a sample is displayed on this webiste.

## To use this API locally

Run `npm start` to install dependencies

Create a .env file based on .env.example file :
    - PORT=
    - CORS_DOMAINS=
    - SOLANA_RPC_HOST=

To fetch data from solana devnet, use https://api.devnet.solana.com for SOLANA_RPC_HOST. For mainnet , use https://solana-api.projectserum.com

Run `npm start` command to launch the server