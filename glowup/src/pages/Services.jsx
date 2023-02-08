import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getServicesAction } from "../actions/SaloonAction";
import { DataGrid} from "@material-ui/data-grid";
import SideBar from "../components/Sidebar/Sidebar";
import Input from "../components/Input/Input";
const Services = () => {
  const params = useParams();
  const dispatch = useDispatch();
      const [ids, setIds] = useState([]);
      console.log(ids)
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getServicesAction(params.id));
  }, [dispatch, params]);
  const columns = [
    { field: "id", headerName: "Service Id", minWidth: 200, flex: 1 },
    {
      field: "servicetype",
      headerName: "Type",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 200,
      flex: 5,
    },
    {
      field: "servicename",
      headerName: "Service Name",
      minWidth: 270,
      flex: 1.5,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      length:500,
      flex: 10,
    },
    {
      field: "hour",
      headerName: "Hours",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 150,
      flex: 1,
    },
  ];
  const rows = [];
  services &&
    services.forEach((service) => {
      rows.push({
        id: service?._id,
        servicetype: service?.servicetype,
        category: service?.category,
        servicename: service.servicename,
        hour: service.hour,
        price: service.price,
        description: service.description,
      });
    });
  const keys = Object.keys(rows?.length ? rows[0] : "");
  return (
    <div>
      <div>
        <SideBar />
        <div className="data-table-wrapper">
          <h1>Services</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <div>
              <label>Select Field To Update</label>
              <br />
              <select>
                {keys?.map((key) =>
                  key === "id" ? "" : <option value={key}>{key}</option>
                )}
              </select>
            </div>

            <Input inputType={"text"} laBel="Update Field" />
            <div className="login-btn">
              <button type="submit">Update</button>
            </div>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            style={{textOverflow:"inherit"}}
            checkboxSelection
            onSelectionModelChange={(itm) => setIds(itm)}
            pageSize={10}
            autoHeight
            sortingOrder="null"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
