import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const Filters = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center', 
        mb: 3,
      }}
    >
      <TextField
        size="small"
        label="Search"
      />

      <FormControl size="small">
        <InputLabel>Sort</InputLabel>
        <Select
          label="Sort"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="asc">Price ↑</MenuItem>
          <MenuItem value="desc">Price ↓</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Pet Type</InputLabel>
        <Select
          label="Pet Type"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="dog">Dog</MenuItem>
          <MenuItem value="cat">Cat</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="toys">Toys</MenuItem>
          <MenuItem value="accessories">Accessories</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;