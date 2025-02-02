import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashBoardBox"
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api"
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Cell, Pie, PieChart } from "recharts";
import { useMemo } from "react";

const Row3 = () => {
    const { palette } = useTheme();
    const { data: productData } = useGetProductsQuery();
    const { data: kpiData } = useGetKpisQuery();
    const { data: transactionData } = useGetTransactionsQuery();
    console.log(kpiData);


    const pieColors = [palette.primary[800], palette.primary[400]];
    const productColumns =  [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "expense",
            headerName:"Expense",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params: GridCellParams) => `$${params.value}`,

        }
    ]
    const transactionColumns =  [
        {
            field: "_id",
            headerName: "id",
            flex: 1,
        },
        {
            field: "buyer",
            headerName:"Buyer",
            flex: 0.67,
        },
        {
            field: "amount",
            headerName: "Amount",
            flex: 0.35,
            renderCell: (params: GridCellParams) => `$${params.value}`,
        },
        {
            field: "productIds",
            headerName: "Count",
            flex: 0.35,      
            renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
        }
    ]

    const pieChartData = useMemo(() => {
        console.log("Kpi data", kpiData);
        if(kpiData) {
            const totalExpenses = kpiData[0].totalExpenses;
            return Object.entries(kpiData[0].expensesByCategory)
            .slice(0, 3)
            .map(
                ([key, value]) => {
                    return [
                        {
                            name: key,
                            value: value,
                        },
                        {
                            name: `${key} of Total`,
                            value: totalExpenses-value,
                        }
                    ]
                }
            )
        }
    }, [kpiData]);

    return (
        <>
        <DashboardBox gridArea="g">
            <BoxHeader 
            title = "List of Products" 
            sideText= {`${productData?.length} products`}
            />
            <Box
            mt = "0.5rem"
            p="0 0.5rem"
            height="75%"
            sx={{
                "& .MuiDataGrid-root": {
                    color: palette.grey[300],
                    fontSize: "10px",
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    border: "hidden",
                    borderBottom: `1px solid ${palette.grey[700]} !important`,
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: palette.grey[100],
                    fontSize: "12px"
                  },
                  "& .MuiDataGrid-columnSeparator": {
                    visibility: "hidden",
                  },
            }}>
            <DataGrid 
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows ={ productData || []}
            columns = {productColumns}
            />
            </Box>
        </DashboardBox>


        <DashboardBox gridArea="h">
        <BoxHeader 
            title = "Recent Orders" 
            sideText= {`${transactionData?.length} latest transactions`}
            />
            <Box
            mt = "1rem"
            p="0 0.5rem"
            height="80%"
            sx={{
                "& .MuiDataGrid-root": {
                    color: palette.grey[300],
                    fontSize: "10px",
                    border: "none",
                    // background: palette.grey[300]
                  },
                  "& .MuiDataGrid-cell": {
                    border: "hidden",
                    borderBottom: `1px solid ${palette.grey[700]} !important`,
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: palette.grey[100],
                    fontSize: "12px"
                  },
                  "& .MuiDataGrid-columnSeparator": {
                    visibility: "hidden",
                  },
            }}>
            <DataGrid 
            columnHeaderHeight={25}
            rowHeight={38}
            hideFooter={true}
            rows ={ transactionData || []}
            columns = {transactionColumns}
            />
            </Box>
        </DashboardBox>




        <DashboardBox gridArea="i">
            <BoxHeader title = "Expense BreakDown by Category" sideText="+5%" />
            <FlexBetween mt="-0.5rem" 
            gap="-3rem" p="0 0rem" 
            textAlign="center" 
            width="85%" 
            ml="1.5rem">
          {pieChartData?.map((data, i) => (
            // <Box key={`${data[0].name}-${i}`} gap="-0.25rem">
            <Box key={`${data[0].name}-${i}`} >
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5" fontSize="13px" marginTop="-0.6rem">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
        </DashboardBox>



        <DashboardBox gridArea="j">
            <BoxHeader title="Overall Summary and Explanation data" sideText=""/>
            <Box
            height="15px"
            margin="1.25rem 1rem 0.4rem 1rem"
            bgcolor={palette.primary[800]}
            borderRadius="1rem">
                <Box
                height="15px"
                bgcolor={palette.primary[400]}
                borderRadius="1rem"
                width="30%"></Box>
            </Box>
            <Typography fontSize="11px" margin="0 1rem" variant="h6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolor ad cumque error, repudiandae numquam. Maiores, necessitatibus, hic nam, odio porro odit quibusdam esse molestias magnam ab similique nesciunt itaque?
            </Typography>

        </DashboardBox>
        </>
    )
}
export default Row3;