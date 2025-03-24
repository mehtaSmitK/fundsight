import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { Chart } from 'react-google-charts';

interface SectorData {
  id: number;
  name: string;
  amount: string;
  percentage: string;
  bgcolor: string;
  gridSize: { xs: number; md: number };
}

interface PortfolioCompositionTabProps {
  sectorData: SectorData[];
  sankeyData: any[];
  sankeyOptions: any;
}

const PortfolioCompositionTab: React.FC<PortfolioCompositionTabProps> = ({
  sectorData,
  sankeyData,
  sankeyOptions,
}) => {
  return (
    <Box>
      {/* Sector Allocation Section */}
      <Paper sx={{ bgcolor: '#1b1a1a', borderRadius: '11px', p: 2, mb: 3 }}>
        <Box mb={3}>
          <Typography variant="h6" sx={{ color: '#E0E0E0', fontWeight: 600 }}>
            Sector Allocation
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {sectorData.map((sector) => (
            <Grid key={sector.id} item xs={sector.gridSize.xs} md={sector.gridSize.md}>
              <Paper
                sx={{
                  bgcolor: sector.bgcolor,
                  borderRadius: '12px',
                  p: 2,
                  height: sector.id === 1 || sector.id === 2 ? 200 : 190,
                  position: 'relative',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#000' }}>
                  {sector.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#000' }}>
                  {sector.amount}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ position: 'absolute', bottom: 16, left: 16, fontWeight: 600, color: '#000' }}
                >
                  {sector.percentage}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Overlap Analysis Section */}
      <Paper sx={{ bgcolor: '#1b1a1a', borderRadius: '11px', p: 3, position: 'relative', height: '680px' }}>
        <Stack spacing={2}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" sx={{ color: '#E0E0E0' }}>
              Overlap Analysis
            </Typography>
            <Box
              sx={{
                ml: 1,
                width: 16,
                height: 16,
                border: '1px solid white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" sx={{ color: 'white', fontSize: '10px' }}>
                i
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle1" sx={{ color: '#E0E0E0' }}>
            Comparing: Motilal Large Cap Fund and Nippon Large Cap Fund
          </Typography>

          <Stack spacing={1}>
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  bgcolor: '#F8A100',
                  borderRadius: '3px',
                  mr: 1,
                }}
              />
              <Typography sx={{ color: '#E0E0E0' }}>
                <Typography component="span" sx={{ fontWeight: 600, color: '#E0E0E0' }}>
                  X Stocks Overlap
                </Typography>{' '}
                across these funds.
              </Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  bgcolor: '#F8A100',
                  borderRadius: '3px',
                  mr: 1,
                }}
              />
              <Typography sx={{ color: '#E0E0E0' }}>
                <Typography component="span" sx={{ fontWeight: 600, color: '#E0E0E0' }}>
                  Y% Average Overlap
                </Typography>{' '}
                in holdings.
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Sankey Diagram */}
        <Box sx={{ mt: 4, position: 'relative', height: '453px', display: 'flex', justifyContent: 'center' }}>
          <Chart
            chartType="Sankey"
            width="851px"
            height="447px"
            data={sankeyData}
            options={sankeyOptions}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default PortfolioCompositionTab;
