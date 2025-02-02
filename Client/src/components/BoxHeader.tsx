
import { Box, Typography, useTheme } from "@mui/material"
import FlexBetween from "./FlexBetween"
type Props = {
    title: string;
    subtitle?: string,
    icon?: React.ReactNode;
    sideText: string;
}
const BoxHeader = ({ icon, title, subtitle, sideText } : Props) => {
    const { palette } = useTheme();
    return (
        <FlexBetween 
        color = {palette.grey[400] }
        margin = "1.0rem 1rem 0rem 1rem">
            <FlexBetween>
                {icon}
                <Box width="100%">
                    <Typography fontFamily="sans-serif"  fontWeight="700" mb="-0.1rem">
                        {title}
                    </Typography>
                    <Typography variant="h6">{subtitle}</Typography>
                </Box>
            </FlexBetween>
            <Typography variant="h5" fontWeight="700" color = {palette.secondary[500]}>
                {sideText}
            </Typography>
        </FlexBetween>
    )
}

export default BoxHeader;
