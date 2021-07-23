import { AnyRecord } from 'dns'
import useSWR from 'swr'

const APIKey = 'c3003754ffd2dd059d005fa6c9709e2e'
const URL = 'https://financialmodelingprep.com/api/v3'
const from = '2017-01-01'
const to = '2021-06-01'
const query = {
  apikey: APIKey,
  from,
  to
}

const sortStockHistory = (stockList: any) => {
  if (!stockList) return

  return (
    stockList.reduce((acc: any, stock: any) => {
    const dates = stock.historical.filter((item: any, idx: any) => {
      const dayOfMonth = new Date(item.date).getDate()
      
      return idx === 0 || dayOfMonth === 1
    }).map(({ date, close }: any) => ({
      date,
      close,
    }))
    
    return ({
      ...acc,
      [stock.symbol]: dates,
    })
  }, {})
  )
}

const sortCurrentStockData = (stockList: any) => {
  if (!stockList) return

  console.log(stockList)

  return stockList.reduce((acc: any, stock: any) => ({ ...acc, [stock.symbol]: stock.price }), {})
}

//@ts-ignore
const fetcher = (...args: any) => fetch(...args).then(res => res.json())

export const useStockHistory = (portfolio: string) => {
  const { data, error } = useSWR(`${URL}/historical-price-full/${portfolio}?${new URLSearchParams(query)}`, fetcher)

  return {
    stockHistory: sortStockHistory(data?.historicalStockList),
    isLoading: !error && !data,
    isError: error
  }
}

export const useStockCurrentPrice = (portfolio: string) => {
  const { data, error } = useSWR(`${URL}/profile/${portfolio}?${new URLSearchParams({ apikey: APIKey })}`, fetcher)

  return {
    currentStockPrice: sortCurrentStockData(data),
    isLoading: !error && !data,
    isError: error
  }
}
