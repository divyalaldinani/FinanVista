import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashBoardBox"
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, Legend } from "recharts";

const pieData = [
    {name: "Group A", value: 680},
    {name: "Group B", value: 400},
]
const Row2 = () => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[400], palette.primary[800]];
    const { data: productData } = useGetProductsQuery();
    const { data: operationalData } = useGetKpisQuery();
    console.log("data ", operationalData);
    const operationalExpenses = useMemo(() => {
            return (
                operationalData &&
                operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
                    return {
                        name: month.substring(0, 3),
                        "Operational Expenses": operationalExpenses,
                        "Non-Operational Expenses": nonOperationalExpenses,
                    };
                })
            );
        }, [operationalData]);
        
        const productExpenseData = useMemo(() => {
            return (
                productData &&
                productData.map(({ _id, price, expense }) => {
                    return {
                        id: _id,
                        price: price,
                        expense: expense,
                    };
                })
            );
        }, [productData]);
        
    return (
        <>
        <DashboardBox gridArea="d">
            <BoxHeader
            title ="Operational VS Non-Operational Expenses"
            sideText='+4%'
            />
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
            data={operationalExpenses}
            margin={{
                top: 20,
                right: 0,
                left: -10,
                bottom: 55,
            }}
            >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" 
            tickLine= {false} 
            style= {{fontSize: "10px"}} />
            <YAxis 
            yAxisId="left"
            orientation="left"
            axisLine = {false} 
            tickLine= {false} 
            style= {{fontSize: "10px"}} />
            <YAxis 
            yAxisId="right"
            orientation='right'
            axisLine = {false} 
            tickLine= {false} 
            style= {{fontSize: "10px"}} />
            <Tooltip />
            <Legend height={20} fontSize = "8px" wrapperStyle = {{
            margin: '0px 0 0px 10px'
            }}
            />
            <Line
            yAxisId="left"
            type="monotone"
            dataKey="Non-Operational Expenses"
            stroke={palette.tertiary[500]}
            />
            <Line 
            yAxisId="right"
            type="monotone"
            dataKey="Operational Expenses"
            stroke={palette.primary.main} />
            </LineChart>
            </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox gridArea="e">
            <BoxHeader title = "Campaigns and Targets" sideText="+2%" />
            <FlexBetween mt = "0.25rem" gap = "1.5rem" pr="1rem">
            <PieChart 
            width={140} 
            height={90}
            margin= {{
                top: 0,
                right: -10,
                left: 10,
                bottom: 0,
            }}>
                <Pie
                stroke="none"
                data={pieData}
                innerRadius={16}
                outerRadius={40}
                paddingAngle={2}
                dataKey="value"
                >
                {pieData.map((_, index) => (
                    <Cell 
                    key={`cell-${index}`} 
                    fill={pieColors[index]} />
                ))}
                </Pie>
            </PieChart>
            <Box ml = "-2.0rem" flexBasis="55%" textAlign="center">
                <Typography variant="h5" fontSize="14px">Target Sales</Typography>
                <Typography m = "0.3rem 0.5rem " variant="h3" color={palette.primary[200]}>83</Typography>
                <Typography variant="h6" fontSize="12px">
                    Finance goals of the<br></br>campaign that is desired.
                </Typography>
            </Box>
            </FlexBetween>
        </DashboardBox>


        <DashboardBox gridArea="f">
            
            <BoxHeader title = "Product Prices VS Expenses" sideText="+5%" />
            <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
            margin={{
                top: 20,
                right: 25,
                bottom: 40,
                left: -10,
            }}
            >
            <CartesianGrid stroke={palette.grey[800]}/>
            <XAxis 
            type="number" 
            dataKey="price" 
            name="price" 
            axisLine={false}
            tickLine={false}
            style={{fontSize: "10px"}}
            tickFormatter={(v) => `$${v}`} />
            <YAxis 
            type="number" 
            dataKey="expense" 
            name="expense" 
            axisLine={false}
            tickLine={false}
            style={{fontSize: "10px"}}
            tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(v) => `$${v}`}/>
            <ZAxis type="number" range={[15]} />
            <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
            </ScatterChart>
            </ResponsiveContainer>
        </DashboardBox>
        </>
    )
}

export default Row2;
