import { Avatar, Card, Stack, Typography, useMediaQuery } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const TotalPlasticCard = ({ type, count, shortform, image }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Card
      sx={{
        padding: 2,
        width: isSmallScreen ? "100%" : 350,
        marginBottom: 1,
        marginRight: 2,
      }}
    >
      <Stack spacing={1}>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            alignItems: "center",
          }}
        >
          <Avatar variant="rounded" src={image} alt={shortform} />
          <Stack spacing={0.5}>
            <Typography variant="body1">{type}</Typography>
            {/* <Typography variant="body2">{shortform}</Typography> */}
            <Typography variant="h4">{count}+</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TotalPlasticCard;
