import { useEffect, useState } from "react";
import { ethers } from "ethers";
import SimpleTokenAbi from "../abis/SimpleToken.json";
import { useEthers } from "../hooks/useEthers";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Token() {
  const { signer, address } = useEthers();
  const [balance, setBalance] = useState("0");

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    const loadBalance = async () => {
      if (!signer) return;
      const token = new ethers.Contract(CONTRACT_ADDRESS, SimpleTokenAbi, signer);
      const bal = await token.balanceOf(address);
      setBalance(ethers.formatEther(bal));
    };
    loadBalance();
  }, [signer, address, txHash]);

  async function sendToken() {
    if (!signer || !to || !amount) return;

    try {
      const token = new ethers.Contract(CONTRACT_ADDRESS, SimpleTokenAbi, signer);
      const tx = await token.transfer(to, ethers.parseEther(amount));
      await tx.wait();

      setTxHash(tx.hash);
      setTo("");
      setAmount("");
    } catch (err) {
      console.error("Transfer failed:", err);
      alert("Transfer failed. Check console.");
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold">Your Wallet: {address}</h2>
      <p className="mb-4">Balance: {balance} SIM</p>

      <h3 className="font-semibold mb-2">Transfer Token</h3>
      <input
        className="border px-2 py-1 mr-2 rounded"
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        className="border px-2 py-1 mr-2 rounded"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        onClick={sendToken}
        className="bg-green-600 text-white px-4 py-1 rounded"
      >
        Send
      </button>

      {txHash && (
        <p className="mt-2 text-sm text-gray-600">
          Sent! Tx Hash:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            className="underline text-blue-600"
            rel="noreferrer"
          >
            {txHash.slice(0, 10)}...
          </a>
        </p>
      )}
    </div>
  );
}
