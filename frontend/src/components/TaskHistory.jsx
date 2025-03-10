import { List, ListItem, ListItemText, Paper, Typography, useMediaQuery } from "@mui/material";

export default function ActivityLog({ activity }) {
    const isMobile = useMediaQuery("(max-width:600px)"); // 📱 Detect mobile screens

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                padding: isMobile ? 1.5 : 2, 
                mt: 2, 
                maxHeight: "250px", 
                overflowY: "auto", // ✅ Scrollable if too many logs 
                borderRadius: 2,
            }}
        >
            <Typography 
                variant={isMobile ? "subtitle1" : "h6"} // 📱 Adjust text size for mobile 
                gutterBottom
                sx={{ textAlign: "center", fontWeight: "bold" }}
            >
                Activity Log
            </Typography>

            <List sx={{ padding: 0 }}>
                {activity.length === 0 ? (
                    <Typography 
                        color="textSecondary" 
                        align="center" 
                        sx={{ fontSize: isMobile ? "0.85rem" : "1rem", padding: 1 }}
                    >
                        No recent activities
                    </Typography>
                ) : (
                    activity.map((log, index) => (
                        <ListItem 
                            key={index} 
                            sx={{
                                borderBottom: "1px solid #e0e0e0", // Light divider between logs
                                padding: isMobile ? "6px 10px" : "8px 16px",
                            }}
                        >
                            <ListItemText 
                                primary={log} 
                                sx={{ fontSize: isMobile ? "0.85rem" : "1rem" }}
                            />
                        </ListItem>
                    ))
                )}
            </List>
        </Paper>
    );
}
