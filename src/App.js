/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Preview from './components/preview';
import defaultIcon from './icons/default.svg';

import example1 from './examples/sample-1.json';
import example2 from './examples/sample-2.json';
import { IconSelector } from './components/icon';

function App() {
  let defaultCommands = {
    "icon": defaultIcon,
    "menu": []
  }
  
  let [commands, setCommands] = useState({
    ...defaultCommands,
    menu: example2
  });

  let textareaRef = useRef();

  let exportableCommands = (cmds) => {
    let toExport = {
      ...cmds
    };
    if (toExport.icon === defaultIcon) {
      delete toExport.icon;
    }
    return JSON.stringify(toExport, null, 2);
  }

  useEffect(() => {
    console.log("commands: ", commands);
    textareaRef.current.value = exportableCommands(commands);
  }, [commands]);

  let updateCommands = (newCommands) => {
    if (newCommands instanceof Array) {
      setCommands({
        ...defaultCommands,
        menu: newCommands
      });
    } else {
      setCommands({
        ...defaultCommands,
        ...newCommands
      });
    }
  };

  let copyToClipboard = (text) => {
    navigator.clipboard.writeText(exportableCommands(text));
  };

  let updateFromTextarea = () => {
    updateCommands(JSON.parse(textareaRef.current.value));
  };

  return (
    <div className="App">
      <Preview commands={commands}/>
      
      <button onClick={() => updateCommands(example1)}>Example 1</button>
      <button onClick={() => updateCommands(example2)}>Example 2</button>
      <button onClick={() => copyToClipboard(commands)}>Copy to Clipboard</button>
      
      <IconSelector />

      <br />
      <textarea ref={textareaRef} style={{width: "300px", height: "200px"}} defaultValue={exportableCommands(commands)} />
      <br />
      <button onClick={() => updateFromTextarea()}>Update</button>
      <br />
      <input type="file" id="file" onChange={(e) => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
          let data = e.target.result;
          let fileData = JSON.parse(data);
          updateCommands(fileData);
        }
        reader.readAsText(file);
      }}/>

    </div>
  );
}

export default App;
