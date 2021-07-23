import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { AppContext } from '../../App'

const useStyles = makeStyles(() => ({
  form: {
    minHeight: '100vh',
  },
}));

const UserFrom = () => {
  const { setContext } = useContext(AppContext);
  const classes = useStyles();
  const [riskTolerance, setRiskTolerance] = useState(0);
  const [formValues, setFormValues] = useState({});

  const handleSliderChange = (event: any, newValue: any) => {
    setRiskTolerance(newValue);
    setFormValues({
      ...formValues,
      riskTolerance: newValue,
    })
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
        currentTarget: { name, value },
    } = event;

    setFormValues({
      ...formValues,
      [name]: value,
    })
  };

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setContext(formValues)
  }

console.log(formValues)

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <Grid className={classes.form} container alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <TextField onChange={handleInputChange} fullWidth label="What's your name?" name="name" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField onChange={handleInputChange} type="number" fullWidth label="How much do you earn per month?" name="income" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>
          What is your risk tolerance level?
          </Typography>
          <Slider marks={true} min={0} max={10} step={1} value={riskTolerance} name="riskTolerance" onChange={handleSliderChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" type="submit" size="large" color="primary">
            Calculate
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UserFrom;
