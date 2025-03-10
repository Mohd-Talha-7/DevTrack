import { useState } from "react";
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Grid, useMediaQuery } from "@mui/material";

export default function TaskFilters({ setFilter, setSort }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [priority, setPriority] = useState("");
    const [sortBy, setSortBy] = useState("");
    const isMobile = useMediaQuery("(max-width:600px)"); // Detect small screens

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        setFilter(prev => ({ ...prev, search: value }));
    };

    const handlePriorityChange = (e) => {
        const value = e.target.value;
        setPriority(value);
        setFilter(prev => ({ ...prev, priority: value }));
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        setSort(value);
    };

    return (
        <Box my={2}>
            <Grid container spacing={2} alignItems="center">
                
                {/* 🔍 Search Task */}
                <Grid item xs={12} sm={4}>
                    <TextField 
                        label="Search Task" 
                        variant="outlined" 
                        fullWidth 
                        value={searchTerm} 
                        onChange={handleSearch} 
                    />
                </Grid>

                {/* 🔥 Filter by Priority */}
                <Grid item xs={12} sm={4}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select value={priority} onChange={handlePriorityChange} label="Priority">
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* 🔽 Sort by Deadline */}
                <Grid item xs={12} sm={4}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Sort By</InputLabel>
                        <Select value={sortBy} onChange={handleSortChange} label="Sort By">
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="latest">Latest</MenuItem>
                            <MenuItem value="oldest">Oldest</MenuItem>
                            <MenuItem value="priority">Priority</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
        </Box>
    );
}
