import { ethers } from "ethers";
import { useEffect, useState } from "react";
import basicMath from "../artifacts/contracts/BasicMath.sol/BasicMath.json";
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
  const [contract, setContract] = useState(undefined);

  const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"; //MODIFY THIS TO POINT TO THE ADDRESS WHERE YOU DEPLOYED THE CONTRACT

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

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
    getContract();
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const basicMathContract = new ethers.Contract(
      contractAddress,
      basicMath.abi,
      signer
    );

    setContract(basicMathContract);
  };

  const add = async (num1, num2) => {
    if (!contract) return;
    let tx = await contract.add(num1, num2);
    await tx.wait();
    updateResult();
  };

  const subtract = async (num1, num2) => {
    if (!contract) return;
    let tx = await contract.subtract(num1, num2);
    await tx.wait();
    updateResult();
  };

  const updateResult = async () => {
    if (!contract) return;
    setResult(Number(await contract.getLatestResult()));
  };

  updateResult();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      {useEffect(() => {
        getWallet();
      }, [])}

      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-3 p-3 w-full md:w-1/2">
          <Typography variant="h3"> Latest Result </Typography>
          <Typography variant="h1" className="w-full">
            {account? result : "Unavailable"}
          </Typography>
          <div className="flex justify-center gap-3">
            <TextField
              variant="outlined"
              type="number"
              placeholder="Number 1"
              value={num1}
              onChange={(event) => setNum1(Number(event.target.value))}
              className="w-full"
            />
            <TextField
              variant="outlined"
              type="number"
              placeholder="Number 2"
              value={num2}
              onChange={(event) => setNum2(Number(event.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex justify-center gap-3">
            <Button
              variant="contained"
              onClick={() => add(num1, num2)}
              className="w-full"
            >
              Add
            </Button>
            <Button
              variant="contained"
              onClick={() => subtract(num1, num2)}
              className="w-full"
            >
              Subtract
            </Button>
          </div>
          <Button variant="contained" onClick={connectAccount}>
            Connect Wallet
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
