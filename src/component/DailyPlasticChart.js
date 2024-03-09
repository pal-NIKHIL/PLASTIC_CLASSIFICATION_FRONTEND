import { Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { LineChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
const DailyPlasticChart = () => {
  const [dailyData, setDailyData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [xAxisData, setxAxisData] = useState();
  const [HDPE, setHDPE] = useState();
  const [LDPE, setLDPE] = useState();
  const [PET, setPET] = useState();
  const [PP, setPP] = useState();
  const [PS, setPS] = useState();
  const [PVC, setPVC] = useState();
  const [Others, setOthers] = useState();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://plastic-classification-backend.vercel.app/getdailydata")
      .then((response) => {
        const data = response.data;
        setDailyData(data);
        const dates = data.map((entry) => {
          return new Date(entry.date);
        });
        setxAxisData(dates);
        console.log(xAxisData);
        setHDPE(data.map((entry) => entry.HDPE));
        setLDPE(data.map((entry) => entry.LDPE));
        setPET(data.map((entry) => entry.PET));
        setPP(data.map((entry) => entry.PP));
        setPS(data.map((entry) => entry.PS));
        setPVC(data.map((entry) => entry.PVC));
        setOthers(data.map((entry) => entry.Others));
        console.log(HDPE, LDPE, xAxisData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <Grid2 xs={12} lg={9}>
      <Card>
        {!isLoading && HDPE && LDPE && PET && PP && PS && PVC && Others && (
          <LineChart
            xAxis={[
              {
                data: xAxisData,
                tickInterval: xAxisData,
                scaleType: "date",
                valueFormatter: (data) => {
                  const date = moment(data).format("ll");
                  return date.toString();
                },
              },
            ]}
            series={[
              { label: "HDPE", data: HDPE },
              { label: "LDPE", data: LDPE },
              { label: "PET", data: PET },
              { label: "PP", data: PP },
              { label: "PS", data: PS },
              { label: "PVC", data: PVC },
              { label: "Others", data: Others },
            ]}
            height={300}
          />
        )}
      </Card>
    </Grid2>
  );
};

export default DailyPlasticChart;
