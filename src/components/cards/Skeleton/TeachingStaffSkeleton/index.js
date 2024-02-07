// material-ui
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
// ==============================|| SKELETON - EARNING CARD ||============================== //

const TeachingStaffSkeleton = () => {
  const skeletonData = Array.from({ length: 10 });
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<Skeleton height={25} width={200} />} />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                  <Skeleton variant="rectangular" height={56} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Skeleton variant="rectangular" height={56} animation="wave" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Skeleton variant="rectangular" height={56} animation="wave" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Grid container justifyContent={'space-between'}>
            <Grid item xs={12} sm={3}>
              <Skeleton variant="rounded" height={50} width={410} animation="wave" />
            </Grid>
            <Grid container display={'flex'} justifyContent={'flex-end'} xs={12} sm={3}>
              <Skeleton variant="rounded" height={40} width={150} animation="wave" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        {skeletonData.map((_, i) => (
          <Grid key={i} item xs={12} sm={6} md={4}>
            <Card sx={{ position: 'relative' }}>
              <CardContent sx={{ pt: 2.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                  <Skeleton variant="circular" width={100} height={100} />

                  <Box sx={{ mb: 5, pt: 1 }}>
                    <Skeleton variant="rectangular" height={32} width={80} />
                  </Box>
                  <Box
                    sx={{
                      mb: 5,
                      gap: 2,
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-around'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" height={32} width={80} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" height={32} width={80} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                      <Skeleton variant="rectangular" height={32} width={80} />
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Skeleton variant="rectangular" height={36} width={120} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TeachingStaffSkeleton;
