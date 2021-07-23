import useSWR from 'swr'

const APIKey = 'c3003754ffd2dd059d005fa6c9709e2e'
const URL = 'https://financialmodelingprep.com/api/v3'
const from = '2017-01-01'
const to = '2021-06-01'
const query = `apikey=${APIKey}&from=${from}&to=${to}`

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then(res => res.json())

export const useStockHistory = (portfolio: string) => {
  const { data, error } = useSWR(`${URL}/historical-price-full/${portfolio}?${query}`, fetcher)

  return {
    stockHistory: data,
    isLoading: !error && !data,
    isError: error
  }
}
