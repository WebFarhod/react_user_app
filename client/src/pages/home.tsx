/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Container,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import UserTableHead from "../components/table/user-table-head";
import UserTableRow from "../components/table/user-table-row";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { setUserData } from "../store/slices/userSlice";
import { UserData } from "../interface/userData";
import $api from "../service/auth";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Home() {
  const dispatch = useDispatch();
  const { users } = useTypedSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await $api.get(`/user/read-all`);
        dispatch(setUserData(userRes.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Container>
      <Card>
        <TableContainer sx={{ overflow: "unset" }}>
          <Table>
            <UserTableHead
              headLabel={[
                { id: "email", label: "email" },
                { id: "username", label: "username" },
                { id: "role", label: "role" },
                { id: "isApproved", label: "status" },
                { id: "action", label: "" },
              ]}
            />
            <TableBody>
              {users?.map((row: UserData) => (
                <UserTableRow key={row._id} data={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
