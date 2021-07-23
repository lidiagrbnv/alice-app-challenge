import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App'

import portfolios from './portfolios.json'
import { useStockHistory } from './resources'

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

  console.log(monthlyContribution)

  const investmentPortfolio = portfolioWeights.reduce((acc: any, cur: any) => ({...acc, [cur.ticker]: Number(cur.weight) * monthlyContribution}), {})

  console.log(investmentPortfolio)

  const { stockHistory, isLoading, isError } = useStockHistory(stockNames)

  console.log(stockHistory)

  const calculateFinalStockNumber = Object.keys(stockHistory).map((item) => (
    stockHistory[item].reduce((acc: any, curr: any) => {
      const shares = +(investmentPortfolio[item] / Number(curr.close)).toFixed(2)

      console.log(shares)
    }, {})
  ))

  return (
    <h1>Hello</h1>
  )
}

export default Portfolio;
