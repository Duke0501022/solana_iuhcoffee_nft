import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ThirdwebProvider ,ThirdwebAuthConfig} from "@thirdweb-dev/react/solana";
import { Network } from "@thirdweb-dev/sdk/solana";
import type { AppProps } from "next/app";
//import { redirect } from "react-router-dom";
import "../styles/globals.css";
type MyThirdwebAuthConfig = ThirdwebAuthConfig & { loginRedirect: "/"};
// Change the network to the one you want to use: "mainnet-beta", "testnet", "devnet", "localhost" or your own RPC endpoint
const network: Network = 'devnet';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      
    authConfig={{
      authUrl: "/api/auth",
      domain: "iuhnft.com",
      loginRedirect: "/", // add the loginRedirect property here
    } as MyThirdwebAuthConfig}
    network={network}
  >
    <WalletModalProvider>
      <Component {...pageProps} />
    </WalletModalProvider>
  </ThirdwebProvider>
  );
}

export default MyApp;
