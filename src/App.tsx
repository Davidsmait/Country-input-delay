import {useEffect, useState} from 'react'
import emoji from './assets/ome-svgrepo-com.svg'
import './App.css'
import {useDebounce} from "use-debounce";

interface Country {
    name: {
        common: string
    },
    cca3:string,
    flag: string,
    flags: {
      png: string,
      svg: string
    }
}
function App() {
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue ] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Country[]>();
  const [searchDebounce] = useDebounce(searchValue, 1000);
    console.log("Debpunced data: ",searchDebounce)
  const url = 'https://restcountries.com/v3.1/name/'

    useEffect(() => {
        const fetchData = async () => {
            if (searchDebounce.trim() !== '') {
                try {
                    const response = await fetch(url + searchDebounce)
                    const data: Country[] = await response.json()
                    console.log("data: ",data)
                    setSearchResults(data)
                }catch (e) {
                    console.error(e)
                }
            }

        }
        fetchData()
    }, [searchDebounce]);

    return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={emoji} className="logo react" alt="React logo" />
        </a>
      </div>
        <input
            value={searchValue}
            type='search'
            onChange={(e) => setSearchValue(e.target.value)}
        />
      <h1>Country Result:</h1>
       <div>
           {searchResults?.length
            ? searchResults.map((item => 
            <div>
              
              <h2 key={item.cca3}>
              <img style={{width: "40px", padding: "0 10px 0 0"}} src={item.flags.png}  />
                 {item.name.common}
                </h2>
            </div>))
            : ''}
       </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Example of fecth api countries
      </p>
    </>
  )
}

export default App
