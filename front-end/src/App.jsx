import { useState } from 'react'
import './App.css'
import { getValidated, update } from './service/fetchs';

function App() {
  const [file, setFile] = useState();
  const [fileOn, setFileOn] = useState();
  const [validate, setValidated] = useState([]);
  const [save, setSave] = useState(true);
  const [render, setRender] = useState(false)

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = () => {
    setRender(false);
    setFileOn([]);
    setValidated([])
    setSave(true);
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

  const handleClicks = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fileOn),
    };
    const { type, message } = await getValidated(options);
    setValidated(message);
    setSave(!type);
    setRender(true);
  }
  const handleAtualizar = async () => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fileOn),
    };
    await update(options);
    setRender(false);
    setFileOn([]);
    setValidated([]);
    setSave(true);
  }
  const resultJson = validate.map((item, index) => (
    <div key={index} className='div-li'>
      <li><strong>Codigo:</strong> {item.code}</li>
      <li><strong>Nome:</strong> {item.name}</li>
      <li><strong>Preço atual:</strong> {item.actual_price}</li>
      <li><strong>Novo preço:</strong> {item.new_price}</li>
      <li><strong>Message:</strong> {item.message}</li>
    </div>

  ))

  console.log('save', save);
  return (
    <>
      <h1>Shopper</h1>
      <div className="card">
        <input type="file" onChange={handleOnChange} />
        <button onClick={handleConvert}>Convert</button>
        <button type='button' onClick={handleClicks}>VALIDAR</button>
        <button type='button' disabled={save} onClick={handleAtualizar}>ATUALIZAR</button>
      </div>
      {render ? <ol>{resultJson}</ol> : null}
    </>
  )
}

export default App
