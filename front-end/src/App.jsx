import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState();
  const [fileOn, setFileOn] = useState();
  console.log('on',fileOn);

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = () => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const csvData = event.target.result;
      const jsonData = convertCSVtoJSON(csvData);
      downloadJSON(jsonData);
    };

    reader.readAsText(file);
  };
  const convertCSVtoJSON = (csvData) => {
    const lines = csvData.split('\r\n');
    const headers = lines[0].split(',');
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');
      if (currentLine.length !== headers.length) {
        // Ignorar linhas que não possuam o mesmo número de colunas que os cabeçalhos
        continue;
      }

      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      jsonData.push(obj);
    }

    return jsonData;
  };
  const downloadJSON = (jsonData) => {
    setFileOn(jsonData)
  };

  const handleClicks = () => {
  }
  const handleAtualizar = () => {
  }

  return (
    <>
      <h1>Shopper</h1>
      <div className="card">
        <input type="file" onChange={handleOnChange} />
        <button onClick={handleConvert}>Convert</button>
        <button type='button' onClick={handleClicks}>VALIDAR</button>
        <button type='button' onClick={handleAtualizar}>ATUALIZAR</button>
      </div>
    </>
  )
}

export default App
