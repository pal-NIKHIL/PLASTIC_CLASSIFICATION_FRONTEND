import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Card,
  Stack,
  Typography,
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
  const getRandomCount = () => Math.floor(Math.random() * 1000);

  return (
    <Box>
      <Grid2 container spacing={2}>
        {plasticTypes.map((plasticType) => (
          <TotalPlasticCard
            key={plasticType.shortform}
            count={getRandomCount()}
            shortform={plasticType.shortform}
            type={plasticType.type}
            image={plasticType.image}
          />
        ))}
        <DailyPlasticChart />
        <EducationCardSection />
        <ContinentWiseContribution />
        <MonthlyPlasticTable />
      </Grid2>
    </Box>
  );
};
export default HomePage;
