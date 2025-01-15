import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../dev-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("EC8Rs5AUoUwL4kK49cNjgceoug1uSvAc6jRDTewdp5LQ");

// Recipient address
const to = new PublicKey("AYnYh4u4tyANs9KJo1xegohEQcA2pWxeqHFMwUhE15eT");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it

    let fromAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    // Get the token account of the toWallet address, and if it does not exist, create it
    let toAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );
    // const balance = await connection.getTokenAccountBalance(fromAta.address);

    // Transfer the new token to the "toTokenAccount" we just created
    let tx = await transfer(
      connection,
      keypair,
      fromAta.address,
      toAta.address,
      keypair,
      100
    );

    console.log("successeful transaction: ", tx);
    // 3Yf6MkGWg4P1zUwMDR68TXxTM5TNHxgtTyqMjdCkXk4VA2w6Kqduqutr8HHFmmAkUFSJ3yuv3TuTXTucCPHth5PF
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
