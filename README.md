# Midnight Bulletin Board DApp — Level 2

A privacy-preserving bulletin board decentralized application (DApp) built on the [Midnight Network](https://midnight.network/) with zero-knowledge (ZK) proofs, TypeScript API, and a React + Vite frontend connected to the Lace Wallet.

---

## 🔒 Privacy Claim & Architecture

> **Observable Privacy Behavior:** Message ownership is proven without revealing the author's identity or private keys.

1. **Client-Side Private State:**
   - The DApp maintains a local private state key (`bboardPrivateState`) using `inMemoryPrivateStateProvider`.
   - The user's `secretKey` is generated locally in the browser and stored in client memory. It **never leaves the browser** and is never broadcast over the network.

2. **Zero-Knowledge Proof Generation:**
   - When posting or taking down a message, the DApp calls Compact circuits (`post` / `takeDown`) locally.
   - The proof server generates zero-knowledge proofs demonstrating that:
     - The user possesses the private key corresponding to the public key stored on-chain.
     - The transaction is valid according to the smart contract rules.
   - On-chain nodes and observers only see the public state commitment and zero-knowledge proof, but **cannot derive the secret key or identity of the poster**.

3. **Observable In-Browser Ownership Verification (`isOwner`):**
   - The frontend compares the public ledger `owner` key against the local private `secretKey` commitment locally (`boardState.isOwner`).
   - If a user attempts to take down a post created by another key, the Compact smart contract circuit rejects the transaction during local ZK proof execution before any transaction is ever submitted to the blockchain.

---

## 📋 Level 2 Submission Details

- **Public GitHub Repository:** `https://github.com/Varunshinde01/bboard-app`
- **Live Demo Link:** `https://bboard-midnight.vercel.app`
- **Deployed Preprod Contract Address:** `0200dbf964f541e1950883f5b2f539b66fd6111e46ce8e6e9551fbdd180114d5dd5b`
- **Demo Video:** [Lace Wallet Connect + Circuit Call Demo Video](#)

---

## 🚀 Features

- **Lace Wallet Integration:** Interactive wallet connect / disconnect button in the header with live status indicators and shortened address view.
- **Midnight.js SDK & DApp Connector:** Interfaces directly with `@midnight-ntwrk/dapp-connector-api` for transaction signing and balancing.
- **Glassmorphism UI:** Built with Material UI (MUI) custom design system, Inter typography, gradient background animations, and ZK progress indicators.
- **Preprod Network Deployment:** Configured out-of-the-box for Midnight Preprod network (`VITE_NETWORK_ID=preprod`).

---

## 🛠️ Project Structure

```
bulletin-board/
├── contract/               # Compact smart contract source (bboard.compact) & circuits
├── api/                   # TypeScript API layer (BBoardAPI, state management)
├── bboard-cli/            # Command-line interface for contract deployment & testing
└── bboard-ui/             # React + Vite web DApp frontend with Lace wallet integration
```

---

## 🚦 Setup Instructions

### 1. Prerequisites

- **Node.js:** `v24.11.1` or higher
- **Docker Desktop:** Required for running the local ZK proof server (`midnightntwrk/proof-server:8.0.3`)
- **Lace Wallet Browser Extension:** Configured for **Preprod Network** and **Local Proof Server (`http://localhost:6300`)**

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/Varunshinde01/bboard-app.git
cd bboard-app

# Install all workspace dependencies
npm install
```

### 3. Compile Smart Contract

```bash
cd contract
npm run compact    # Compiles bboard.compact to ZK circuits
npm run build      # Copies compiled assets to dist/
cd ..
```

### 4. Start Proof Server (Docker)

```bash
cd bboard-cli
docker compose -f proof-server-local.yml up -d
cd ..
```

### 5. Run Web DApp

```bash
cd bboard-ui
npm run build:start
```

Open `http://127.0.0.1:8080` in a browser with the Midnight Lace wallet extension installed.

---

## 🧪 Requirements Checklist

- [x] **Lace wallet connect / disconnect implemented:** Connect button in header with status updates and disconnect capability.
- [x] **Circuit called successfully from frontend:** `post()` and `takeDown()` circuits executed with ZK proof generation.
- [x] **Observable privacy behavior:** Client-side private state and local ZK proof verification documented and visualized in UI.
- [x] **Contract deployed to Preprod:** Contract address `0200dbf964f541e1950883f5b2f539b66fd6111e46ce8e6e9551fbdd180114d5dd5b` on Midnight Preprod.
- [x] **Minimum 8 meaningful commits:** Clean Git history tracking project progression.
