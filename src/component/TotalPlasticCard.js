import { Avatar, Card, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const TotalPlasticCard = () => {
  return (
    <Grid2 xs={12} lg={3}>
      <Card
        sx={{
          padding: 2,
        }}
      >
        <Stack spacing={2}>
          <Stack direction={"row"}>
            <Avatar />
            <Typography>Polypropelene</Typography>
          </Stack>
          <Typography>941241+</Typography>
          <Stack direction={"row"}>
            <Typography>563+</Typography>
            <Typography>525+</Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid2>
  );
};
export default TotalPlasticCard;
