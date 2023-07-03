import { ethers } from "ethers";
import { useEffect, useState } from "react";
import "./App.css";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: "Roboto",
    },
  });

  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    //getATMContract();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {useEffect(() => {
        getWallet();
      }, [])}
      {!account ? (
        <>
          <Typography variant="h1" className="p-12">
            Please connect your wallet to proceed
          </Typography>
          <Button variant="outlined" onClick={() => connectAccount()}>
            {" "}
            Connect Wallet{" "}
          </Button>
        </>
      ) : (
        <>
          <div className="flex justify-center w-full">
            <div className="flex flex-col gap-3 p-3 w-full md:w-1/2">
              <Typography variant="h1" id="answer" className="w-full">
                0
              </Typography>
              <div className="flex justify-center gap-3">
                <TextField
                  variant="outlined"
                  type="number"
                  placeholder="Number 1"
                  className="w-full"
                />
                <TextField
                  variant="outlined"
                  type="number"
                  placeholder="Number 2"
                  className="w-full"
                />
              </div>
              <div className="flex justify-center gap-3">
                <Button variant="contained" className="w-full">
                  Add
                </Button>
                <Button variant="contained" className="w-full">
                  Subtract
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
