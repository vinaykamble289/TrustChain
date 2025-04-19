# 🔗 TrustChain DApp

A Decentralized Application (DApp) focused on trust, transparency, and traceability — combining modern **web technologies**, **blockchain**, and **cloud services**.

![TrustChain Banner](https://user-images.githubusercontent.com/your-image-link/banner.png)

---

## 🚀 Live Demo

Coming soon...  
<!-- Or add something like -->
<!-- 🔗 [Live Demo](https://trustchain-dapp.web.app/) -->

---

## 🧠 About the Project

**TrustChain** is a full-stack DApp that leverages the power of **blockchain** and **cloud technologies** to build secure, verifiable, and immutable data systems for decentralized trust management.

---

## 🛠️ Tech Stack

| Layer        | Technology                                      |
|--------------|--------------------------------------------------|
| **Frontend** | React (Vite) ⚡ + TailwindCSS 💨                  |
| **Backend**  | Node.js + Express 🚀 + Firebase Functions 🔥     |
| **Database** | Firestore 🗃️ + Google Drive API ☁️              |
| **Blockchain** | Solidity ⚖️ + Hardhat 🛠️ (Local Deployment)  |
| **DevOps**   | Firebase Hosting 🌐 + GitHub CI/CD 🛠️           |

---

## 📁 Project Structure

```
TrustChain/
│
├── frontend/                  # React + Tailwind frontend
│   ├── backend/               # Express server
│   └── src/                   # UI Components, Pages, Hooks
│
├── contracts/                # Solidity Smart Contracts (Hardhat)
├── firebase.json             # Firebase Configuration
└── .env                      # Environment Variables (Ignored)
```

---

## ⚙️ Setup Instructions

> **Prerequisites:** Node.js, Firebase CLI, Hardhat, Git, Google Cloud CLI (gcloud)

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/trustchain-dapp.git
cd trustchain-dapp
```

### 🖼️ 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 🔌 3. Backend (Node.js API Server)

```bash
cd frontend/backend
npm install
node index.js
```

### 🔗 4. Hardhat (Smart Contracts)

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

---

## 🔐 Environment Variables

Create a `.env` file in the `frontend` and `backend` directories:

```env
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
GEMINI_API_KEY=your_gemini_key
```

Add `.env` to `.gitignore`.

---

## 📦 Deployment

### 🌀 Firebase Hosting

```bash
firebase login
firebase init
firebase deploy --only hosting
```

### ☁️ Google Cloud Run (Optional)

```bash
gcloud auth login
gcloud builds submit --tag gcr.io/<project-id>/backend
gcloud run deploy backend-service --image gcr.io/<project-id>/backend --platform managed --region us-central1 --allow-unauthenticated
```

---

## 🧪 Features

✅ Firebase Authentication  
✅ Google Drive integration  
✅ Firestore real-time database  
✅ Local smart contract deployment  
✅ Clean and responsive UI  
✅ Google Gemini AI Integration



## 👨‍💻 Contributors

| Name             | Role                     |
|------------------|--------------------------|
| Vinay Kamble     | Full Stack + Blockchain  |
| Diksha khade     | Design and Authentication|
| Rutuja mane      | Front End developer      |
| Aisshwarya Gurav | AI Dev                   |

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgements

- [Firebase](https://firebase.google.com/)
- [Google Cloud](https://cloud.google.com/)
- [Hardhat](https://hardhat.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Gemini AI](https://makersuite.google.com/app)


> 💬 Feel free to contribute, fork, and star this project. Let's build trust together — one block at a time!

Let me know if you'd like me to:
- Add your personal GitHub handle, team members, or repo links
- Convert it into an actual file and upload to your project automatically
- Help you add a logo/banner
