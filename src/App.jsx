import { useState, useEffect} from 'react';
import Header from "./components/Header";
import Button from "./components/Button";
import { formatearDinero, calcularTotalAPagar} from "./helpers";
import Swal from "sweetalert2";

function App() {
  // definiendo la variable con destructuring de un arreglo - esta variable modifica su estado
  const [cantidad, setCantidad] = useState(10000);
  // usando use state para el select 
  const [meses, setMeses] = useState(6);
  // usando state para calcular total a pagar
  const [total, setTotal] = useState(0);
  // calcular los pagos mensuales
  const [pago, setPago] = useState(0);
  // uso de useEffect
  useEffect(() => {
    // calcular el total a pagar
    setTotal(calcularTotalAPagar(cantidad, meses));
  }, [cantidad, meses]);

  useEffect(() => {
    // calcular el abono mensual
    setPago(total / meses);
  }, [total]);
  // estas variales se quedan fijas, estaticas sin cambiar su valor
  const MIN = 1000;
  const MAX = 20000;
  const STEP = 100;

  // funcion para el evento de change en el range
  function handleChange(e) {
    setCantidad(parseInt(e.target.value));
  }

  // function para los botones (decremento e incremento)
  function handleClickDecremento() {
    const valor = cantidad - STEP;
    if(valor < MIN) {
      Swal.fire({
        icon: 'error',
        title: '<b style="font-weight: bold;">Hubo un Error</b>',
        text: 'la cantidad no es permitida!',
        showConfirmButton: false,
        showCloseButton: true
      });
      return;
    }
    setCantidad(valor);
  }

  function handleClickIncremento(){ 
    const valor = cantidad + STEP;
    if(valor > MAX) {
      Swal.fire({
        icon: 'error',
        title: '<b style="font-weight: bold;">Hubo un Error</b>',
        text: 'la cantidad no es permitida!',
        showConfirmButton: false,
        showCloseButton: true
      });
      return;
    }
    setCantidad(valor);
  }

  return (

    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10 rounded-xl">
        {/* <Header></Header> - Esta otra forma tambien se utiliza pero no tanto */}
        <Header/>
        <div className="flex justify-between mt-5">
          <Button 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>
            }
            fn={handleClickDecremento}
            />
          <Button
            icon={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            }
            fn={handleClickIncremento}
            />
        </div>
        <input 
          type="range" 
          name="" 
          id="" 
          min={MIN}
          max={MAX}
          step={STEP}
          value={cantidad}
          // step="1000" este es utilizado para brincar de 100 o depende del valor que le coloques
          onChange={handleChange}
          className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600 my-5" />
          <p className="text-center my-5 text-5xl font-extrabold text-indigo-600">{formatearDinero(cantidad)} MXN</p>
          <h2 className='text-2xl font-bold text-gray-500'>Elije un <span className='text-indigo-600'>Plazo</span> a pagar:</h2>
          <select name="" id="" className='mt-5 w-full p-2 text-gray-500 bg-white border border-gray-300 rounded-lg text-center font-bold text-xl' value={meses} onChange={e => setMeses(+e.target.value)}>
            <option value="6">6 Meses</option>
            <option value="12">12 Meses</option>
            <option value="24">24 Meses</option>
          </select>
          <div className="my-5 space-y-3 bg-gray-50 p-5">
            <h2 className='text-2xl font-bold text-gray-500'>Resumen <span className='text-indigo-600'>de pagos:</span></h2>
            <p className="text-xl text-gray-500 text-center font-bold">{meses} Meses</p>
            <p className="text-xl text-gray-500 text-center font-bold">Total a pagar: {formatearDinero(total)}</p>
            <p className="text-xl text-gray-500 text-center font-bold">Pagos Mensuales: {formatearDinero(pago)}</p>
          </div>
    </div>
  )
}

export default App;
