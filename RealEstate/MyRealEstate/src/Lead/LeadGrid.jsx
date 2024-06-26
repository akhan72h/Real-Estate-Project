import { Box, IconButton, Menu } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import authFetch from "../custom";

import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LeadGrid(props) {
  const {id,setIds,Opendr,toggleDrawer} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dopen, dsetOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event,params) => {
    setAnchorEl(event.currentTarget);
    setIds([params.row._id])
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete= ()=>{

    dsetOpen(true);
    handleClose();
  }

  const [data, setData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    authFetch.get("/lead/").then((y) => {
      console.log(y.data);
      setData(
        y.data.map((v) => {
          return {
            ...v,
            id: v._id,
          };
        })
      );
    });
  }, [dopen,toggleDrawer]);

  const dhandleClose = ()=>{
    dsetOpen(false);
  }

  const handleEdit= ()=>{

    Opendr();
    handleClose();
  }

  const removeLead = ()=>{

    dhandleClose();

    authFetch.post("/lead/deleteMany",id).then(y=>{

      console.log(y.data);
    })
  }
  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "leadStatus",
      headerName: "leadStatus",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "leadName",
      headerName: "leadName",

      width: 160,
    },
    {
      field: "leadPhoneNumber",
      headerName: "leadPhoneNumber",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "leadEmail",
      headerName: "leadEmail",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(event)=>{
              handleClick(event,params);

            }}
          >
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 600, width: "100%" }}>

      {id.length > 1 && <Button onClick={handleDelete}>Delete</Button>}
      <DataGrid
        rows={data}
        columns={columns}

        onRowSelectionModelChange={(newRowSelectionModel) => {
         
        //  alert(newRowSelectionModel);
         
          setIds(newRowSelectionModel);
         
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            // maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleDelete}>
          <DeleteIcon sx={{ mr: 1, color: "red" }} />
          Delete
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <EditNoteIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <VisibilityIcon sx={{ mr: 1, color: "dodgerblue" }} />
          View
        </MenuItem>
      </Menu>

      <Dialog
        open={dopen}
        onClose={dhandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dhandleClose}>Cancel</Button>
          <Button onClick={removeLead} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}