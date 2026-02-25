import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import ProgressNavigationBar from "../../components/ui/ProgressNavigationBar";
import RoadmapHeader from "./components/RoadmapHeader";
import RoadmapTimeline from "./components/RoadmapTimeline";
import QuickActions from "./components/QuickActions";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { getRoadmap } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { userService } from "../../services/userService";

const AIGeneratedRoadmap = () => {
  const [viewMode, setViewMode] = useState("timeline");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [userProgress, setUserProgress] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Generate dynamic mock data based on user selections
  const getUserSelections = () => {
    const savedTechnology = localStorage.getItem(
      "Nayi Disha_selected_technology"
    );
    const savedGoal = localStorage.getItem("Nayi Disha_selected_goal");
    const savedSelections = localStorage.getItem("Nayi Disha_selections");

    let subject = "JavaScript";
    let goal = "Full Stack Development";
    let skillLevel = "intermediate";

    if (savedTechnology) {
      try {
        const tech = JSON.parse(savedTechnology);
        subject = tech?.name || tech;
      } catch (e) { }
    }

    if (savedGoal) {
      try {
        const goalData = JSON.parse(savedGoal);
        goal = goalData?.title || goalData;
      } catch (e) { }
    }

    if (savedSelections) {
      try {
        const sel = JSON.parse(savedSelections);
        skillLevel = sel?.skillLevel || skillLevel;
      } catch (e) { }
    }

    return { subject, goal, skillLevel };
  };

  const selections = getUserSelections();

  const mockRoadmapData = {
    id: `roadmap_${selections.subject.toLowerCase()}_${selections.goal
      .toLowerCase()
      .replace(/\s+/g, "_")}_${selections.skillLevel}`,
    title: `${selections.subject} ${selections.goal} Learning Roadmap`,
    description: `A comprehensive learning path tailored to your ${selections.skillLevel} skill level, focusing on ${selections.subject} for ${selections.goal}. This roadmap adapts to your progress and provides personalized recommendations.`,
    totalModules: 10,
    estimatedTime: "32-42 hours",
    difficulty:
      selections.skillLevel.charAt(0).toUpperCase() +
      selections.skillLevel.slice(1),
    completedModules: 0,
    createdAt: new Date()?.toISOString(),
    lastUpdated: new Date()?.toISOString(),
    userSelections: {
      subject: selections.subject,
      goal: selections.goal,
      skillLevel:
        selections.skillLevel.charAt(0).toUpperCase() +
        selections.skillLevel.slice(1),
    },
    aiRecommendations: [
      "Focus on practical exercises to reinforce theoretical concepts",
      `Practice ${["History", "Economics", "Geography", "Politics", "Mahabharata", "Ramayana"].includes(selections.subject) ? "reading and note-taking" : "coding"} daily for 1-2 hours to maintain momentum`,
      "Join study communities for peer learning and support",
      `Build a ${["History", "Economics", "Geography", "Politics", "Mahabharata", "Ramayana"].includes(selections.subject) ? "study portfolio" : "portfolio project"} after completing each major section`,
    ],
    overallProgress: 0,
  };

  useEffect(() => {
    const loadRoadmap = async () => {
      setIsLoading(true);

      try {
        // Check if user is logged in
        if (!user) {
          setIsLoading(false);
          return;
        }

        // PRIORITY: If navigating with a freshly generated roadmap, use it immediately
        const stateRoadmap = location?.state?.roadmapData;
        const isNewRoadmap = location?.state?.isNewRoadmap;

        if (stateRoadmap && isNewRoadmap) {
          const enhancedData = {
            ...stateRoadmap,
            completedModules: 0,
            overallProgress: 0,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            userSelections: {
              subject: location?.state?.subject || stateRoadmap?.title || "JavaScript",
              goal: location?.state?.goal || "Full Stack Development",
              skillLevel: location?.state?.skillLevel || "intermediate",
            },
          };
          console.log("Using freshly generated roadmap:", enhancedData.title || enhancedData.userSelections?.subject);
          setRoadmapData(enhancedData);
          setIsLoading(false);
          return;
        }

        // Otherwise, load from database
        const progress = await userService.getProgress(user.uid);

        if (progress && progress.roadmap) {
          setUserProgress(progress);

          // Enhance roadmap with progress data
          const enhancedRoadmap = {
            ...progress.roadmap,
            completedModules: progress.completed_modules?.length || 0,
            overallProgress: progress.overall_progress || 0,
            userSelections: {
              subject: progress.selected_subjects?.[0] || "JavaScript",
              goal: progress.goal || "Full Stack Development",
              skillLevel: progress.skill_level || "intermediate",
            },
            // Mark modules as completed based on progress
            modules: progress.roadmap.modules?.map(module => ({
              ...module,
              status: progress.completed_modules?.includes(module.id)
                ? "completed"
                : progress.current_module === module.id
                  ? "in-progress"
                  : "available",
              score: progress.quiz_scores?.[module.id] || 0
            })) || []
          };

          setRoadmapData(enhancedRoadmap);
        } else if (stateRoadmap) {
          // Freshly generated roadmap (without isNewRoadmap flag)
          const enhancedData = {
            ...stateRoadmap,
            completedModules: 0,
            overallProgress: 0,
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            userSelections: {
              subject: location?.state?.subject || "JavaScript",
              goal: location?.state?.goal || "Full Stack Development",
              skillLevel: location?.state?.skillLevel || "intermediate",
            },
          };
          setRoadmapData(enhancedData);
        } else {
          // No roadmap at all - user needs to generate one
          setRoadmapData(null);
        }
      } catch (error) {
        console.error("Error loading roadmap:", error);
        // If Supabase fails but we have state roadmap, use it
        const stateRoadmap = location?.state?.roadmapData;
        if (stateRoadmap) {
          setRoadmapData({
            ...stateRoadmap,
            completedModules: 0,
            overallProgress: 0,
          });
        } else {
          setRoadmapData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadRoadmap();
  }, [user, location?.state]);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleModuleStart = (module) => {
    // Save current module to localStorage
    localStorage.setItem("Nayi Disha_current_module", JSON.stringify(module));

    // Navigate to quiz interface
    navigate("/module-quiz-interface", {
      state: {
        module,
        fromRoadmap: true,
      },
    });
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "continue":
        // Find the first in-progress or available module
        const currentModule = mockRoadmapData?.modules?.find(
          (m) => m?.status === "in-progress" || m?.status === "available"
        );
        if (currentModule) {
          handleModuleStart(currentModule);
        } else {
          navigate("/module-quiz-interface");
        }
        break;

      case "dashboard":
        navigate("/dashboard");
        break;

      case "goals":
        navigate("/goal-selection");
        break;

      case "regenerate":
        setIsLoading(true);
        setTimeout(() => {
          // Reset roadmap and navigate to skill selection
          localStorage.removeItem("Nayi Disha_roadmap");
          navigate("/skill-level-selection");
        }, 1000);
        break;

      default:
        console.log("Unknown action:", actionId);
    }
  };

  const toggleQuickActions = () => {
    setShowQuickActions(!showQuickActions);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProgressNavigationBar
          isVisible={false}
          overallProgress={roadmapData?.overallProgress || 0}
        />

        <main className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gradient mb-3">
                  Generating Your Roadmap
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Our AI is creating a personalized learning path based on your
                  selections. This may take a few moments.
                </p>
                <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-32 pb-16">
        <div className="container  mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <RoadmapHeader
                roadmapData={roadmapData}
                onFilterChange={handleFilterChange}
                currentFilter={currentFilter}
                onViewModeChange={handleViewModeChange}
                viewMode={viewMode}
              />

              <RoadmapTimeline
                modules={roadmapData?.modules || []}
                viewMode={viewMode}
                currentFilter={currentFilter}
                onModuleStart={handleModuleStart}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              {/* Quick Actions Toggle for Mobile */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleQuickActions}
                  iconName={showQuickActions ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  className="w-full"
                >
                  Quick Actions
                </Button>
              </div>

              {/* Quick Actions Panel */}
              <div
                className={`
                ${showQuickActions ? "block" : "hidden lg:block"}
                animate-fade-in
              `}
              >
                <QuickActions
                  onAction={handleQuickAction}
                  completedModules={roadmapData?.completedModules || 0}
                  totalModules={roadmapData?.totalModules || 0}
                />
              </div>
            </div>
          </div>

          {/* Empty State for No Roadmap */}
          {!roadmapData && !isLoading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
                <Icon
                  name="MapPin"
                  size={40}
                  className="text-muted-foreground"
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                No Roadmap Found
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                It looks like you haven't created a learning roadmap yet.
                Complete the onboarding process to generate your personalized
                learning path.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  onClick={() => navigate("/subject-selection")}
                  iconName="Play"
                  iconPosition="left"
                >
                  Start Onboarding
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/landing-page")}
                  iconName="Home"
                  iconPosition="left"
                >
                  Go Home
                </Button>
              </div>
            </div>
          )}

          {/* Floating Action Button for Mobile */}
          <div className="fixed bottom-6 right-6 lg:hidden">
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                const availableModule = mockRoadmapData?.modules?.find(
                  (m) =>
                    m?.status === "available" || m?.status === "in-progress"
                );
                if (availableModule) {
                  handleModuleStart(availableModule);
                } else {
                  navigate("/module-quiz-interface");
                }
              }}
              iconName="Play"
              className="w-14 h-14 rounded-full shadow-lg neon-glow floating-action"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIGeneratedRoadmap;
