import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  Stack,
  Typography,
  useColorScheme,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import TotalPlasticCard from "../component/TotalPlasticCard";
import DailyPlasticChart from "../component/DailyPlasticChart";
import EducationCardSection from "../component/EducationCardSection";
import ContinentWiseContribution from "../component/ContinentWiseContribution";
import MonthlyPlasticTable from "../component/MonthlyPlasticTable";
import hdpeImage from "../assest/hdpe.png";
import ldpeImage from "../assest/ldpe.png";
import petImage from "../assest/pet.png";
import ppImage from "../assest/pp.png";
import psImage from "../assest/ps.png";
import pvcImage from "../assest/pvc.png";
import axios from "axios";
import { UserContext } from "../store/usercontext";
const HomePage = () => {
  const theme = useTheme();
  const plasticTypes = [
    { type: "Polyethylene Terephthalate", shortform: "PET", image: petImage },
    { type: "High-Density Polyethylene", shortform: "HDPE", image: hdpeImage },
    { type: "Polyvinyl Chloride", shortform: "PVC", image: pvcImage },
    { type: "Low-Density Polyethylene", shortform: "LDPE", image: ldpeImage },
    { type: "Polypropylene", shortform: "PP", image: ppImage },
    { type: "Polystyrene", shortform: "PS", image: psImage },
    // { type: "Other", shortform: "Other", image: null },
  ];
  const [isloading, setLoading] = useState(false);
  const [plasticCounts, setPlasticCounts] = useState({});
  const { state } = useContext(UserContext);
  const { startDate, endDate } = state;
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  useEffect(() => {
    axios
      .post(
        "https://plastic-classification-backend.vercel.app/getdatafortotal",
        {
          startdate: startDate,
          enddate: endDate,
        }
      )
      .then((response) => {
        setPlasticCounts(response.data);
        setLoading(true);
      })
      .catch((error) => console.log(error.message));
  }, [startDate, endDate]);
  return (
    <Box>
    <Typography variant="body1">
 NIKHIL PAL
</Typography>
 <Typography variant="body1" >
 PRASOON GAUTAM
</Typography>
 <Typography variant="body1" >
 ANIKET WAKODIKAR
</Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: isSmallScreen ? "hidden" : "auto",
          flexDirection: isSmallScreen ? "column" : "row",
          marginBottom: 2,
        }}
      >
        {plasticTypes.map((plasticType) => (
          <Box
            key={plasticType.shortform}
            sx={{ marginBottom: isSmallScreen ? 2 : 0 }}
          >
            <TotalPlasticCard
              count={plasticCounts[plasticType.shortform]}
              shortform={plasticType.shortform}
              type={plasticType.type}
              image={plasticType.image}
            />
          </Box>
        ))}
      </Box>
      <Grid2 container spacing={2}>
        <DailyPlasticChart />
        <EducationCardSection />
        <ContinentWiseContribution />
        <MonthlyPlasticTable />
      </Grid2>
    </Box>
  );
};
export default HomePage;
