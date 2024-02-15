// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
// ** Icon Imports
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';

const StudentCertificateTableHeader = (props) => {
  // ** Props
  const { handleFilter, toggle, value } = props;
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedbatch, setSelectedbatch] = useState([]);

  const batch = [
    { batch_id: '1', batch_name: 'Batch 1' },
    { batch_id: '2', batch_name: 'Batch 2' },
    { batch_id: '3', batch_name: 'Batch 3' }
  ];

  const courses = [
    { course_id: '1', course_name: 'Course 1' },
    { course_id: '2', course_name: 'Course 2' },
    { course_id: '3', course_name: 'Course 3' }
  ];

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Student Certificates" />
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      multiple
                      id="select-multiple-chip"
                      options={[{ batch_id: 'selectAll', batch_name: 'Select All' }, ...batch]}
                      getOptionLabel={(option) => option.batch_name}
                      value={selectedbatch}
                      onChange={(e, newValue) => {
                        if (newValue && newValue.some((option) => option.batch_id === 'selectAll')) {
                          setSelectedbatch(batch.filter((option) => option.batch_id !== 'selectAll'));
                        } else {
                          setSelectedbatch(newValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Batch"
                          InputProps={{
                            ...params.InputProps,
                            style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                          }}
                        />
                      )}
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
                      renderTags={(value) => (
                        <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                          {value.map((option, index) => (
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
                          ))}
                        </div>
                      )}
                      isOptionEqualToValue={(option, value) => option.batch_id === value.batch_id}
                      selectAllText="Select All"
                      SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      multiple
                      id="select-multiple-chip"
                      options={[{ course_id: 'selectAll', course_name: 'Select All' }, ...courses]}
                      getOptionLabel={(option) => option.course_name}
                      value={selectedCourses}
                      onChange={(e, newValue) => {
                        if (newValue && newValue.some((option) => option.course_id === 'selectAll')) {
                          setSelectedCourses(courses.filter((option) => option.course_id !== 'selectAll'));
                        } else {
                          setSelectedCourses(newValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Courses"
                          InputProps={{
                            ...params.InputProps,
                            style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                          }}
                        />
                      )}
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
                      renderTags={(value) => (
                        <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                          {value.map((option, index) => (
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
                          ))}
                        </div>
                      )}
                      isOptionEqualToValue={(option, value) => option.course_id === value.course_id}
                      selectAllText="Select All"
                      SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullWidth
                      value={value}
                      label="Search Certificate"
                      sx={{}}
                      placeholder="Search"
                      onChange={(e) => handleFilter(e.target.value)}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
                      <Icon fontSize="1.125rem" icon="tabler:plus" />
                      Add Student Certificate
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentCertificateTableHeader;
