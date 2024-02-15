// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// ** Custom Component Import
import Icon from 'components/icon';
import CustomAvatar from 'components/mui/avatar';

const StaffNotificationHeaderCard = (props) => {
  // ** Props
  const { sx, icon, stats, title, subtitle, iconSize = 24, avatarSize = 38, avatarColor = 'primary' } = props;

  return (
    <Card sx={{ ...sx }}>
      <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography sx={{ mb: 1, color: 'text.secondary' }}>{title}</Typography>
          <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="h4">{stats}</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        </Box>
        <CustomAvatar skin="light" variant="rounded" color={avatarColor} sx={{ width: avatarSize, height: avatarSize }}>
          <Icon icon={icon} fontSize={iconSize} />
        </CustomAvatar>
      </CardContent>
    </Card>
  );
};

export default StaffNotificationHeaderCard;
