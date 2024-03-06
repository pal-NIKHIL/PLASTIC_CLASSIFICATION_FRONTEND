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
const HomePage = () => {
  const theme = useTheme();
  return (
    <Box>
      <Grid2 container>
        <TotalPlasticCard />
        <TotalPlasticCard />
        <TotalPlasticCard />
        <TotalPlasticCard />
        <DailyPlasticChart />
        <EducationCardSection />
        <ContinentWiseContribution />
        <MonthlyPlasticTable />
      </Grid2>
    </Box>
  );
};
export default HomePage;
