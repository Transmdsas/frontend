import { Card, CardContent, CardHeader } from "@mui/material";
import React, { ReactNode } from "react";

interface DetailCardProps {
  cardTitle: string;
  cardSubTitle?: string;
  cardWidth: string;
  children: ReactNode;
}

export const DetailCard = ({
  cardTitle,
  cardSubTitle,
  cardWidth,
  children,
}: DetailCardProps) => {
  return (
    <Card
      sx={{
        minWidth: `${cardWidth}`,
        boxShadow: "rgba(58, 53, 65, 0.1) 0px 2px 10px 0px",
        borderRadius: "20px",
      }}
    >
      <CardHeader title={cardTitle} subheader={cardSubTitle}/>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
