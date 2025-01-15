import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("6aPi1jPe5rq4FPs2kP4pKaAGxE64X2swMBFa3VdA6rAA");

(async () => {
  try {
    // Create an ATA
    const ata = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(`Your ata is: ${ata.address.toBase58()}`);
    // 91yKsqe2YoA7WbzJKnSixNNAyd1vpLXFG15kepBf1SsS

    // Mint to ATA
    const mintTx = await mintTo(
      connection,
      keypair,
      mint,
      ata.address,
      keypair,
      1454340
    );
    console.log(`Your mint txid: ${mintTx}`);
    // 3bc3phNNNME9rricuZao43pbMF5AGGXi7p67SYASphaBUJhVepQvpc8itvFYavbeYrAAW9E1RztHDQ8nnc7z5MvA
    
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
