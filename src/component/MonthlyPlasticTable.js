import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useEffect, useState } from "react";

const MonthlyPlasticTable = () => {
  const [montlydata, setmontlydata] = useState();
  const [isloading, setloading] = useState(false);
  useEffect(() => {
    axios
      .get("https://plastic-classification-backend.vercel.app/getmonthwisedata")
      .then((response) => {
        setmontlydata(response.data);
        setloading(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <Grid2 xs={12} lg={7}>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>HDPE</TableCell>
              <TableCell>LDPE</TableCell>
              <TableCell>PET</TableCell>
              <TableCell>PP</TableCell>
              <TableCell>PS</TableCell>
              <TableCell>PVC</TableCell>
              <TableCell>Others</TableCell>
            </TableRow>
          </TableHead>
          {isloading ? (
            <TableBody>
              {montlydata.map((data) => {
                return (
                  <TableRow>
                    <TableCell>{data.month}</TableCell>
                    {Object.entries(data.totalCollection).map(
                      ([type, count]) => {
                        return <TableCell key={type}>{count}</TableCell>;
                      }
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <Typography>Data is Fetching</Typography>
          )}
        </Table>
      </Card>
    </Grid2>
  );
};
export default MonthlyPlasticTable;
