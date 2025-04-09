import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SimpleTokenModule = buildModule("SimpleTokenModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", "1000000000000000000000"); // 1000 * 10**18

  const token = m.contract("SimpleToken", [initialSupply]);

  return { token };
});

export default SimpleTokenModule;
