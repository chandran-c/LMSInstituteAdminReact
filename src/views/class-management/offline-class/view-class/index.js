// material-ui
import { Box, CardContent, CardHeader, Typography, TextField } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import Avatar from 'components/mui/avatar';
// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid';

// ** Custom Components
// import { TextField } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
import { getOfflineClassDetails } from 'features/class-management/offline-classes/services/offlineClassServices';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import CustomAvatar from 'components/mui/avatar';
import { getInitials } from 'utils/get-initials';

const renderClient = (row) => {
  if (row?.student?.image) {
    return (
      <CustomAvatar
        src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.student?.image}`}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.name ? row?.name : 'Mohammed Thasthakir')}
      </CustomAvatar>
    );
  }
};
const ViewOfflineClass = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const offlineClassId = location.state.id;
  const [offlineClassData, setOfflineClassData] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = offlineClassData?.data?.batch_class?.batch?.institute_batch_student?.filter((student) =>
    student?.student?.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredStudents);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const data = {
      class_id: offlineClassId
    };
    getOfflineClassData(data);
  }, [dispatch, offlineClassId]);

  // const userStatusObj = {
  //   1: 'success',
  //   0: 'error'
  // };

  const getOfflineClassData = async (data) => {
    try {
      const result = await getOfflineClassDetails(data);
      if (result.success) {
        console.log('Offline Class:', result.data);
        setOfflineClassData(result.data); // Assuming result.data is an array
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(offlineClassData);

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  const [statusValue] = useState({});

  // const handleStatusValue = (event, users) => {
  //   setStatusValue(users);
  // };

  const handleStatusChangeApi = async () => {
    console.log('entered', statusValue);
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateCourseStudyMaterialStatus(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  console.log(handleStatusChangeApi);

  const columns = [
    {
      // flex: 0.4,
      minWidth: 160,
      headerName: 'Student ID',
      field: 'student_id',
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {row?.student?.student_id}
        </Typography>
      )
    },
    {
      // flex: 0.275,
      minWidth: 290,
      field: 'full_name',
      headerName: 'Student Name',
      renderCell: (params) => {
        const student = params?.row?.student;
        const fullName = `${student.first_name} ${student.last_name}`;
        const email = student.email;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params.row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {fullName}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      // flex: 0.275,
      minWidth: 170,
      field: 'City',
      headerName: 'city',
      renderCell: (params) => {
        const student = params?.row?.student;
        const city = student.city;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {city}
            </Typography>
          </Box>
        );
      }
    }, 
    {
      // flex: 1,
      minWidth: 360,
      field: 'address',
      headerName: 'Address',
      renderCell: (params) => {
        const student = params?.row?.student;
        const address = `${student.address_line_1} ${student.address_line_2}`;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {address}
            </Typography>
          </Box>
        );
      }
    }
    // {
    //   flex: 1,
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: ({ row }) => (
    //     <div>
    //       <TextField
    //         size="small"
    //         select
    //         value={row?.is_active}
    //         label="status"
    //         id="custom-select"
    //         sx={{
    //           color: userStatusObj[row?.is_active]
    //         }}
    //         onChange={(e) => handleStatusValue(e, row)}
    //         SelectProps={{
    //           sx: {
    //             borderColor: row.is_active === '1' ? 'success' : 'error',
    //             color: userStatusObj[row?.is_active]
    //           }
    //         }}
    //       >
    //         <MenuItem value={1}>Active</MenuItem>
    //         <MenuItem value={0}>Inactive</MenuItem>
    //       </TextField>
    //     </div>
    //   )
    // }
  ];

  // const offlineClassArray = [offlineClassData];

  return (
    <Box>
      <Grid container>
        {/* header */}
        {/* {offlineClassArray?.map((card, index) => ( */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title={offlineClassData?.data?.class_name} />
            <CardContent sx={{ mt: 0, pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Course
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.data?.batch_class?.batch?.institute_course?.institute_course_branch?.course_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Batch
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.data?.batch_class?.batch?.batch_id}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Duration
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.data?.batch_class?.batch?.institute_course?.institute_course_branch?.course_duration}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Date
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.data?.class_date}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Sarted At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.data?.batch_class?.batch?.start_date}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Ended At
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    {offlineClassData?.data?.batch_class?.batch?.end_date}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent sx={{ mt: 0, pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Instructor
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                      {offlineClassData?.instructor?.class_staff.map((staff) => (
                        <Tooltip key={staff.id} title={staff.staff.staff_name}>
                          <Avatar
                            src={staff.staff.image_url} // Assuming the image URL is available in the staff object
                            alt={staff.staff.staff_name}
                            sx={{ width: 25, height: 25 }}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Coordinator
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <AvatarGroup className="pull-up" sx={{ display: 'flex', alignItems: 'center' }}>
                      {offlineClassData?.coordinator?.class_staff.map((staff) => (
                        <Tooltip key={staff.id} title={staff.staff.staff_name}>
                          <Avatar
                            src={staff.staff.image_url} // Assuming the image URL is available in the staff object
                            alt={staff.staff.staff_name}
                            sx={{ width: 25, height: 25 }}
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  </Box>
                </Grid>
                <Grid item>
                  <Typography variant="h5" sx={{ color: 'grey.500' }}>
                    Class Type
                  </Typography>
                  <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h4">{offlineClassData?.data?.type}</Typography>
                    <Typography variant="h5" sx={{ color: theme.palette.primary.main, ml: 1 }}>
                      Visit Previous Class
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* body */}
        <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} marginTop={2}>
          <TextField placeholder="Search Student" value={searchQuery} onChange={handleSearchChange} />
        </Grid>

        {offlineClassData && (
          <Grid item xs={12} mt={3}>
            <DataGrid
              autoHeight
              rowHeight={80}
              rows={filteredStudents}
              columns={columns}
              disableRowSelectionOnClick
              pagination
              pageSize={paginationModel.pageSize}
              rowCount={filteredStudents.length}
              paginationMode="server"
              onPageChange={(page) => setPaginationModel((prevModel) => ({ ...prevModel, page }))}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ViewOfflineClass;
