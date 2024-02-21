"use client";

import React, { useCallback } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdDone, MdClose, MdCached, MdDelete, MdRemove } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";


const ManageRecommendationsClient = ({ recommendations }: any) => {
  let rows: any = [];

  const router = useRouter();

  if (recommendations) {
    rows = recommendations.map((book: any) => {
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        image: book.thumbnail,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "title", headerName: "Title", width: 220 },
    { field: "author", headerName: "Author", width: 220 },
    { field: "genre", headerName: "Genre", width: 220 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className="flex gap-4 w-full">
            <ActionBtn
              icon={MdCached}
              onClick={() =>
                handleEditRecommendation(params.row.id)
              }
            />
            <ActionBtn icon={MdDelete} onClick={() => handleDeleteRecommendation(params.row.id)} />
          </div>
        );
      },
    },
  ];

  const handleEditRecommendation = (id: string) => {
    router.push(`/admin/manageRecommendations/edit-recommendation/${id}`)
  }

  const handleDeleteRecommendation = useCallback(
    async (id: string) => {
      try {
        await axios.delete(`/api/recommendation/${id}`);

        toast.success("Recommendation deleted");
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong");
        console.log(err);
      }
    },
    [router]
  );

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Recommendations" />
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

export default ManageRecommendationsClient;
