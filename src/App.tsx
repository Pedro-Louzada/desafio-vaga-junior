import React, { useState } from 'react'
import './App.css'

//tipando os objetos que o useState irá receber
interface ClickedProps {
  clientX: number,
  clientY: number,
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([])
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([])

  function getCordenates(e: React.MouseEvent<HTMLElement>) {
    //estamos dando um destruciton dentro do evento e pegando somente o que iremos utilizar (coordenadas da página).
    const { clientX, clientY } = e

    /*demos um destruction da variavel inicial, inicialmente um array vazio (clickedPoints[]) e adicionamos 
    a ele as coordenadas conforme o click*/
    setClickedPoints([...clickedPoints, { clientX, clientY }])
  }

  //função para desfazer o clique na tela
  //como o state não nos permite excluir dados dele, vamos ter que copiar os dados para dentro de uma const
  //utilizar o pop para retirar o útilo item do array
  //salvamos o novo array, jogando-o dentro do setClcikedPoints
  function handleUndo(){
    const newClickedPoints = [...clickedPoints];
    const undoPoint = newClickedPoints.pop()
    setClickedPoints(newClickedPoints)
    if (!undoPoint) return 
    setUndoPoints([...undoPoints, undoPoint])
  }

  function handleRedo(){
    const newUndoPoints = [...undoPoints]
    const redoPoint = newUndoPoints.pop()
    setUndoPoints(newUndoPoints)
    if(!redoPoint) return
    setClickedPoints([...clickedPoints, redoPoint])
  }

  return (
    //jogamos para dentro da function do map o clickedPoints para conseguir associar a estilização ao dado que recebemos
    //disabled no button de "Desfazer" para quando não houver mais itens dentro do array
    <>
      <button
        disabled={clickedPoints.length === 0}
        onClick={handleUndo}
      >
        Undo
      </button>
      <button
        disabled={undoPoints.length === 0}
        onClick={handleRedo}
      >
        Redo
      </button>
      <div className="App" onClick={getCordenates}>
        {clickedPoints.map((clickedPoints, index) => {
          return (
            <div
              key={index}
              style={{
                left: clickedPoints.clientX,
                top: clickedPoints.clientY,
                position: 'absolute',
                borderRadius: '50%',
                background: 'red',
                width: '10px',
                height: '10px'
              }}
            ></div>
          )
        })}
      </div>
    </>
  )
}

export default App
