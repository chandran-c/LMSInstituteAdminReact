// ** React Imports
import { useCallback, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
// ** Custom Components Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import CustomTextField from 'components/mui/text-field';
import OptionsMenu from 'components/option-menu';
import { getActiveBranches } from 'features/branch-management/services/branchServices';
import NotesAddDrawer from 'features/content-management/course-contents/course-notes-page/components/NotesAddDrawer';
import NotesEdit from 'features/content-management/course-contents/course-notes-page/components/NotesEdit';
import NotesHeader from 'features/content-management/course-contents/course-notes-page/components/NotesTableHeader';
import NotesView from 'features/content-management/course-contents/course-notes-page/components/NotesView';
import { selectCourseNotes, selectLoading } from 'features/content-management/course-contents/course-notes-page/redux/noteSelectors';
import { getAllCourseNotes } from 'features/content-management/course-contents/course-notes-page/redux/noteThunks';
import { setUsers } from 'features/user-management/users-page/redux/userSlices';
import { searchUsers } from 'features/user-management/users-page/services/userServices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as NotesDeleteModal, default as StatusChangeDialog } from 'components/modal/DeleteModel';
import { deleteCourseNote } from 'features/content-management/course-contents/course-notes-page/services/noteServices';
import { updateCourseNote } from 'features/content-management/course-contents/course-notes-page/services/noteServices';
import toast from 'react-hot-toast';
const Notes = () => {
  const [value, setValue] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [NotesDeleteModalOpen, setNotesDeleteModalOpen] = useState(false);
  const [selectedDeleteId, SetSelectedDeleteId] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState({});

  console.log(selectedDeleteId);

  const handleStatusValue = (event, users) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(users);
  };

  const handleStatusChangeApi = async () => {
    console.log('entered', statusValue);
    const data = {
      status: statusValue?.is_active === '1' ? '0' : '1',
      id: statusValue?.id
    };
    const response = await updateCourseNote(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const handleViewClose = () => {
    setViewModalOpen(false);
  };
  const handleView = () => {
    setViewModalOpen(true);
  };

  //delete
  const handleDelete = useCallback((itemId) => {
    SetSelectedDeleteId(itemId);
    setNotesDeleteModalOpen(true);
  }, []);

  const handleContentDelete = async () => {
    const data = { id: selectedRow.id };
    const result = await deleteCourseNote(data);
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };
  ////

  const dispatch = useDispatch();
  const Notes = useSelector(selectCourseNotes);
  const NotesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(Notes);

  useEffect(() => {
    dispatch(getAllCourseNotes(selectedBranchId));
  }, [dispatch, selectedBranchId, refetch]);

  const [activeBranches, setActiveBranches] = useState([]);
  useEffect(() => {
    getActiveBranchesByUser();
  }, []);

  const getActiveBranchesByUser = async () => {
    const result = await getActiveBranches();

    console.log('active branches : ', result.data);
    setActiveBranches(result.data.data);
  };

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('toogle pressed');
  };

  const RowOptions = () => {
    return (
      <OptionsMenu
        menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
        iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
        options={[
          {
            text: 'View',
            icon: <Icon icon="tabler:eye" fontSize={20} />,
            menuItemProps: {
              onClick: () => handleView()
            }
          },
          {
            text: 'Edit',
            icon: <Icon color="primary" icon="tabler:edit" fontSize={20} />,
            menuItemProps: {
              onClick: () => toggleEditUserDrawer()
            }
          },
          {
            text: 'Delete',
            icon: <Icon color="error" icon="mdi:delete-outline" fontSize={20} />,
            menuItemProps: {
              onClick: () => handleDelete()
            }
          }
        ]}
      />
    );
  };

  const handleFilter = useCallback(
    async (val) => {
      try {
        setValue(val);
        const result = await searchUsers(val);
        if (result.success) {
          console.log('Search results:', result.data);
          dispatch(setUsers(result.data));
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  const columns = [
    {
      flex: 0.6,
      headerName: 'Id',
      field: 'employee_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.id}
          </Typography>
        );
      }
    },
    {
      flex: 1.8,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.title}
              </Typography>
              <Typography
                noWrap
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  mt: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
                {row?.description}
              </Typography>
            </Box>
          </Box>
        );
      }
    },

    {
      flex: 1.5,
      field: 'course',
      headerName: 'course',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              noWrap
              sx={{
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                color: 'text.secondary',
                textTransform: 'capitalize'
              }}
            >
              {row?.institute_branch_courses?.course_name}
            </Typography>
          </Box>
        );
      }
    },

    {
      flex: 1,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <div>
            <CustomTextField select defaultValue={row.is_active} onChange={(e) => handleStatusValue(e, row)}>
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </CustomTextField>
          </div>
        );
      }
    },
    {
      flex: 1,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NotesHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} selectedBranchId={selectedBranchId} />
        </Grid>

        {NotesLoading ? (
          <ContentSkeleton />
        ) : (
          <Grid item xs={12}>
            <Card>
              <DataGrid
                autoHeight
                rowHeight={80}
                rows={Notes}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowClick={handleRowClick}
              />
            </Card>
          </Grid>
        )}

        <NotesAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} branches={activeBranches} />
        <NotesEdit open={editUserOpen} toggle={toggleEditUserDrawer} initialValues={selectedRow} />
        <NotesDeleteModal
          open={NotesDeleteModalOpen}
          setOpen={setNotesDeleteModalOpen}
          description="Are you sure you want to delete this user?"
          title="Delete"
          handleSubmit={handleContentDelete}
        />
        <StatusChangeDialog
          open={statusChangeDialogOpen}
          setOpen={setStatusChangeDialogOpen}
          description="Are you sure you want to Change Status"
          title="Change Status"
          handleSubmit={handleStatusChangeApi}
        />
        <NotesView open={isViewModalOpen} handleViewClose={handleViewClose} />
      </Grid>
    </>
  );
};

export default Notes;
