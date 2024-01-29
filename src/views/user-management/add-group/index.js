// ** React Components
import React, { useEffect,useState } from 'react';

// ** Mui Components
import {
  Checkbox,
  FormControlLabel,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Tooltip,
  Typography,
  Box,
  Button,
  TextField,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
// ** Custom Components
import Icon from 'components/icon';

// ** Toast Import
import toast from 'react-hot-toast';

// ** Api Services Import
import { addGroup, getAllPermissions } from 'features/user-management/groups/services/groupService';

const GroupAddPage = () => {
  // ** States
  const [groupName, setGroupName] = React.useState('');
  const [selectedCheckbox, setSelectedCheckbox] = React.useState([]);
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = React.useState(false);
  const [permissions, setPermissions] = React.useState([]);
  const [personName, setPersonName] = useState([]);
  // const [personNameNative, setPersonNameNative] = useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ];

  // ** useEffects
  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < permissions.length * 8) {
      setIsIndeterminateCheckbox(true);
    } else {
      setIsIndeterminateCheckbox(false);
    }
  }, [selectedCheckbox, permissions]);

  useEffect(() => {
    getPermissions();
  }, []);

  // ** Method for AddNewGroup
  const handleAddGroup = async () => {
    try {
      const result = await addGroup(groupName, selectedCheckbox);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ** Method for SelectAllPermissions
  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([]);
    } else {
      permissions.forEach((screens) => {
        screens?.screens?.forEach((permissions) => {
          permissions?.permissions?.forEach((permission) => {
            togglePermission(permission.id);
          });
        });
      });
    }
  };

  // ** Method for Manage Permission selection
  const togglePermission = (id) => {
    const arr = selectedCheckbox;
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1);
      setSelectedCheckbox([...arr]);
    } else {
      arr.push(id);
      setSelectedCheckbox([...arr]);
    }
  };

  // ** Method for GetAllPermissions
  const getPermissions = async () => {
    try {
      const result = await getAllPermissions();
      if (result.success) {
        setPermissions(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ** Method for RenderPermissions
  const renderPermissions = () => {
    return permissions.map((module) =>
      module.screens.map((screen, index) => (
        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
          <TableCell
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontSize: (theme) => theme.typography.h6.fontSize
            }}
          >
            {screen.screen_name}
          </TableCell>
          {screen.permissions.map((permission, index) => (
            <TableCell key={index}>
              <FormControlLabel
                label={permission.name}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={
                  <Checkbox
                    size="small"
                    id={`${index}-write`}
                    onChange={() => togglePermission(permission.id)}
                    checked={selectedCheckbox.includes(permission.id)}
                  />
                }
              />
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  };

  return (
    <Card fullWidth maxWidth="md" scroll="body">
      <CardHeader
        sx={{
          textAlign: 'center',
          px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`],
          pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
        title="Add New Group"
        subheader="Set Group Permissions"
      ></CardHeader>
      <CardContent
        sx={{
          pb: (theme) => `${theme.spacing(5)} !important`,
          px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(5)} !important`]
        }}
      >
        <Grid sx={{ my: 4, gap: 2 }} container>
          <Grid xs={12} sm={5.9}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter Role Name"
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sm={5.9}>
            <FormControl fullWidth>
              <TextField
                select
                fullWidth
                label="Branch"
                id="select-multiple-checkbox"
                SelectProps={{
                  MenuProps,
                  multiple: true,
                  value: personName,
                  onChange: (e) => handleChange(e),
                  renderValue: (selected) => selected.join(', ')
                }}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
        <Typography variant="h4">Group Permissions</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ pl: '0 !important' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      whiteSpace: 'nowrap',
                      alignItems: 'center',
                      textTransform: 'capitalize',
                      '& svg': { ml: 1, cursor: 'pointer' },
                      color: (theme) => theme.palette.text.secondary,
                      fontSize: (theme) => theme.typography.h6.fontSize
                    }}
                  >
                    Administrator Access
                    <Tooltip placement="top" title="Allows a full access to the system">
                      <Box sx={{ display: 'flex' }}>
                        <Icon icon="tabler:info-circle" fontSize="1.25rem" />
                      </Box>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell colSpan={3}>
                  <FormControlLabel
                    label="Select All"
                    sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                    control={
                      <Checkbox
                        size="small"
                        onChange={handleSelectAllCheckbox}
                        indeterminate={isIndeterminateCheckbox}
                        checked={selectedCheckbox.length === permissions.length}
                      />
                    }
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderPermissions()}</TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(8)} !important`],
          pb: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
        }}
      >
        <Box className="demo-space-x">
          <Button type="submit" variant="contained" onClick={handleAddGroup}>
            Submit
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default GroupAddPage;
