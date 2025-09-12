import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function Footer() {
  return (
    <TooltipProvider>
      <div style={{ backgroundColor: "#1a1a1a", padding: "10px" }}>
        <p>
          Turn on Ad Shield. It helps annoying Ads and unsafe element to provide
          you with a clean and safe browsering environment.
          <span
            style={{
              marginLeft: "8px",
              verticalAlign: "middle",
              cursor: "pointer",
            }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Blocks ads • Protect Privacy</p>
              </TooltipContent>
            </Tooltip>
          </span>
        </p>
      </div>
    </TooltipProvider>
  );
}
