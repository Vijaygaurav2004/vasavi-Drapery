// lib/theme-config.ts
// Central configuration file for the Vasthrika luxury theme

export const themeConfig = {
    // Color palette
    colors: {
      primary: {
        main: "#A67C52", // Rich gold
        light: "#D4B78F", // Light gold
        dark: "#8D6E48", // Dark gold
        contrastText: "#FFFFFF"
      },
      secondary: {
        main: "#6D4C41", // Warm brown
        light: "#9C786C", // Light brown
        dark: "#40241A", // Dark brown
        contrastText: "#FFFFFF"
      },
      accent: {
        main: "#BF953F", // Metallic gold
        light: "#D4AF37", // Gold
        dark: "#996515", // Dark gold
        contrastText: "#FFFFFF"
      },
      background: {
        default: "#FBF9F6", // Cream white
        paper: "#FFFFFF", 
        subtle: "#F5F1EA" // Silk beige
      },
      text: {
        primary: "#2D2926", // Almost black
        secondary: "#5D534F", // Dark gray
        disabled: "#9E9E9E",
        hint: "#7A7A7A"
      },
      border: {
        light: "rgba(166, 124, 82, 0.2)", // Light gold
        main: "rgba(166, 124, 82, 0.3)", // Medium gold
        dark: "rgba(166, 124, 82, 0.5)" // Dark gold
      }
    },
  
    // Typography settings
    typography: {
      titleFontFamily: "'Cormorant Garamond', serif",
      bodyFontFamily: "'Jost', sans-serif",
      accentFontFamily: "'Playfair Display', serif",
    },
  
    // Spacing and dimensions
    spacing: {
      section: {
        paddingY: "6rem",
        mobileY: "4rem"
      },
      container: {
        padding: "2rem",
        mobilePadding: "1rem"
      }
    },
  
    // Animation durations
    animation: {
      fast: "0.2s",
      medium: "0.5s",
      slow: "0.8s"
    },
  
    // Breakpoints
    breakpoints: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
  
    // Border radius
    borderRadius: {
      small: "0.25rem",
      medium: "0.5rem",
      large: "1rem",
      round: "50%"
    },
  
    // Shadows
    shadows: {
      small: "0 2px 8px rgba(0, 0, 0, 0.1)",
      medium: "0 4px 12px rgba(0, 0, 0, 0.1)",
      large: "0 8px 30px rgba(0, 0, 0, 0.12)",
      gold: "0 4px 20px rgba(166, 124, 82, 0.15)"
    }
  };