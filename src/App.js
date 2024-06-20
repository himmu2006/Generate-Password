import { useCallback, useEffect, useRef, useState } from 'react'
// import logo from './logo.svg';
// import './App.css';
// import Chai from './components/Chai';

function App() {
  const [length,setLength] = useState(8);
  //whether to select the number or not same we apply for character also
  const [numberAllowed, setNumberAllowed] = useState(false); 
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed)  str += "!@#$%^&*(){}[]`~-+=";

    //for making the password
    for(let i =0;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1); 
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select(); //this is to show the selected text which is to be copy
    window.navigator.clipboard.writeText(password); //we have to copy to the clipboard so for that this
  } , [password])

  //isse hmlg ka jo password rhega wo show krne lgega screen pe
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]) //inside square bracket they are dependencies, which means by this password will get affected

  const passwordRef = useRef(null);

  return (
    <div className='h-screen w-screen bg-gray-200 flex flex-col justify-center items-center'>
      <div className='w-full max-w-md mx-auto rounded-lg px-4 my-12 text-white bg-[grey] '>
      <h1 className='text-white text-center my-3 py-2 text-2xl'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type = "text"
          value = {password} 
          className='outline-none text-black w-full py-1 rounded-lg px-3 my-3' 
          placeholder='Password' 
          readOnly 
          ref={passwordRef}
        />

        <button onClick = {copyPasswordToClipBoard} className='outline-none bg-[blue] text-[white] px-3 py-0.5 shrink-0 my-3 rounded-lg'>
          Copy
        </button>
      </div>

    <div className='flex text-sm gap-x-2 p-2'>
      <div className='flex items-center gap-x-1'>
        <input type='range'
          min={6}
          max={20}
          value={length}
          className='cursor-pointer'
          //we are passing event and if we pass event then it will call setLength property and then e.target.value is for value
          onChange = {(e) => {setLength(e.target.value)}} 
        />
        <label> Length : {length} </label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type='checkbox'
          defaultChecked = {numberAllowed}
          id='numberInput'
          //below we fired a callback and in that reverse the prev value true or false flip hota rhega
          onChange={() => {
            setNumberAllowed((prev) => !prev);
          }}
        />
        <label htmlFor='numberInput'>Numbers</label>
      </div>

      <div className='flex items-center gap-x-1'>
        <input type='checkbox'
          defaultChecked = {charAllowed}
          id='characterInput'
          //below we fired a callback and in that reverse the prev value true or false flip hota rhega
          onChange={() => {
            setCharAllowed((prev) => !prev);
          }}
        />
        <label htmlFor='characterInput'>Characters</label>
      </div>
    </div>
    </div>
    </div>
  );
}

export default App;
