import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
// import CardMedia from '@mui/material/CardMedia';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
import TimerIcon from '@mui/icons-material/Timer';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import { useState } from 'react';
import OfflineClassEditModal from './edit-OfflineClass/OfflineClassEditModal';
import DeleteDialog from 'components/modal/DeleteModel';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
const OfflineClassCard = () => {
  const cardData = [
    // Add your card data here
    // For example:
    {
      classname: 'Introduction to App',
      location: 'Kumbakonam',
      duration: '5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Introduction to web',
      location: 'Kumbakonam',
      duration: '2hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Block chain',
      location: 'Kumbakonam',
      duration: '3.5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Figma',
      location: 'Kumbakonam',
      duration: '5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Analysis',
      location: 'Kumbakonam',
      duration: '1hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    }
    // Add more card data as needed
  ];

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // const handleStatusValue = () => {
  //   setDeleteDialogOpen(true);
  //   setStatusValue(event.target.value);
  // };

  return (
    <>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                position: 'relative',
                borderTop: card.status === 'active' ? '4px solid green' : '4px solid #7cf2e1'
              }}
            >
              {/* <CardMedia sx={{ height: '12.625rem' }} image={card.image} />
            <Avatar
              alt={card.classname}
              src={card.avatar}
              sx={{
                width: 75,
                height: 75,
                left: '1.313rem',
                top: '10.28125rem',
                position: 'absolute',
                border: (theme) => `0.25rem solid ${theme.palette.common.white}`
              }}
            /> */}
              <CardContent>
                <Box
                  sx={{
                    mt: 2.55,
                    mb: 1.85,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h3">{card.classname}</Typography>
                    <Typography variant="body2">{card.location}</Typography>
                  </Box>

                  <Box
                    sx={{
                      borderRadius: '10%', // Make it round
                      border: '1px solid grey', // Add border
                      padding: '3px 9px', // Adjust padding as needed
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '& .MuiTypography-body2': {
                        margin: 0 // Remove default margin on Typography
                      }
                    }}
                  >
                    <Typography variant="body2">{card.duration}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2.55, display: 'flex', alignItems: 'center' }}>
                  <TimerIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body2">{card.dateandtime}</Typography>
                </Box>
                {/* <Box
                  sx={{
                    gap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <AvatarGroup max={4} sx={{}}>
                    {card.friends.map((friend, friendIndex) => (
                      <Avatar key={friendIndex} src={friend} alt={`Friend ${friendIndex + 1}`} />
                    ))}
                  </AvatarGroup>

                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomChip rounded size="small" skin="light" color={'secondary'} label={'BATPATID00001'} />
                  </Box>
                </Box> */}

                <Box
                  sx={{
                    gap: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <AvatarGroup max={4} sx={{ width: 40, height: 40, '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                    {card.friends.map((friend, friendIndex) => (
                      <Avatar key={friendIndex} src={friend} alt={`Friend ${friendIndex + 1}`} />
                    ))}
                  </AvatarGroup>
                  {/* {card.friends.length > 4 && (
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: '.main',
                      color: 'common.white',
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginLeft: -8
                    }}
                  >
                    +{card.friends.length - 4}
                  </Avatar>
                )} */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CustomChip rounded size="small" skin="light" color={'secondary'} label={'BATPATID00001'} />
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <Box sx={{ mt: 1, alignItems: 'center' }}>
                  <IconButton
                    onClick={() => handleCopyLink(index)}
                    sx={{ marginLeft: 'auto', color: 'primary.main' }}
                    aria-label="copy-link"
                  >
                    <FileCopyIcon />
                  </IconButton>
                  <input
                    type="text"
                    value={`Your Link Here - ${index}`} // Replace this with your actual link
                    readOnly
                    style={{ border: 'none', outline: 'none', backgroundColor: 'transparent' }}
                  />
                </Box> */}

                  <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Link to='view'>
                    <IconButton aria-label="capture screenshot" color="primary" sx={{ ml: 1 }}>
                      <Icon icon="tabler:eye" />
                    </IconButton>
                    </Link>
                   
                    <IconButton onClick={() => handleEdit()} aria-label="capture screenshot" color="secondary" sx={{ ml: 1 }}>
                      <Icon icon="tabler:edit" />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDeleteDialogOpen(true);
                      }}
                      aria-label="capture screenshot"
                      color="error"
                    >
                      <Icon icon="tabler:archive-filled" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <OfflineClassEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
        <DeleteDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          // handleSubmit={handleDeleteConfirm}
          description="Are you sure you want to delete this item?"
          title="Delete"
        />
      </Grid>
      <Grid container justifyContent="flex-end" mt={2}>
        <div className="demo-space-y">
          <Pagination count={10} color="primary" />
        </div>
      </Grid>
    </>
  );
};

export default OfflineClassCard;
