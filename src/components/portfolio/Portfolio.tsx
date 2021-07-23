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

  console.log(stockNames)

  const { stockHistory, isLoading, isError } = useStockHistory(stockNames)

  console.log(stockHistory)

  return (
    <h1>Hello</h1>
  )
}

export default Portfolio;
