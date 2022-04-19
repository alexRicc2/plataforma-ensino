import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  PieSeries,
  Title,
  ArgumentAxis
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const GraficoPie = () => {
  
  const dataChart = [
    { country: 'Russia', area: 12 },
    { country: 'Canada', area: 7 },
    { country: 'USA', area: 7 },
    { country: 'China', area: 7 },
    { country: 'Brazil', area: 6 },
    { country: 'Australia', area: 5 },
    { country: 'India', area: 2 },
    { country: 'Others', area: 55 },
  ];

  const [data, setData] = useState(dataChart) 
  return(
    <>
    <Chart
      data={data}
    >
      <PieSeries
        valueField="area"
        argumentField="country"
      />
      <Title
        text="Distribuição de cursos por categoria"
      />
      <Animation />
    </Chart>
  </>
  )
}
export default GraficoPie