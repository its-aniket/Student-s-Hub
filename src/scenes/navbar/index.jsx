import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  clear,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/flexbetween";
const Navbar = (userId) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;

  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  //start of search function
  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await fetch(`https://studentshubserver-5dr0vg6s2-itsaniket1s-projects.vercel.app/posts/search/${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',  // Specify JSON content
        }  // Send search query in body
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
  
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching:', error);
      // Display user-friendly error message in UI
    } finally {
      setIsSearching(false);
    }
  };
  
  useEffect(() => {
    const debouncedSearch = debounce(handleSearch, 500); // Debounce by 500ms
    if (search.trim() !== "") {
      debouncedSearch();
    } else {
      setSearchResults([]);
    }
  }, [search]);

  // Implement debounce function (can be a separate helper function)
  function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  } // end of search function
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#7af595"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "#acfcbd",
              cursor: "pointer",
            },
          }}
        >
          Student's Hub
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <form onSubmit={handleSearch}>
              <InputBase
                placeholder="Search..."
                label="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                
              />
              <IconButton type="submit">
                <Search />
              </IconButton>
            </form>
            {/* Added button to clear search */}
            <IconButton onClick={() => setSearch("")}>
              <clear />
            </IconButton>
          </FlexBetween>
        )}
        {search && (
          <Box
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            {isSearching ? (
              <div>Loading...</div>
            ) : searchResults.length > 0 ? (
              <ul>
                {searchResults.map((result) => (
                  <li key={result._id}>
                    {/* Customize result display based on your data structure */}
                    {result.firstName && <h3>{result.firstName} {result.lastName}</h3>}
                    {result.description && <p>{result.description}</p>}
                    {/* Add other relevant fields as needed */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No results found for "{search}".</p>
            )}
          </Box>
        )}
      </FlexBetween>
      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxwidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
