import { Contract, ethers } from "ethers";
import { useState } from "react";
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


  const basicMathAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; //MODIFY THIS TO POINT TO THE ADDRESS WHERE YOU DEPLOYED THE CONTRACT


  const [contract, setContract] = useState(undefined);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState("Unavailable");

  const connectWallet = () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      provider.send("eth_requestAccounts", []).then(() => {
        provider.getSigner().then((signer) => {
          setContract(new Contract(basicMathAddress, basicMath.abi, signer));
        });
      });
    } else {
      alert("Please install MetaMask extension");
    }
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
    const latestResult = await contract.getLatestResult();
    setResult(Number(latestResult));
  };

  updateResult();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-3 p-3 w-full md:w-1/2">
          <Typography variant="h3"> Latest Result </Typography>
          <Typography variant="h1" className="w-full">
            {result}
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
          <Button variant="contained" onClick={connectWallet}>
            Connect Wallet
          </Button>
        </div>
      </div>
      
    </ThemeProvider>
  );
}

export default App;
