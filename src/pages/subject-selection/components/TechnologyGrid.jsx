import React from "react";
import TechnologyCard from "./TechnologyCard";

const TechnologyGrid = ({
  technologies = [],
  selectedTechnology = null,
  onTechnologySelect = () => { },
  activeCategory = "tech",
  className = "",
}) => {
  const isBtech = activeCategory === "btech";
  const isIKS = activeCategory === "iks";

  const headerLabel = isBtech ? "Subject" : isIKS ? "Subject" : "Technology";
  const headerDescription = isBtech
    ? "Select a subject from your B.Tech CSE curriculum. Our AI will generate a personalized study plan with quizzes and modules."
    : isIKS
      ? "Select a subject from India's rich knowledge tradition. Our AI will create a personalized learning roadmap with adaptive assessments."
      : "Select the programming technology you want to master. This choice will shape your personalized learning roadmap and adaptive quiz experience.";
  const helperNoun = isBtech ? "subjects" : isIKS ? "subjects" : "technologies";

  // Group by semester for B.Tech
  const semesters = isBtech
    ? [...new Set(technologies.map((t) => t.semester))].sort()
    : [];

  const semesterLabels = {
    1: "Semester 1 — 1st Year",
    2: "Semester 2 — 1st Year",
    3: "Semester 3 — 2nd Year",
  };

  return (
    <div className={className}>
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choose Your{" "}
          <span className="text-primary">{headerLabel}</span>{" "}
          Focus
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {headerDescription}
        </p>
      </div>

      {isBtech ? (
        /* Semester-grouped grid for B.Tech */
        semesters.map((sem) => (
          <div key={sem} className="mb-10">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span>📘</span> {semesterLabels[sem] || `Semester ${sem}`}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies
                ?.filter((t) => t.semester === sem)
                .map((technology) => (
                  <TechnologyCard
                    key={technology?.id}
                    technology={technology}
                    isSelected={selectedTechnology?.id === technology?.id}
                    onSelect={() => onTechnologySelect(technology)}
                    className="animate-fade-in"
                    style={{ animationDelay: `${(technology?.id % 10) * 100}ms` }}
                  />
                ))}
            </div>
          </div>
        ))
      ) : (
        /* Standard grid for Tech & IKS */
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${isIKS ? "lg:grid-cols-3" : "lg:grid-cols-4"
            } gap-6`}
        >
          {technologies?.map((technology) => (
            <TechnologyCard
              key={technology?.id}
              technology={technology}
              isSelected={selectedTechnology?.id === technology?.id}
              onSelect={() => onTechnologySelect(technology)}
              className="animate-fade-in"
              style={{ animationDelay: `${(technology?.id % 10) * 100}ms` }}
            />
          ))}
        </div>
      )}

      {/* Helper Text */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Don't worry - you can explore other {helperNoun} after completing your
          current roadmap
        </p>
      </div>
    </div>
  );
};

export default TechnologyGrid;
