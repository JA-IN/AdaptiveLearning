import React from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import pythonLogo from "../../../../public/assets/logo/python.svg";
import javascriptLogo from "../../../../public/assets/logo/javascript.svg";
import reactLogo from "../../../../public/assets/logo/react.svg";
import nodeLogo from "../../../../public/assets/logo/nodejs.svg";

const TechnologyCard = ({
  technology,
  isSelected = false,
  onSelect = () => { },
  className = "",
}) => {
  // Map technology name to imported SVG or Lucide icon
  const getTechnologyVisual = (tech) => {
    // SVG logo map for tech subjects
    const svgMap = {
      Python: pythonLogo,
      JavaScript: javascriptLogo,
      React: reactLogo,
      "Node.js": nodeLogo,
    };

    // Lucide icon map for IKS subjects
    const iconMap = {
      History: { name: "Landmark", color: "text-amber-400" },
      Economics: { name: "TrendingUp", color: "text-emerald-400" },
      Geography: { name: "Globe", color: "text-blue-400" },
      Politics: { name: "Scale", color: "text-rose-400" },
      Mahabharata: { name: "Swords", color: "text-orange-400" },
      Ramayana: { name: "Crown", color: "text-yellow-400" },
    };

    // Check for SVG logo first
    const svgSrc = svgMap[tech];
    if (svgSrc) {
      return <img src={svgSrc} alt={tech} className="w-12 h-12 object-contain" />;
    }

    // Check for Lucide icon
    const iconInfo = iconMap[tech];
    if (iconInfo) {
      return (
        <Icon
          name={iconInfo.name}
          size={32}
          className={iconInfo.color}
        />
      );
    }

    // Fallback
    return (
      <svg
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12"
      >
        <rect width="128" height="128" fill="gray" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
        >
          ?
        </text>
      </svg>
    );
  };

  const isIKS = technology?.category === "iks";

  return (
    <div
      className={`
        relative bg-[#171717] border border-[#737373] rounded-md transition-all duration-300 cursor-pointer group 
        ${isSelected
          ? "border-primary/60 neon-glow bg-primary/5 shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
          : "border-purple-500/20 hover:border-purple-500/40 hover:shadow-glass-lg"
        }
        ${className}
      `}
      onClick={() => onSelect(technology)}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-spring">
          <span className="text-primary-foreground font-bold">✓</span>
        </div>
      )}

      <div className="p-6">
        {/* Technology Visual */}
        <div
          className={`
            w-16 h-16 rounded-xl flex items-center justify-center mb-3 mx-auto
            ${isIKS ? "bg-white/5" : ""}
            ${isSelected ? "neon-glow" : "group-hover:scale-110"}
            transition-transform duration-300
          `}
        >
          {getTechnologyVisual(technology?.name)}
        </div>

        {/* Technology Name */}
        <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
          {technology?.name}
        </h3>

        {/* Description */}
        <p className="text-xs font-mono text-muted-foreground text-center mb-6 line-clamp-3">
          {technology?.description}
        </p>

        {/* Use Cases */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-foreground mb-2">
            {isIKS ? "Useful for:" : "Popular for:"}
          </h4>
          <div className="flex flex-wrap gap-1">
            {technology?.useCases?.slice(0, 3)?.map((useCase, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-6 flex-row justify-center items-center ">
          <h4 className="text-xs font-medium text-foreground mb-2">
            You'll learn:
          </h4>
          <ul className="space-y-1 mb-9">
            {technology?.learningOutcomes
              ?.slice(0, 3)
              ?.map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-xs text-muted-foreground"
                >
                  <span className="mt-0.5">→</span>
                  <span>{outcome}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Selection Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className={`w-full transition-all duration-300  ${isSelected ? "neon-glow" : "hover:border-primary/50"
            }`}
        >
          {isSelected ? "Selected" : isIKS ? "Select Subject" : "Select Technology"}
        </Button>
      </div>
    </div>
  );
};

export default TechnologyCard;
