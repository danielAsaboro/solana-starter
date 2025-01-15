import wallet from "../dev-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("EC8Rs5AUoUwL4kK49cNjgceoug1uSvAc6jRDTewdp5LQ");

// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,

      // keypair,
    };

    // Define the metadata
    let data: DataV2Args = {
      name: "Daniel Asaboro NFT",
      symbol: "DANY",
      uri: "https://arweave.net/your-metadata-uri",
      sellerFeeBasisPoints: 500, // 5%
      creators: [
        {
          address: keypair.publicKey,
          verified: true,
          share: 100,
        },
      ],
      collection: null,
      uses: null,
    };

    // Create the full arguments
    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };

    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    let result = await tx.sendAndConfirm(umi);
    console.log(bs58.encode(result.signature));
    // wiosFhKTtv6g93dqvsnTNrecgwRZTpMXy5dExyojVxuMU1Hr5g8hhnMUurXq5eVxsRBPjNAzEgsEbSvmq7RmxKL
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
