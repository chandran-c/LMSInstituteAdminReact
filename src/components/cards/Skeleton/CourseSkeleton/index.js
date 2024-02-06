import React from 'react';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

const CourseSkeleton = () => (
  <>
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={<Skeleton height={25} width={200} />} />
          <CardContent sx={{ pt: 0 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Skeleton variant="rectangular" height={56} animation="wave" />
              </Grid>
              <Grid item xs={12} sm={6}>
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
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {[...Array(6)].map((_, index) => (
        <Grid key={index} item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ pb: 0 }}>
              <Skeleton variant="rectangular" height={160} />
            </CardContent>
            <CardContent>
              <Box>
                <Skeleton variant="rectangular" width={40} height={24} />
              </Box>
              <Box sx={{ mr: 2, mt: 2, display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="text" width={120} height={28} />
                <Skeleton variant="text" width={80} height={16} sx={{ mt: 1 }} />
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Grid sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'primary.main', mr: 0.5 } }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <Skeleton width={30} />
                  </Typography>
                </Grid>
                <Grid>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <Skeleton width={40} />
                  </Typography>
                </Grid>
              </Box>
            </CardContent>
            <CardActions className="demo-space-x" sx={{ pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Grid sx={{ mt: 1 }}>
                <Skeleton variant="rectangular" width={100} height={40} />
              </Grid>
              <Skeleton variant="rectangular" width={120} height={40} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
);

export default CourseSkeleton;
