import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyText, setCopyText] = useState("Copy");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%&*";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, charAllowed, setPassword, numberAllowed]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopyText("Copied");
    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8">Password Generator</h1>

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none"
        />
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-r-md hover:bg-gray-600 focus:outline-none"
          onClick={copyToClipBoard}
        >
          {copyText}
        </button>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer"
        />
        <label className="text-white ml-4">Length: {length}</label>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          onChange={() => setNumberAllowed((prev) => !prev)}
          className="mr-2 w-4 h-4 bg-gray-800 border-gray-500 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
        <label htmlFor="" className="text-white">
          Numbers
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
          className="mr-2 w-4 h-4 bg-gray-800 border-gray-500 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
        <label htmlFor="" className="text-white">
          Characters
        </label>
      </div>
    </div>
  );
};

export default App;
