import * as React from 'react';
import GraficoPie from './GraficoPie';
import GraficoCompleto from './GraficoCompleto'
import Paper from '@mui/material/Paper';

const Dashboard = () => {

  return(
    <Paper
    sx={{ paddingTop: "16px", paddingBottom: "16px" }}
    elevation={3}
    >
    <h2 style={{ textAlign: "center", fontWeight: 'bold' }}>Dashboard</h2>
    <GraficoCompleto/>
    <GraficoPie/>
    </Paper>

  )
}

export default Dashboard