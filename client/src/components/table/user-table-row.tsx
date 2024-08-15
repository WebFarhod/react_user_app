import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Iconify from "../iconify/iconify";
import DeleteModal from "../deleteUserModal/deleteModal";
import { UserData } from "../../interface/userData";
import { Chip } from "@mui/material";
import ApprodModal from "../approdUserModal/approdModal";

interface IProps {
  data: UserData;
}

export default function UserTableRow({ data }: IProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
          {<Avatar alt={data.username} src={undefined} />}
        </TableCell>
        <TableCell component="th" scope="row">
          {data.email}
        </TableCell>
        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
          {data.username}
        </TableCell>
        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
          {data.role}
        </TableCell>
        <TableCell>
          {data.isApproved ? (
            <Chip label="Approved" color="success" size="small" />
          ) : (
            <Chip label="Not Approved" color="error" size="small" />
          )}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <ApprodModal data={data} />

        <DeleteModal data={data} />
      </Popover>
    </>
  );
}
