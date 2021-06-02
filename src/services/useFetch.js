// Goal: create a hook that makes it easy to make HTTP calls without repeated code
import {useState, useEffect} from 'react'

// baseUrl defined in package.json 
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, isLoading] = useState(true)

      // new useEffect using async and await
      useEffect(() => {
          async function init() {
            try {
                const response = await fetch(baseUrl + url);
                if (response.ok) {
                    const json =  await response.json()
                    setData(json)
                } else {
                    throw response;
                }
            } catch (error) {
                setError(error)
            } finally {
                isLoading(false)
            }
          }
          init()
      }, [url])

      return { data, error, loading};
}