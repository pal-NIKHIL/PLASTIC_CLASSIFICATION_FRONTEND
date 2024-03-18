import { Card, Typography, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { LineChart } from "@mui/x-charts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import { UserContext } from "../store/usercontext";
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
  const { state } = useContext(UserContext);
  const { startDate, endDate } = state;
  useEffect(() => {
    setIsLoading(true);
    // console.log("startdate-" + startDate, "enddate-" + endDate);
    axios
      .post(
        "https://plastic-classification-backend.vercel.app/getdataforcharts",
        {
          startdate: startDate,
          enddate: endDate,
        }
      )
      .then((response) => {
        const data = response.data.records;
        setDailyData(data);
        const dates = data.map((entry) => {
          return new Date(entry.date);
        });
        setxAxisData(dates);
        setHDPE(data.map((entry) => entry.HDPE));
        setLDPE(data.map((entry) => entry.LDPE));
        setPET(data.map((entry) => entry.PET));
        setPP(data.map((entry) => entry.PP));
        setPS(data.map((entry) => entry.PS));
        setPVC(data.map((entry) => entry.PVC));
        setOthers(data.map((entry) => entry.Others));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, [startDate, endDate]);

  return (
    <Grid2 xs={12} sm={12} lg={9}>
      <Box sx={{ overflowX: "auto" }}>
        <Card>
          {!isLoading && HDPE && LDPE && PET && PP && PS && PVC && Others && (
            <LineChart
              // margin={1}
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
              slotProps={{
                legend: {
                  hidden: true,
                  direction: "row",
                  position: { vertical: "top", horizontal: "middle" },
                  padding: 24,
                },
              }}
              height={300}
            />
          )}
        </Card>
      </Box>
    </Grid2>
  );
};

export default DailyPlasticChart;
