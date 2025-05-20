import { Weight } from "lucide-react";
import Pheaders from "./paragraph-header"
import { Button, buttonVariants } from "./ui/button";

const FAQ = ({text, supporting, fontSize, supportingFontSize}: {text: string; supporting: string; fontSize: string; supportingFontSize: string;}) => {
    return(
        <div className="border-l-4" style={{ borderColor: 'rgba(234, 242, 239, 0.60)' }}>
            <div className="flex flex-col items-center gap-2 self-stretch px-4 py-4">
                <Pheaders text = {text} supporting= {supporting} fontSize={fontSize} supportingFontSize={supportingFontSize}></Pheaders>
                <div className="flex justify-center items-center gap-2">
                    <div className="item-start"></div>

                    <Button size="sm">
                        <h2 className="inter font-normal" style={{fontWeight:600,fontSize: "16px", lineHeight: "24px"}}>
                            Learn More
                        </h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M4.16666 10.0001H15.8333M15.8333 10.0001L9.99999 4.16675M15.8333 10.0001L9.99999 15.8334" stroke="#CECFD2" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Button>
                    
                    

                </div>
            </div>
        </div>
    )
}

export default FAQ;