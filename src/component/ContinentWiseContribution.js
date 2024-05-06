import { Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { PieChart } from "@mui/x-charts";

const ContinentWiseContribution = () => {
  return (
    <Grid2 xs={12} lg={5}>
      <Card
        sx={{
          padding: 2,
          height: "350px",
        }}
      >
        <Typography variant="h3">Mismanaged plastic waste, 2019</Typography>
        <Typography variant="body2" mt={2}>
          Mismanaged plastic waste includes materials burned in open pits,
          dumped into seas or open waters, or disposed of in unsanitary
          landfills and dumpsites.
        </Typography>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 64.56, label: "Asia" },
                { id: 1, value: 3.12, label: "North America" },
                { id: 2, value: 8, label: "South America" },
                { id: 3, value: 22.16, label: "Africa" },
                { id: 4, value: 1.91, label: "Europe" },
                { id: 5, value: 1, label: "Australia" },
              ],
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          height={200}
        />
      </Card>
    </Grid2>
  );
};
export default ContinentWiseContribution;
