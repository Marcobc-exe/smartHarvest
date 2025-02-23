// import { useRef  } from 'react'
import './App.css'
import { MapTable } from './components/MapTable/MapTable';

// const Input = ({ items, setItems }) => {
//   const inputRef = useRef(null)
  
//   const handleSubmit = (evt) => {
//     if (!inputRef.current.value.length) return;
//     evt.preventDefault();

//     setItems([...items, inputRef.current.value])
//     inputRef.current.value = ''
//   }
  
//   const handleDelete = (itemToDelete) => {
//     setItems(() => items.filter((item) => item !== itemToDelete))
//   }
  
//   return(
//     <div>
//       <form onSubmit={(evt) => {handleSubmit(evt)}}>
//           <input
//             type='text'
//             placeholder='item'
//             ref={inputRef}
//           />
//           <button>add item</button>
//       </form>

//       <div className="item-list-container">
//           {items.length > 0 && items.map((item)=> (
//             <div className="item" key={item}>{item}
//               <button onClick={(evt) => {handleDelete(item)}}>X</button>
//             </div>
//           ))}
//       </div>
//     </div>
//   )  
// }

const App = () => {
  const listOfMaps = [
    {
      id: "0",
      name: "VEGA BAJA",
      center: "-32.420329; -70.952348",
      zoom: 14,
    },
    {
      id: "1",
      name: "Billy Corn",
      center: "-32.411042; -71.047160",
      zoom: 14,
    }
  ];
    
  return (
    <>
      <h2>Smart Harvest</h2>
      <MapTable />
      {/* <Input items={items} setItems={setItems} /> */}
    </>
  )
}

export default App
