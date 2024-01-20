// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// ** Icon Imports
import Icon from 'components/icon';

// ** Custom Components Imports
import CustomAvatar from 'components/mui/avatar';

const data = [
  {
    stats: '230k',
    title: 'Students',
    color: 'primary',
    icon: 'tabler:chart-pie-2'
  },
  {
    color: 'info',
    stats: '8.549k',
    title: 'Staffs',
    icon: 'tabler:users'
  },
  {
    color: 'error',
    stats: '1.423k',
    title: 'Admin User',
    icon: 'tabler:shopping-cart'
  },
  {
    stats: '$9745',
    color: 'success',
    title: 'Courses',
    icon: 'tabler:currency-dollar'
  }
];

const renderStats = () => {
  return data.map((sale, index) => (
    <Grid item xs={6} md={6} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin="light" color={sale.color} sx={{ mr: 4, width: 42, height: 42 }}>
          <Icon icon={sale.icon} fontSize="1.5rem" />
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5">{sale.stats}</Typography>
          <Typography variant="body2">{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const EcommerceStatistics = () => {
  return (
    <Card>
      <CardHeader
        title="Statistics"
        sx={{ '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' } }}
        action={
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Updated 1 month ago
          </Typography>
        }
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(2.5)} !important`, pb: (theme) => `${theme.spacing(7.5)} !important` }}>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EcommerceStatistics;
