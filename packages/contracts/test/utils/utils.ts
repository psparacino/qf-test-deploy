import * as dotenv from "dotenv";
import { BigNumber, BigNumberish } from "ethers";
import hre, { ethers } from "hardhat";

dotenv.config();
/* GitCoin Utils */

/**
 * Encodes the parameters for the ProgramFactory.create() function.
 *
 * @param params
 * @returns {string}
 */
export const encodeProgramParameters = (params: []): string => {
  return ethers.utils.defaultAbiCoder.encode(
    ["tuple(uint256 protocol, string pointer)", "address[]", "address[]"],
    params,
  );
};

/**
 * Encodes the parameters for the RoundFactory.create() function.
 *
 * @param params
 * @returns {string}
 */
export const encodeRoundParameters = (params: any[]): string => {
  return ethers.utils.defaultAbiCoder.encode(
    [
      "address",
      "address",
      "uint256",
      "uint256",
      "uint256",
      "uint256",
      "address",
      "tuple(uint256 protocol, string pointer)",
      "tuple(uint256 protocol, string pointer)",
      "address[]",
      "address[]",
    ],
    params,
  );
};

/**
 * Encodes the parameters for the MerklePayoutStrategy.updateDistribution() function.
 *
 * @param params
 * @returns {string}
 */
export const encodeMerkleUpdateDistributionParameters = (params: []): string => {
  return ethers.utils.defaultAbiCoder.encode(["bytes32", "tuple(uint256 protocol, string pointer)"], params);
};

export const encodeMetaPtr = (params: [BigNumberish, string]): string => {
  return ethers.utils.defaultAbiCoder.encode(["uint256", "string"], params);
};

/* Lens Utils */

export function getAbbreviation(handle: string) {
  let sliced = handle.slice(0, 4);
  if (sliced.charAt(3) == " ") {
    sliced = sliced.slice(0, 3);
  }
  return sliced;
}

export async function getTimestamp(): Promise<number> {
  const blockNumber = await hre.ethers.provider.send("eth_blockNumber", []);
  const block = await hre.ethers.provider.send("eth_getBlockByNumber", [blockNumber, false]);
  return block.timestamp;
}

export function getCollectModulePubInitData(initModuleData: (string | number | BigNumber)[]) {
  const collectModuleInitData = ethers.utils.defaultAbiCoder.encode(
    ["address", "uint16", "address", "address"],
    initModuleData,
  );

  return collectModuleInitData;
}
