import { useState, useEffect } from 'react'
import classnames from 'classnames'
import axios from 'axios'

const ITEMS_API_URL = 'https://restcountries.com/v3.1/name/'
const DEBOUNCE_DELAY = 500

const useSearch = (query) => {
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)
   const [search, setSearch] = useState([])

   useEffect(() => {
      setSearch([])
   }, [query])

   useEffect(() => {
      setSearch([])
   }, [query])

   useEffect(() => {
      setLoading(true)
      setError(false)

      const data = setTimeout(() => {
         axios({
            method: 'GET',
            url: ITEMS_API_URL + query,
         })
            .then((res) => {
               setSearch(res.data)
               setLoading(false)
            })
            .catch((e) => {
               setError(true)
               setLoading(false)
            })
      }, DEBOUNCE_DELAY)

      return () => clearTimeout(data)
   }, [query])

   return { loading, error, search }
}

const Autocomplete = ({ onSelectItem }) => {
   const [value, setValue] = useState('')

   const { loading, error, search } = useSearch(value)

   const handleOnChange = (e) => {
      setValue(e.target.value)
   }

   console.log(search)
   const inputWrapperClassname = classnames('control', { 'is-loading': loading })

   return (
      <div className="wrapper">
         <div className={inputWrapperClassname}>
            <input
               value={value}
               onChange={handleOnChange}
               type="text"
               className="input"
            />
         </div>
         {!loading && !!search.length && (
            <div className="list is-hoverable">
               {search.map((item) => (
                  <a
                     className="list-item"
                     style={{ display: 'block' }}
                     key={item.name.common}
                     onClick={() => onSelectItem(item.name.common)}
                  >
                     {item.name.common}
                  </a>
               ))}
            </div>
         )}
         {loading && value && (
            <div>
               <span>Loading...</span>
            </div>
         )}
      </div>
   )
}

export default Autocomplete
