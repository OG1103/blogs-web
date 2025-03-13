import { Box, Container, Typography, Link } from "@mui/material"

export default function Footer() {
  return (
    <Box component="footer" className="py-6 bg-secondary mt-auto">
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Share Your Thoughts. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" className="mt-2">
          <Link href="#" color="inherit" className="mx-2">
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" className="mx-2">
            Terms of Service
          </Link>
          <Link href="#" color="inherit" className="mx-2">
            Contact Us
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}

