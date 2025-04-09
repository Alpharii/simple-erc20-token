import { useState } from "react";
import { ethers } from "ethers";
import Token from "../components/Token";

export default function Index() {
  const [account, setAccount] = useState<string | null>(null);

  async function connectWallet() {
    if (!(window as any).ethereum) {
      alert("MetaMask not found!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">SimpleToken dApp</h1>

      <button
        onClick={connectWallet}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {account ? `Connected: ${account.slice(0, 6)}...` : "Connect Wallet"}
      </button>

      <div>
        <h1>
          {account ? `your addres ${account}` : `your wallet not connected`}
        </h1>
      </div>

      <Token />
    </div>
  );
}
