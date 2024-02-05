// ** MUI Imports
import { Box, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// ** Custom Component Import
import Grid from '@mui/material/Grid';
import Icon from 'components/icon';
import { useState } from 'react';
import CategoryEditModal from './CategoryEditModal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const CardStatsVertical = (props) => {
  // ** Props
  const { sx, title, subtitle, image } = props;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [statusValue, setStatusValue] = useState('');

  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card sx={{ ...sx }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar alt="Remy Sharp" src={image} sx={{ width: 56, height: 56 }} />
            </Box>
            <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton onClick={() => handleEdit()} aria-label="capture screenshot" color="primary">
                <Icon icon="tabler:edit" />
              </IconButton>
              <IconButton aria-label="capture screenshot" color="error">
                <Icon icon="tabler:archive-filled" />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="h3" sx={{ mb: 1, mt: 2 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, color: 'text.disabled' }}>
            {subtitle}
          </Typography>
          <Grid sx={{mt:1}}>
          <TextField size='small' select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Deactive">Deactive</MenuItem>
          </TextField>
          </Grid>
        </CardContent>
      </Card>
      <CategoryEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
    </Grid>
  );
};

export default CardStatsVertical;
