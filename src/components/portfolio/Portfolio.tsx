import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App'

import portfolios from './portfolios.json'
import { useStockHistory, useStockCurrentPrice } from './resources'

const useStyles = makeStyles(() => ({
  form: {
    minHeight: '100vh',
  },
}));

const Portfolio = () => {
  const { context } = useContext(AppContext);
  const classes = useStyles();

  const risk = 2 * Math.round(context.riskTolerance / 2)
  //@ts-ignore
  const portfolioWeights = portfolios[risk]
  const stockNames = portfolioWeights.map((stock: any) => stock.ticker).join(',')
  const monthlyContribution  = Number(context.income) * 0.15

  const investmentPortfolio = portfolioWeights.reduce((acc: any, cur: any) => ({...acc, [cur.ticker]: Number(cur.weight) * monthlyContribution}), {})

  const { stockHistory, isLoading, isError } = useStockHistory(stockNames)
  const { currentStockPrice } = useStockCurrentPrice(stockNames)

  const calculateFinalStockNumber = stockHistory && Object.keys(stockHistory).reduce((acc: any, curr: any) => {
    const summ = stockHistory[curr].reduce((res: any, stock: any) => {
      const sharesPerMonth = +(investmentPortfolio[curr] / Number(stock.close)).toFixed(2)

      console.log(sharesPerMonth)

      return res + sharesPerMonth
    }, 0)

    return ({
      ...acc,
      [curr]: summ,
    })
  }, {})

  const currentBudget = Object.keys(calculateFinalStockNumber).map((item: any) => ({
    [item]: calculateFinalStockNumber[item] * currentStockPrice[item]
  }))

  console.log(currentBudget)

  return (
    <h1>Hello</h1>
  )
}

export default Portfolio;
