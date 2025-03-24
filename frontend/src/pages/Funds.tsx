import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Funds: React.FC = () => {
  const funds = useSelector((state: RootState) => state.investments.funds);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fund Name</TableCell>
      
          </TableRow>
        </TableHead>
        <TableBody>
          {funds.map((fund) => (
            <TableRow key={fund.name}>
              <TableCell>{fund.name}</TableCell>
         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Funds;