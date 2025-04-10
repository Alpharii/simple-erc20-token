// components/Token.tsx
import { useState } from "react";
import { useToken } from "../hooks/useToken";

export default function TokenUI() {
  const { address, balance, symbol, name, totalSupply, transfer } = useToken();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleTransfer = async () => {
    try {
      setLoading(true);
      setMsg("Sending...");
      await transfer(to, amount);
      setMsg("Transfer successful!");
    } catch (e: any) {
      setMsg("Transfer failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded-xl shadow-md max-w-md">
      <h2 className="text-lg font-semibold">{name} ({symbol})</h2>
      <p><strong>Your Wallet:</strong> {address}</p>
      <p><strong>Balance:</strong> {balance} {symbol}</p>
      <p><strong>Total Supply:</strong> {totalSupply} {symbol}</p>

      <div className="mt-4 space-y-2">
        <input
          type="text"
          placeholder="Recipient address"
          className="w-full p-2 border rounded"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleTransfer}
          className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : `Send ${symbol}`}
        </button>
        {msg && <p className="text-sm mt-1">{msg}</p>}
      </div>
    </div>
  );
}
