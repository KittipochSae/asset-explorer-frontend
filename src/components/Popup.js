import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 3,
  borderColor: "#FF7B2E",
  borderStyle: "solid",
  borderWidth: "1px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: 3,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
    backgroundColor: "#FF7B2E",
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          minWidth: 40,
          paddingRight: 1,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Typography color="#FF7B2E" sx={{ fontWeight: "bold" }}>
          {float_to_string(props.value)}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress
          variant="determinate"
          value={props.value * 10}
          sx={{ color: "#FF7B2E" }}
        />
      </Box>
    </Box>
  );
}

function Popup({ data }) {
  return (
    <>
      {data && Object.keys(data).length > 0 ? (
        <>
          <Accordion defaultExpanded={true} disableGutters={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography color="#000000" sx={{ fontWeight: "bold" }}>
                Asset Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="#000000">ID</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#000000" sx={{ fontWeight: "bold" }}>
                    {data.id}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#000000">Type</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#000000" sx={{ fontWeight: "bold" }}>
                    {data.asset_type}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#000000">Project</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#000000" sx={{ fontWeight: "bold" }}>
                    {data.project}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#000000">Location</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    color="#000000"
                    sx={{ fontWeight: "bold" }}
                  >{`${data["sub-district"]} ${data.district} ${data.province}`}</Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true} disableGutters={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1b-content"
              id="panel1b-header"
            >
              <Typography color="#4E47FF" sx={{ fontWeight: "bold" }}>
                Asset Value
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="#4E47FF">Area</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#4E47FF" sx={{ fontWeight: "bold" }}>
                    {`${float_to_string(data.all_area)} ${
                      data.asset_type === "05 คอนโดมิเนียม" ? "ตร.ม." : "ตร.ว."
                    }`}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#4E47FF">Est. Price</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#4E47FF" sx={{ fontWeight: "bold" }}>
                    {`${float_to_string(data.estimated_price)} บาท`}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#4E47FF">Price/Area</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#4E47FF" sx={{ fontWeight: "bold" }}>
                    {`${float_to_string(data.price_per_sqwa)} ${
                      data.asset_type === "05 คอนโดมิเนียม"
                        ? "บาท/ตร.ม."
                        : "บาท/ตร.ว."
                    }`}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true} disableGutters={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <Typography color="#FF7B2E" sx={{ fontWeight: "bold" }}>
                Analytics
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="#FF7B2E">DOL P/A</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#FF7B2E" sx={{ fontWeight: "bold" }}>
                    {data.asset_type === "05 คอนโดมิเนียม"
                      ? `${float_to_string(data.avg_100m)} บาท/ตร.ว.`
                      : `${float_to_string(
                          data.avg_100m
                        )} บาท/ตร.ว. (${float_to_string(data.dol_ratio)})`}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#FF7B2E">Market P/A</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#FF7B2E" sx={{ fontWeight: "bold" }}>
                    {data.asset_type === "05 คอนโดมิเนียม"
                      ? `${float_to_string(data.mk_avg_1km)} บาท/ตร.ว. `
                      : `${float_to_string(
                          data.mk_avg_1km
                        )} บาท/ตร.ว. (${float_to_string(data.mk_ratio)})`}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#FF7B2E">Attraction</Typography>
                </Grid>
                <Grid item xs={8}>
                  <LinearProgressWithLabel value={data.score_attraction} />
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#FF7B2E">Education</Typography>
                </Grid>
                <Grid item xs={8}>
                  <LinearProgressWithLabel value={data.score_education} />
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#FF7B2E">Service</Typography>
                </Grid>
                <Grid item xs={8}>
                  <LinearProgressWithLabel value={data.score_service} />
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#FF7B2E">Transport</Typography>
                </Grid>
                <Grid item xs={8}>
                  <LinearProgressWithLabel value={data.score_bts} />
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#FF7B2E">Environment</Typography>
                </Grid>
                <Grid item xs={8}>
                  <LinearProgressWithLabel value={data.score_location} />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true} disableGutters={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography color="#00796b" sx={{ fontWeight: "bold" }}>
                Customer Segmentation
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography color="#00796b">Income</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#00796b" sx={{ fontWeight: "bold" }}>
                    {income_text(
                      data["less_15k"],
                      data["15k_50k"],
                      data["50k_100k"],
                      data["100k_more"]
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#00796b">Age</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#00796b" sx={{ fontWeight: "bold" }}>
                    {age_text(data["age_y"], data["age_x"], data["age_b"])}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="#00796b">Relation</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography color="#00796b" sx={{ fontWeight: "bold" }}>
                    {relation_text(
                      data["r_single"],
                      data["r_couple"],
                      data["r_family"]
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Popup;

function float_to_string(number) {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return Number(number).toLocaleString("en", options);
}

function income_text(_less_15k, _15k_50k, _50k_100k, _100k_more) {
  if (_less_15k) {
    return "< 15,000 บาท/เดือน";
  }
  if (_15k_50k) {
    return "15,000 - 50,000 บาท/เดือน";
  }
  if (_50k_100k) {
    return "50,000 - 100,000 บาท/เดือน";
  }
  if (_100k_more) {
    return "> 100,000 บาท/เดือน";
  }
}

function age_text(age_y, age_x, age_b) {
  var text = [];
  if (age_y) {
    text.push(" Gen Y (21 - 37 ปี)");
  }
  if (age_x) {
    text.push(" Gen X (38 - 53 ปี)");
  }
  if (age_b) {
    text.push(" Gen B (> 53 ปี)");
  }
  return text.join(", ");
}

function relation_text(r_single, r_couple, r_family) {
  var text = [];
  if (r_single) {
    text.push("Single");
  }
  if (r_couple) {
    text.push("Couple w/o Kids");
  }
  if (r_family) {
    text.push("Family with Kids");
  }
  return text.join(", ");
}
