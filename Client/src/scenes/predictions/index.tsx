// import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material"
import { useMemo, useState } from "react";
import DashboardBox from "@/components/DashBoardBox";
import FlexBetween from "@/components/FlexBetween";
import { CartesianGrid, Tooltip, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Label } from "recharts";
import { useGetKpisQuery } from "@/state/api";
import regression, {DataPoint} from "regression";


const Predictions = () => {
    const  { palette } = useTheme();
    const [ isPredictions, setIsPreditions ] = useState(false);
    const { data: kpiData } = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if( !kpiData ) return [];
        const monthData = kpiData[0].monthlyData;

        
        const formatted: Array<DataPoint> = monthData.map(
            ({ revenue }, i: number ) => {
                return [i, revenue] // x, y values
            }
        );
        const regressionLine = regression.linear(formatted);
        return monthData.map(({ month, revenue }, i: number) => {
            return {
                name: month,
                "Actual Revenue": revenue,
                "Regression Line": regressionLine.points[i][1], // represnting revenue of current year -> by data
                "Predicted Revenue": regressionLine.predict(i+12)[1], // representing revenue of next year
            }
        })
    }, [kpiData]);

    return (
    <DashboardBox
    width="100%"
    height="100%" 
    flex="1"
    p="1rem"
    overflow="hidden">
        <FlexBetween m ="1rem 2.5rem" gap="1rem">
            <Box>
                <Typography variant="h3">
                    Revenue and Predictions
                </Typography>
                <Typography variant="h6" fontSize="0.8rem" >
                    Charted and Predicted Revenue based on a Simple Linear Regression Model
                </Typography>
            </Box>
            <Button 
            onClick={() => setIsPreditions(!isPredictions)}
            sx={{
                color:"rgba(0, 0, 0, 0.63)",
                background: "#d0cfd4",
                boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.4)",
                fontSize:"12px",
                fontWeight:"700",
                borderRadius:"10px",
                padding: "15px",
                textTransform:"true",
                fontFamily:"Montserrat, sans-serif",
            }}
            >
                Show predicted revenue for next year
            </Button>
        </FlexBetween>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
            data={formattedData}
            margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine= {false} style= {{fontSize: "10px"}}>
                <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis 
            domain={[12000, 28000]}
            axisLine = {{strokeWidth: '0'}}
            tickFormatter= {(v) => `$${v}`} 
            style= {{fontSize: "10px"}}>    

                <Label value="Revenue in USD" angle={-90} offset={-5} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top"/>
            <Line 
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.secondary[400]}
            strokeWidth={0}
            dot={{ strokeWidth: 4}}
            />
            <Line 
            type="monotone"
            dataKey="Regression Line"
            stroke={palette.secondary[100]} 
            dot={false} />

            {isPredictions && (
                <Line 
                type="monotone"
                strokeDasharray="5 2"
                textAnchor="Predicted Revenue"
                dataKey="Predicted Revenue"
                stroke={palette.primary[500]} />    
            )}
        </LineChart>
        </ResponsiveContainer>

    </DashboardBox>
    )
}

export default Predictions;
