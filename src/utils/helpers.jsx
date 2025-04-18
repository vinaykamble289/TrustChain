// FILE: src/utils/helpers.js
export function truncateAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatDate(timestamp) {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleDateString();
}

export function isValidEthereumHash(hash) {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}