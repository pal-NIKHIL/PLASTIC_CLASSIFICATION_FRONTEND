import { Avatar, Card, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const TotalPlasticCard = ({ type, count, shortform, image }) => {
  return (
    <Grid2 xs={12} lg={3}>
      <Card
        sx={{
          padding: 2,
        }}
      >
        <Stack spacing={1}>
          <Stack direction={"row"} spacing={2}>
            <Avatar variant="rounded" src={image} alt={shortform} />
            <Stack spacing={0.5}>
              <Typography variant="subtitle1">{type}</Typography>
              <Typography variant="subtitle1">{shortform}</Typography>
            </Stack>
          </Stack>
          <Typography>{count}+</Typography>
        </Stack>
      </Card>
    </Grid2>
  );
};

export default TotalPlasticCard;
