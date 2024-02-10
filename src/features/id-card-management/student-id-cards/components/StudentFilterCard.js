import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import TextField from '@mui/material/TextField';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CustomChip from 'components/mui/chip';


const StudentFilterCard = () => {
  const [statusValue, setStatusValue] = useState('');

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  const batch = [
    { batch_id: '1', batch_name: 'batch 1' },
    { batch_id: '2', batch_name: 'batch 2' },
    { batch_id: '3', batch_name: 'batch 3' }
  ];

  const [selectedbatch, setSelectedbatch] = useState([]);

  const handlebatchChange = (newValue) => {
    if (newValue && newValue.some((option) => option.batch_id === 'selectAll')) {
      setSelectedbatch(batch.filter((option) => option.batch_id !== 'selectAll'));
    } else {
      setSelectedbatch(newValue);
    }
  };

  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' }
  ];

  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleCourseChange = (newValue) => {
    if (newValue && newValue.some((option) => option.course_id === 'selectAll')) {
      setSelectedCourses(courses.filter((option) => option.course_id !== 'selectAll'));
    } else {
      setSelectedCourses(newValue);
    }
  };


  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="ID card" />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                <Autocomplete
                    multiple
                    id="select-multiple-chip"
                    options={batch}
                    getOptionLabel={(option) => option.batch_name}
                    value={selectedbatch}
                    onChange={(event, newValue) => handlebatchChange(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth label="Batch" />}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.batch_name}
                      </li>
                    )}
                    renderTags={(value) =>
                      value.map((option, index) => (
                        <CustomChip
                          key={option.batch_id}
                          label={option.batch_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedbatch(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))
                    }
                    isOptionEqualToValue={(option, value) => option.batch_id === value.batch_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="downloaded">Downloaded</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial payment">Partial Payment</MenuItem>
                    <MenuItem value="past due">Past Due</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                <Autocomplete
                    multiple
                    id="select-multiple-chip"
                    options={courses}
                    getOptionLabel={(option) => option.course_name}
                    value={selectedCourses}
                    onChange={(event, newValue) => handleCourseChange(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth label="Courses" />}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.course_name}
                      </li>
                    )}
                    renderTags={(value) =>
                      value.map((option, index) => (
                        <CustomChip
                          key={option.course_id}
                          label={option.course_name}
                          onDelete={() => {
                            const updatedValue = [...value];
                            updatedValue.splice(index, 1);
                            setSelectedCourses(updatedValue);
                          }}
                          color="primary"
                          sx={{ m: 0.75 }}
                        />
                      ))
                    }
                    isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default StudentFilterCard;
