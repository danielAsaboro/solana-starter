import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import wallet from "../dev-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Start here
    const mint = await createMint(
      connection,
      keypair,
      keypair.publicKey,
      keypair.publicKey,
      6
    );
    console.log(`Mint address: ${mint.toBase58()}`);
    // EC8Rs5AUoUwL4kK49cNjgceoug1uSvAc6jRDTewdp5LQ
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();

// 5Tc74VxCRFhc4K7fub6VcpepaDjyYbqCq1BZoj2BmLJt wallet address
