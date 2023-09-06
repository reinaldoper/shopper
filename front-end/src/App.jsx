import { useState } from 'react'
import './App.css'
import { getValidated, update } from './service/fetchs';



function App() {
  const [file, setFile] = useState();
  const [fileOn, setFileOn] = useState();
  const [validate, setValidated] = useState([]);
  const [save, setSave] = useState(true);
  const [render, setRender] = useState(false)
  const [error, setError] = useState('');
  const [convert, setConvert] = useState(true);
  const [start, setStart] = useState(false);
  const [msg, setMsg] = useState('');

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = () => {
    if (!file) {
      alert('Please select a file');
    } else {
      setRender(false);
      setValidated([])
      setSave(true);
      setStart(false);
      const reader = new FileReader();

      reader.onload = (event) => {
        const csvData = event.target.result;
        const jsonData = convertCSVtoJSON(csvData);
        downloadJSON(jsonData);
        if (jsonData.length > 0) {
          setConvert(false);
        } else {
          setConvert(true);
        }
      };

      reader.readAsText(file);

    }
  };

  const convertCSVtoJSON = (csvData) => {
    const lines = csvData.split('\r\n');

    if (lines.length < 2) {
      alert('CSV file is empty or improperly formatted.');
      return [];
    }

    const headers = lines[0].split(',');
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(',');

      if (currentLine.length !== headers.length) {
        alert('CSV file has inconsistent data.');
        setFile([]);
        break;
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
    const { type, message, error } = await getValidated(options);
    if (message) {
      setValidated(message);
      setSave(!type);
      setRender(true);
    } else {
      setError(error);
      setSave(!type);
      setRender(true);
    }
  }



  const handleAtualizar = async () => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fileOn),
    };
    const { message, error } = await update(options);
    if (message) {
      setStart(true);
      setRender(false);
      setValidated([]);
      setSave(true);
      setConvert(true);
      setMsg(message);
    } else {
      setStart(true);
      setRender(false);
      setValidated([]);
      setSave(true);
      setConvert(true);
      setMsg(error);
    }
  }
  console.log('file', fileOn);

  const resultJson = validate.map((item, index) => (
    <div key={index} className='div-li'>
      <li><strong>Codigo:</strong> {item.code}</li>
      <li><strong>Nome:</strong> {item.name}</li>
      <li><strong>Preço atual:</strong> {item.actual_price}</li>
      <li><strong>Novo preço:</strong> {item.new_price}</li>
      <li><strong>Mensagem:</strong> {item.message}</li>
    </div>

  ))



  return (
    <div className='container'>
      <h1>Shopper</h1>
      <div className="card">
        <h3>Escolha um arquivo .csv</h3>
        <input type="file" onChange={handleOnChange} style={{ marginBottom: '10px' }} />
        <button type='button' onClick={handleConvert} style={{ marginBottom: '10px' }}>Convert</button>
        <button type='button' disabled={convert} onClick={handleClicks} style={{ marginBottom: '10px' }}>VALIDAR</button>
        <button type='button' disabled={save} onClick={handleAtualizar}>ATUALIZAR</button>
      </div>
      {render ? validate.length > 0 ? <ol>{resultJson}</ol> : <h1>{error}</h1> : null}
      {start ? <h1>{msg}</h1>: null}
    </div>
  )
}

export default App
