import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/flexbetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/classmate.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>classmate</Typography>
        <Typography color={medium}>classmate.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Classmate Customised Notebooks — Pack of 6 customized notebooks starting
        at just Rs. 431/-. Order now and get it delivered. Customize binding,
        pages and ruling. Upload images. Place your order. Get it delivered.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
