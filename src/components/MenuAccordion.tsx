import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Icon } from "@mui/material";
import { menuController } from "../utils/menuController";
import { Link as RouterLink } from "react-router-dom";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    position: "absolute",
    left: "0px",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    position: "absolute",
    right: "20px",
  },
  "& .MuiCollapse-wrapper": {
    overflow: "hidden",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  overflow: "hidden",
}));

export default function MenuAccordion({ open }: any) {
  React.useEffect(() => {
    const arrowIcon = document.querySelector(".css-1d3w1w9-MuiSvgIcon-root");
    !open
      ? arrowIcon?.setAttribute("style", "opacity:0; transition: .2s")
      : arrowIcon?.setAttribute("style", "opacity:100; transition: .5s");
  }, [open]);

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleChange}
        sx={{ border: "none" }}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          sx={{
            backgroundColor: "#203764",
            padding: "0px",
            overflow: "hidden",
            "& .MuiAccordionSummary-content": {
              background: expanded ? "#DEBB3E" : "none",
              marginLeft: "4px",
              borderRadius: "50px 0 0 50px",
              width: "100%",
            },
            "& .MuiSvgIcon-root": {
              color: expanded ? "#203764" : "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <ListItem disablePadding sx={{ display: "block", color: "white" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                color: "white",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: expanded ? "#203764" : "rgba(255, 255, 255, 0.9)",
                }}
              >
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Proveedores"}
                sx={{
                  opacity: open ? 1 : 0,
                  color: expanded ? "#203764" : "white",
                }}
              />
            </ListItemButton>
          </ListItem>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "0px" }}>
          <List sx={{ backgroundColor: "#203764", height: "100%" }}>
            {menuController[0].proveedores?.map((text, index) => (
              <ListItem
                key={text.pageName}
                disablePadding
                sx={{ display: "block", color: "white" }}
              >
                <Link component={RouterLink} to={text.url}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      color: "white",
                    }}
                  >
                    <ListItemIcon
                      children={<Icon children={text.icon} />}
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "rgba(255, 255, 255, 0.9)",
                      }}
                    />
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    <ListItemText
                      primary={text.pageName}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
