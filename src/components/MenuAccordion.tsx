import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: "white"}} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
     position: 'absolute', 
     left: "0px",
  },
  '& .MuiAccordionSummary-expandIconWrapper':{
    position: "absolute",
    right: '20px'
  },
  '& .MuiCollapse-wrapper': {
    overflow: 'hidden'
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  overflow: 'hidden'
}));

export default function MenuAccordion() {


    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [open, setOpen] = React.useState(true);



  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{border: "none", }}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" sx={{backgroundColor: "#203764", padding: "0px", 
        '& .MuiAccordionSummary-content': 
        { background: '#DEBB3E',
          marginLeft: '10px',
          borderRadius: '50px 0 0 50px',
          width: '96%'} }}>
        <ListItem
              disablePadding
              sx={{ display: "block", color: "white" }}
            >
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
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Proveedores"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </AccordionSummary>
        <AccordionDetails sx={{padding: "0px"}}>
        <List sx={{ backgroundColor: "#203764", height: "100%" }}>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block", color: "white" }}
            >
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
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
