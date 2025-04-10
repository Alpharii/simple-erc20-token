// hooks/useToken.ts
import { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { useEthers } from "./useEthers";
import SimpleTokenAbi from "../abis/SimpleToken.json";

const CONTRACT_ADDRESS = "0x801d8BCCb7dEF6745d96943e9b8526CFBe27a32b";

export function useToken() {
  const { signer, address } = useEthers();
  const [balance, setBalance] = useState("0");
  const [symbol, setSymbol] = useState("SIM");
  const [name, setName] = useState("SimpleToken");
  const [decimals, setDecimals] = useState(18);
  const [totalSupply, setTotalSupply] = useState("0");

  const contract = useMemo(() => {
    if (!signer) return null;
    return new ethers.Contract(CONTRACT_ADDRESS, SimpleTokenAbi, signer);
  }, [signer]);

  const loadTokenData = async () => {
    if (!contract || !address) return;

    const [bal, sym, nm, dec, supply] = await Promise.all([
      contract.balanceOf(address),
      contract.symbol(),
      contract.name(),
      contract.decimals(),
      contract.totalSupply()
    ]);

    setBalance(ethers.formatUnits(bal, dec));
    setSymbol(sym);
    setName(nm);
    setDecimals(dec);
    setTotalSupply(ethers.formatUnits(supply, dec));
  };

  useEffect(() => {
    loadTokenData();
  }, [contract, address]);

  const transfer = async (to: string, amount: string) => {
    if (!contract) throw new Error("Contract not ready");
    const tx = await contract.transfer(to, ethers.parseUnits(amount, decimals));
    await tx.wait();
    await loadTokenData();
  };

  return {
    address,
    balance,
    symbol,
    name,
    totalSupply,
    transfer,
    reload: loadTokenData
  };
}
