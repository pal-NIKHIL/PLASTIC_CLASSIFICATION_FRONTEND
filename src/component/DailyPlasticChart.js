import { Card } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { LineChart } from "@mui/x-charts";
const DailyPlasticChart = () => {
  return (
    <Grid2 xs={12} lg={9}>
      <Card>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={300}
        />
      </Card>
    </Grid2>
  );
};
export default DailyPlasticChart;
