import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import type { GetServerSideProps } from "next";
import { getUser } from "../auth.config";

const Protected = (props: any) => {
  return (
    <div>
      <h1>Protected Page</h1>
      <p>user: {props.user.address} </p>
      <p>You have access to this page</p>
      <p>{props.data.message}</p>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const user = await getUser(req);
  
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const sdk = ThirdwebSDK.fromNetwork("devnet");
    const program = await sdk.getNFTDrop("FPPrtQTmALFMB5rzCFDjTAkKXMU7GcdY5PoBH5Yxg691");
    const nfts = await program?.getAllClaimed();

    const hasNFT = nfts?.some((nft) => nft.owner === user.address);
  
    if (!hasNFT) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    const data = {message: "We love NFTs"};
    return {
      props: {
        user, 
        data,
      },
     
    };
  };

export default Protected;