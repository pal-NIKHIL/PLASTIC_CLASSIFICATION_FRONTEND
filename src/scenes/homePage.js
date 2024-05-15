import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  Grid,
  Stack,
  Toolbar,
  Typography,
  useColorScheme,
  useMediaQuery,
  useTheme,
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
import { TeamSection } from "../component/teamsection";
import image1 from "../assest/boy.png";
import image2 from "../assest/man (1).png";
import image3 from "../assest/man.png";
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

        <Grid2 item xs={12}>
          <Card bgcolor={"white"}>
            <Typography variant="h2" textAlign={"center"} marginY={2}>
              Our Team
            </Typography>
            <hr />
            <Grid2 container py={4}>
              <TeamSection
                name={"Akash Shedage"}
                regno={"209303087"}
                image={image2}
              />
              <TeamSection
                name={"Naivedhya Sharma"}
                regno={"209303374"}
                image={image1}
              />
              
            </Grid2>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
export default HomePage;
