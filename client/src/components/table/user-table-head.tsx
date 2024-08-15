import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

interface IHeadLabel {
  id: string;
  label: string;
}

interface IProps {
  headLabel: IHeadLabel[];
}
export default function UserTableHead({ headLabel }: IProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{ display: { xs: "none", md: "table-cell" } }}
        ></TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{
              maxWidth: "200px",
              display: {
                xs:
                  headCell.id === "username" || headCell.id === "role"
                    ? "none"
                    : "table-cell",
                sm: "table-cell",
              },
            }}
          >
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
