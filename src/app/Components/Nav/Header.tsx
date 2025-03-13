import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  useMediaQuery, 
  useTheme 
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'

const navItems = [
  { name: "Home", path: "/home" },
  { name: "My Posts", path: "/my-posts" },
  { name: "My Comments", path: "/my-comments" },
]

export default function Header() {
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleLogout = () => {
    // Simulate logout
    router.push("/")
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ p: 4 }}>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Share Your Thoughts
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link} 
            href={item.path}
            sx={{ 
              bgcolor: router.pathname === item.path ? 'secondary.main' : 'transparent',
              borderRadius: 1
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        <Button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </Button>
      </List>
    </Box>
  )

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          Share Your Thoughts
        </Typography>
        
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                href={item.path}
                color="inherit"
                sx={{ 
                  fontWeight: router.pathname === item.path ? 'bold' : 'normal'
                }}
              >
                {item.name}
              </Button>
            ))}
            <Button 
              color="inherit" 
              onClick={handleLogout}
              variant="outlined"
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}
