"use client";

import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Heading from "@/app/components/Heading";
import { getDate } from "@/app/utils/dateMaker";
import { UserType } from "@/types";

interface UsersProps {
  users: UserType[] | null;
}

const ManageUsersClient = ({ users }: UsersProps) => {
  let rows: any = [];

  if (users) {
    rows = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        dateRegistered: getDate(user.createdAt),
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    { field: "username", headerName: "Username", width: 220 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "dateRegistered", headerName: "Registered", width: 220 },
  ];

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Users" />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default ManageUsersClient;
