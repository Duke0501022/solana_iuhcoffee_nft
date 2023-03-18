import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { useProgram, useClaimNFT, useClaimConditions, useLogin, } from "@thirdweb-dev/react/solana"
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const Login: NextPage = () => {
  const { program } = useProgram("FPPrtQTmALFMB5rzCFDjTAkKXMU7GcdY5PoBH5Yxg691", "nft-drop");
  const { mutateAsync: claim, isLoading, error } = useClaimNFT(program);
  const {data: conditions, isLoading: conditionsIsLoading} = useClaimConditions(program);
  const {publicKey} = useWallet();
  const { login } = useLogin();
  
  return (
    <div className={styles.page}>
      <div className={styles.header}><WalletMultiButtonDynamic /></div>
      <br/>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Image
            width={200}
            height={200}
            src="/logo.png"
            className={styles.icon}
            alt="logo"
          />
        </div>
        <h1 className={styles.h1}>Solana, meet thirdweb 👋</h1>
        {!publicKey ? <p>Connect your wallet</p>
         :<>
        <div>
          <button className={styles.btn} onClick={() => login()}>
            Login
          </button>
          <p>You can only login if you own an IUH nft </p>
        </div>
        <button className={styles.btn} disabled={isLoading} onClick={() => claim({amount: 1})}>Claim 1 IUH NFT</button>
          {conditionsIsLoading ? (
            <p>?/?</p>
          ) : (
            <p>
              {conditions?.totalAvailableSupply}/{conditions?.claimedSupply}
            </p>
          ) }
          </>} {}
      </div>
      <Link href="/" passHref>
        Protected Page
      </Link>
    </div>
  );
};

export default Login;
