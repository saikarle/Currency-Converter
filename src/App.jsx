import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyinfo from "./hooks/Currencyinfo.js";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [conv, setConv] = useState(0);

  const rates = useCurrencyinfo(from); // jaise { usd: 0.012, eur: 0.011 }
  const options = Object.keys(rates);  // ["usd", "eur", ...]

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(conv);
    setConv(amount);
  };

  const convert = () => {
    setConv(amount * (rates[to] ?? 0)); // data aane se pehle undefined na aaye
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/4025825/pexels-photo-4025825.jpeg')`,
      }}
    >
      <div className="w-full ">
        <div className="w-full  max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}                
                CurrencyOption={options}
                selectCurrency={from}
                onCurrencyChange={setFrom}
              />
            </div>

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={conv}
                CurrencyOption={options}
                selectCurrency={to}
                onCurrencyChange={setTo}
              />
            </div>

            <button
              type="submit"
              className="w-full  hover:bg-blue-700 hover:shadow-lg transition-all duration-300  bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;