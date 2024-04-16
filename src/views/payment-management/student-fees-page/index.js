import { Grid } from '@mui/material';
import FeesTable from 'features/payment-management/fees/components/FeesTable';

const Fee = () => {
  return (
    <>
      <Grid>
        <Grid container spacing={1} className="match-height">
          <FeesTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Fee;
