import { useState, useEffect, useCallback } from 'react'

export const useDataFetching = (fetchFunction, dependencies = [], options = {}) => {
  const { enabled = true, initialData = null, onSuccess, onError } = options
  
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const fetch = useCallback(async () => {
    if (!enabled) return

    setIsLoading(true)
    setIsError(false)
    setError(null)
    setIsSuccess(false)

    try {
      const result = await fetchFunction()
      setData(result)
      setIsSuccess(true)
      onSuccess?.(result)
    } catch (err) {
      setIsError(true)
      setError(err)
      onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }, [fetchFunction, enabled, onSuccess, onError])

  useEffect(() => {
    fetch()
  }, [...dependencies, fetch])

  const refetch = useCallback(() => {
    return fetch()
  }, [fetch])

  return {
    data,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
    setData
  }
}
