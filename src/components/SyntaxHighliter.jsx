import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";


const SyntaxHighlight = ({image ,size ="60px"}) => {
    const code = `import { Box } from "@mui/material";
    import { styled } from "@mui/system";
    
    const WidgetWrapper = styled(Box)(({ theme }) => ({
      padding: "1.5rem 1.5rem 0.75rem 1.5rem",
      backgroundColor: theme.palette.background.alt,
      borderRadius: "0.75rem",
    }));
    
    export default WidgetWrapper;
    `;
    return (
        <SyntaxHighlighter children={code} language="javascript" showLineNumbers="true"  style={dracula} customStyle={{borderRadius: "5px"}} />
        );
}
    
export default SyntaxHighlight;
