import { useState } from "react";
import { ethers } from "ethers";
import TokenUI from "../components/Token";
import { Wallet, LogOut, RefreshCw } from "lucide-react";

export default function Index() {
  const [account, setAccount] = useState<string | null>(null);

  async function connectWallet() {
    if (!(window as any).ethereum) {
      alert("MetaMask not found!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider((window as any).ethereum);

      await (window as any).ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  }

  function disconnectWallet() {
    setAccount(null);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          SimpleToken dApp
        </h1>

        <div className="flex flex-col items-center space-y-4">
          {account ? (
            <>
              <button
                onClick={disconnectWallet}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition flex items-center justify-center space-x-2"
              >
                <LogOut size={18} />
                <span>Disconnect Wallet</span>
              </button>
              <button
                onClick={connectWallet}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <RefreshCw size={18} />
                <span>Switch Account</span>
              </button>
            </>
          ) : (
            <button
              onClick={connectWallet}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center justify-center space-x-2"
            >
              <Wallet size={18} />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>

        <div className="mt-6">
          {account ? (
            <TokenUI />
          ) : (
            <p className="text-center text-gray-400">Wallet not connected</p>
          )}
        </div>
      </div>
    </div>
  );
}
