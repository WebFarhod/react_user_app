import { Box } from "@mui/material";
import { forwardRef } from "react";
import { Icon } from "@iconify/react";

interface IProps {
  icon: string;
  color?: string;
  width?: number;
  sx?: object;
}

const Iconify = forwardRef(
  ({ icon, width = 20, color, sx, ...other }: IProps, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      color={color}
      {...other}
    />
  )
);

export default Iconify;
