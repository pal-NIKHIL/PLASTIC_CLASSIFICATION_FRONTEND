import { ButtonBase, Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const EducationCardSection = () => {
  return (
    <Grid2 xs={12} lg={3}>
      <Card
        sx={{
          padding: 4,
        }}
      >
        <Typography>Be part of the solution to plastic pollution</Typography>
        <ButtonBase
          to={"/campus-experience"}
          sx={{
            backgroundColor: "#161313",
            width: "fit-content",
            borderRadius: "20px",
            "&:hover": {
              boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.2)",
              backgroundColor: "#161313",
            },
          }}
        >
          <Typography m={1.5} variant="subtitle2" color="white">
            Join the Community
          </Typography>
        </ButtonBase>
      </Card>
    </Grid2>
  );
};
export default EducationCardSection;