import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from '../../App'
import Typography from '@material-ui/core/Typography';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

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

  const { stockHistory, isHistoryLoading, isError } = useStockHistory(stockNames)
  const { currentStockPrice, isCurrentPriceLoading } = useStockCurrentPrice(stockNames)

  if (isCurrentPriceLoading || isHistoryLoading) return <div>'Loading'</div>

  const calculateFinalStockNumber = stockHistory && Object.keys(stockHistory).reduce((acc: any, curr: any) => {
    const summ = stockHistory[curr].reduce((res: any, stock: any) => {
      const sharesPerMonth = +(investmentPortfolio[curr] / Number(stock.close)).toFixed(2)

      return res + sharesPerMonth
    }, 0)

    return ({
      ...acc,
      [curr]: summ,
    })
  }, {})

  const currentBudgetPerStock = calculateFinalStockNumber && Object.keys(calculateFinalStockNumber)?.map((item: any) => ({
    name: item,
    value: +(calculateFinalStockNumber[item] * currentStockPrice[item]).toFixed(2),
  }))

  const currentBudget = currentBudgetPerStock.reduce((acc: number, curr: any) => acc + curr.value , 0)

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div>
      <Typography variant="h3" gutterBottom>
       Hello, {context.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Here is your investment portfolio.
      </Typography>
      <PieChart width={400} height={400}>
        <Pie data={currentBudgetPerStock} dataKey="value" legendType="square" cx="50%" cy="50%" label>
          {currentBudgetPerStock.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Typography variant="subtitle1" gutterBottom>
        Total investment portfolio: {currentBudget} €
      </Typography>
    </div>
  )
}

export default Portfolio;
