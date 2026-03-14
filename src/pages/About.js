import { Container, Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
      >
        🐾 About Pet Paradise
      </Typography>

      <Box sx={{ mt: 3, lineHeight: 1.8 }}>
        <Typography>
          Pet Paradise was created for one simple reason — to make pets happier
          through fun and engaging toys.
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          We believe pets are more than just animals. They are family members
          who bring joy, comfort, and love into our lives. Because of this,
          they deserve toys that keep them active, entertained, and mentally
          stimulated.
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          Our goal is to help pet owners easily find toys that their pets will
          truly enjoy. From chew toys to interactive play items, every product
          is chosen with safety, quality, and fun in mind.
        </Typography>

        <Typography component="p" sx={{ mb: 2 }}>
          At Pet Paradise, we want every pet to experience excitement during
          playtime while strengthening the bond between pets and their owners.
        </Typography>
      </Box>

    </Container>
  );
};

export default About;
