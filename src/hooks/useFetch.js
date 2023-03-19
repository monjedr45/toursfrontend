import axios from "axios"
import { useState, useEffect } from "react"

export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const postData = (postData) => {

    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
      data: JSON.stringify(postData)
    })
  }
  const updateData = (updatedData, type) => {
    let headers;
    
    if (type === "json") {
      headers = {
        "Content-Type": "application/json",
      }
    } else if (type === "formData") {
      headers = {
        "Content-Type": "multipart/form-data",
      }
    }

    setOptions({
      method: "PATCH",
      headers: {
        ...headers,
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
      data: updatedData
    })
  }

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async (fetchOptions) => {
      setIsPending(true)
      try {
        const res = await axios({
          url,
          ...fetchOptions
        })
        setIsPending(false)
        setData(res.data)
        setError(null)
      } catch (err) {
        setIsPending(false)
        setError(err.response.data.message)
      }
    }

    // invoke the function
    if (method === "GET") {
      fetchData()
    }
    if (method === "POST" && options) {
      fetchData(options)
    }
    if ((method === "PATCH" || method === "PUT") && options) {

      fetchData(options)
    }

    return () => {
      controller.abort()
    }

  }, [url, method, options])

  return { data, isPending, error, postData, setError, updateData }
}