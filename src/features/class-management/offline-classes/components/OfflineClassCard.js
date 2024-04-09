import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { IconCalendar } from '@tabler/icons';
import Icon from 'components/icon';
import OfflineClassDeleteModel from 'components/modal/DeleteModel';
import OptionsMenu from 'components/option-menu';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectOfflineClasses } from '../redux/offlineClassSelectors';
import { getAllOfflineClasses } from '../redux/offlineClassThunks';
import { deleteOfflineClass } from '../services/offlineClassServices';
import OfflineClassEditModal from './edit-OfflineClass/OfflineClassEditModal';

const OfflineClassCard = ({ offlineClassRefetch, setofflineClassRefetch }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState({});
  const offlineClasses = useSelector(selectOfflineClasses);
  console.log(offlineClasses);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  const [offlineClassDeleteModelOpen, setOfflineClassDeleteModelOpen] = useState(false);

  const [selectedOfflineClassDeleteId, setSelectedOfflineClassDeleteId] = useState(null);

  useEffect(() => {
    const data = {
      type: 'offline',
      branch_id: selectedBranchId
    };
    dispatch(getAllOfflineClasses(data));
  }, [dispatch, selectedBranchId, offlineClassRefetch]);

  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = (data) => {
    setSelectedClass(data);
    setEditModalOpen(true);
  };

  function convertTo12HourFormat(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + meridiem;
  }

  const handleDelete = useCallback((itemId) => {
    setSelectedOfflineClassDeleteId(itemId);
    setOfflineClassDeleteModelOpen(true);
  }, []);

  const handleOfflineClassDelete = async () => {
    const data = { class_id: selectedOfflineClassDeleteId };
    const result = await deleteOfflineClass(data);
    if (result.success) {
      toast.success(result.message);
      setofflineClassRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {offlineClasses?.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 3, position: 'relative', borderTop: card.status === 'pending' ? '4px solid green' : '4px solid #7cf2e1' }}>
              <Grid container direction="column" spacing={1}>
                <Grid item sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography
                      sx={{
                        mb: 0,
                        flexShrink: 2,
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        textAlign: 'center'
                      }}
                      variant="h3"
                      gutterBottom
                      textAlign="center"
                    >
                      {card?.class_name}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item sx={{ justifyContent: 'center', display: 'flex', mb: 2, mt: 1 }}>
                  <AvatarGroup className="pull-up" max={4}>
                    {card?.batch_class?.batch_student?.map((student, studentIndex) => {
                      return (
                        <Avatar
                          key={studentIndex}
                          src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${student?.student?.image}`}
                          alt={student?.student?.first_name}
                        />
                      );
                    })}
                  </AvatarGroup>
                </Grid>

                <Grid item justifyContent="center" display="flex">
                  <Typography sx={{ fontWeight: '500' }}>{card?.batch_class?.batch_student?.length ?? 0} Students on this class</Typography>
                </Grid>
                <Grid item justifyContent="center" alignItems="center" sx={{ verticalAlign: 'center' }} display="flex" mb={2}>
                  <Box>
                    <IconCalendar />
                  </Box>
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex', fontWeight: 'bold' }}>
                      {card?.class_date} / {convertTo12HourFormat(card?.start_time)} to {convertTo12HourFormat(card?.end_time)}{' '}
                    </Typography>
                  </Box>
                </Grid>

                <Grid container p={1} justifyContent="space-between" alignItems={'center'}>
                  <Box>
                    <Button
                      variant="contained"
                      size="medium"
                      component={Link}
                      state={{ id: card?.class_id }}
                      to={`offline-classes/${card?.class_id}`}
                    >
                      View More
                    </Button>
                  </Box>
                  <Box>
                    <OptionsMenu
                      menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
                      iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                      options={[
                        {
                          text: 'View',
                          icon: <Icon icon="tabler:eye" fontSize={20} />,
                          menuItemProps: {
                            component: Link,
                            to: `offline-classes/view`,
                            state: { id: card?.class_id }
                          }
                        },
                        {
                          text: 'Edit',
                          icon: <Icon icon="tabler:edit" />,
                          menuItemProps: {
                            onClick: () => {
                              handleEdit(card);
                            }
                          }
                        },
                        {
                          text: 'Delete',
                          icon: <Icon icon="mdi:delete-outline" />,
                          menuItemProps: {
                            onClick: () => handleDelete(card?.class_id)
                          }
                        }
                      ]}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
        <OfflineClassEditModal
          setRefetch={setofflineClassRefetch}
          selectedBranchId={selectedBranchId}
          offlineClasses={selectedClass}
          open={isEditModalOpen}
          handleEditClose={handleEditClose}
        />
        <OfflineClassDeleteModel
          open={offlineClassDeleteModelOpen}
          setOpen={setOfflineClassDeleteModelOpen}
          description="Are you sure you want to delete this item?"
          title="Delete"
          handleSubmit={handleOfflineClassDelete}
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

OfflineClassCard.propTypes = {
  offlineClassRefetch: PropTypes.any,
  setofflineClassRefetch: PropTypes.any
};

export default OfflineClassCard;
