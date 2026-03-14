import React from "react";
import { Box, Typography, Link, Stack } from "@mui/material";
import logo from '../images/PetParadiseLogo.png';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#2E7D32",
        py: 4,
        px: { xs: 2, md: 8 },
        mt: 8,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box
          component="img"
          src={logo}
          alt="Pet Paradise Logo"
          sx={{ height: 40, mr: 1 }}
        />
      </Box>

      <Typography variant="body1">
        Fun toys for happy pets!<br />
        Discover safe and exciting toys your pets will love.
      </Typography>

      <Typography variant="body2" sx={{ mt: 3 }}>
        Follow Us:{" "}
        <Stack direction="row" spacing={2} >
          <Link href="https://www.facebook.com/lancegabriel.cruz.90" target="_blank" underline="hover" sx={{ color: "white" }}>
            Facebook
          </Link>
          <Link href="https://www.instagram.com/lanceeegab/?hl=en" target="_blank" underline="hover" sx={{ color: "white" }}>
            Instagram
          </Link>
        </Stack>
      </Typography>
      

      <Typography variant="body2" sx={{ mt: 3 }}>
        Quick Links:{" "}
        <Link href="/" underline="hover" sx={{ color: "white" }}>Home</Link> |{" "}
        <Link href="/shop" underline="hover" sx={{ color: "white" }}>Shop</Link> |{" "}
        <Link href="/about" underline="hover" sx={{ color: "white" }}>About Us</Link> |{" "}
        <Link href="/contact" underline="hover" sx={{ color: "white" }}>Contact</Link> |{" "}
        <Link href="/faq" underline="hover" sx={{ color: "white" }}>FAQ</Link>
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        Contact Us:{" "}
        <Link href="mailto:lancegabcruz@gmail.com" underline="hover" sx={{ color: "white" }}>
          lancegabcruz@gmail.com
        </Link>{" "}
        | +63 905 665 9968
      </Typography>

      <Typography variant="caption" display="block" sx={{ mt: 3 }}>
        © 2023 Pet Paradise. All rights reserved.{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
