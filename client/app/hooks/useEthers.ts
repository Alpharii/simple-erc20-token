import { ethers } from "ethers";
import { useEffect, useState } from "react";

export function useEthers(){
    const [provider, setProvider] = useState<ethers.BrowserProvider>()
    const [signer, setSigner] = useState<ethers.Signer>()
    const [address, setAddress] = useState<string>()

    useEffect(() => {
        const init = async () => {
            if((window as any).etherium){
                const provider = new ethers.BrowserProvider((window as any).etherium)
                await (window as any).etherium.request({ method: "eth_requestAccounts"})
                const signer = await provider.getSigner()
                const addres = await signer.getAddress()
                setProvider(provider)
                setSigner(signer)
                setAddress(addres)
            }
        };
        init()
    }, [])

    return { provider, signer, address };
}
