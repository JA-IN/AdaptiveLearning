import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import { generateRoadmap } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { userService } from "../../../services/userService";

const RoadmapGenerationModal = ({
  isOpen,
  onClose,
  userSelections,
  onComplete,
}) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [generatedRoadmap, setGeneratedRoadmap] = useState(null);
  const [existingRoadmap, setExistingRoadmap] = useState(null);

  const generationSteps = [
    {
      id: 1,
      title: "Analyzing Your Profile",
      description: "Processing your subject, goal, and skill level preferences",
      icon: "UserCheck",
      duration: 2000,
    },
    {
      id: 2,
      title: "Consulting AI Engine",
      description: "Gemini AI is creating your personalized learning path",
      icon: "Brain",
      duration: 3000,
    },
    {
      id: 3,
      title: "Generating Modules",
      description: "Creating 8-12 adaptive learning modules tailored for you",
      icon: "BookOpen",
      duration: 2500,
    },
    {
      id: 4,
      title: "Optimizing Difficulty",
      description: "Calibrating question complexity and learning pace",
      icon: "Settings",
      duration: 2000,
    },
    {
      id: 5,
      title: "Finalizing Roadmap",
      description: "Preparing your adaptive learning journey",
      icon: "CheckCircle",
      duration: 1500,
    },
  ];

  useEffect(() => {
    if (!isOpen) return;

    setIsGenerating(true);
    setCurrentStep(0);
    setProgress(0);

    const totalDuration = generationSteps?.reduce(
      (sum, step) => sum + step?.duration,
      0
    );
    let elapsed = 0;

    const processSteps = async () => {
      try {
        setError(null);

        // Check if user is logged in
        if (!user) {
          setError("Please sign in to generate a roadmap.");
          setIsGenerating(false);
          return;
        }

        // Check if roadmap already exists for the SAME subject
        setCurrentStep(0);
        setProgress(10);

        // Non-blocking Supabase check - don't let it block roadmap generation
        let existingProgress = null;
        try {
          existingProgress = await Promise.race([
            userService.getProgress(user.uid),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase timeout")), 8000))
          ]);
        } catch (supabaseErr) {
          console.warn("Supabase progress check failed (non-blocking):", supabaseErr.message);
          // Continue with fresh roadmap generation
        }

        // Only reuse existing roadmap if subject matches current selection
        const currentSubject = userSelections?.subject || "JavaScript";
        const existingSubject = existingProgress?.selected_subjects?.[0] ||
          existingProgress?.roadmap?.userSelections?.subject || "";

        const isSameSubject = existingSubject.toLowerCase() === currentSubject.toLowerCase();

        if (existingProgress && existingProgress.roadmap && isSameSubject) {
          // Roadmap already exists for the same subject, reuse it
          setExistingRoadmap(existingProgress.roadmap);
          setProgress(100);
          setCurrentStep(generationSteps.length - 1);

          setTimeout(() => {
            setIsGenerating(false);
            onComplete(existingProgress.roadmap);
          }, 1000);
          return;
        }

        // Start visual progress animation for new roadmap generation
        for (let i = 0; i < 2; i++) {
          setCurrentStep(i);
          const stepDuration = generationSteps?.[i]?.duration;

          const progressInterval = setInterval(() => {
            elapsed += 50;
            const newProgress = Math.min((elapsed / totalDuration) * 100, 40);
            setProgress(newProgress);
          }, 50);

          await new Promise((resolve) => setTimeout(resolve, stepDuration));
          clearInterval(progressInterval);
        }

        // Make actual API call during "Consulting AI Engine" step
        setCurrentStep(1);
        setProgress(45);

        // Add timeout to prevent hanging when Gemini API is slow
        const roadmapData = await Promise.race([
          generateRoadmap(
            userSelections?.subject || "JavaScript",
            userSelections?.goal || "Full Stack Development",
            userSelections?.skillLevel || "intermediate"
          ),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Roadmap generation timed out. Please try again.")), 45000)
          )
        ]);

        setGeneratedRoadmap(roadmapData);
        setProgress(70);

        // Save roadmap to database (non-blocking)
        try {
          await Promise.race([
            userService.saveRoadmap(user.uid, roadmapData, {
              subject: userSelections?.subject,
              goal: userSelections?.goal,
              skillLevel: userSelections?.skillLevel,
              selectedSubjects: [userSelections?.subject]
            }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Save timeout")), 10000))
          ]);
        } catch (saveErr) {
          console.warn("Failed to save roadmap to database (non-blocking):", saveErr.message);
          // Continue anyway - roadmap is still generated
        }

        setProgress(75);

        // Continue with remaining visual steps
        for (let i = 2; i < generationSteps?.length; i++) {
          setCurrentStep(i);
          const stepDuration = 1000; // Faster since API is done

          const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 5, 95));
          }, 100);

          await new Promise((resolve) => setTimeout(resolve, stepDuration));
          clearInterval(progressInterval);
        }

        // Complete
        setProgress(100);
        setTimeout(() => {
          setIsGenerating(false);
          onComplete(roadmapData);
        }, 500);
      } catch (err) {
        console.error("Roadmap generation error:", err);
        setError(
          err.message || "Failed to generate roadmap. Please try again."
        );
        setIsGenerating(false);
        setProgress(0);
      }
    };

    processSteps();
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center ">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      {/* Modal */}
      <div className="relative backdrop-blur-xl border border-purple-500/20 rounded-lg p-8 max-w-md w-full animate-fade-in">
        <div className="text-center">
          {/* Header */}
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
              <Icon name="Sparkles" size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gradient mb-2">
              Creating Your Roadmap
            </h2>
            <p className="text-sm text-muted-foreground">
              Our AI is crafting a personalized learning journey just for you
            </p>
          </div>

          {/* User Selections Summary */}
          <div className="mb-6 p-4 glass-surface border border-purple-500/10 rounded-lg">
            <h3 className="text-sm font-medium text-foreground mb-3">
              Your Selections
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subject:</span>
                <span className="text-primary font-medium">
                  {userSelections?.subject || "JavaScript"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Goal:</span>
                <span className="text-secondary font-medium">
                  {userSelections?.goal || "Full Stack Development"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Level:</span>
                <span className="text-accent font-medium">
                  {userSelections?.skillLevel || "Intermediate"}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-6">
            <div className="space-y-4">
              {generationSteps?.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const isUpcoming = index > currentStep;

                return (
                  <div
                    key={step?.id}
                    className={`
                      flex items-center space-x-3 p-3 rounded-lg transition-all duration-300
                      ${isActive ? "bg-primary/10 border border-primary/20" : ""
                      }
                      ${isCompleted ? "opacity-60" : ""}
                      ${isUpcoming ? "opacity-40" : ""}
                    `}
                  >
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                        ${isCompleted
                          ? "bg-success text-success-foreground"
                          : isActive
                            ? "bg-primary text-primary-foreground animate-pulse"
                            : "bg-muted text-muted-foreground"
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        <Icon name={step?.icon} size={16} />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div
                        className={`text-sm font-medium ${isActive ? "text-primary" : "text-foreground"
                          }`}
                      >
                        {step?.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {step?.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="w-4 h-4">
                        <div className="animate-spin">
                          <Icon
                            name="Loader2"
                            size={16}
                            className="text-primary"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                Generation Progress
              </span>
              <span className="text-xs font-mono text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Loading Message or Error */}
          <div className="text-center">
            {error ? (
              <>
                <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <Icon
                    name="AlertCircle"
                    size={24}
                    className="text-destructive mx-auto mb-2"
                  />
                  <p className="text-sm text-destructive font-medium mb-1">
                    Generation Failed
                  </p>
                  <p className="text-xs text-muted-foreground">{error}</p>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    iconName="X"
                    iconPosition="left"
                  >
                    Close
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => window.location.reload()}
                    iconName="RefreshCw"
                    iconPosition="left"
                  >
                    Try Again
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  {isGenerating
                    ? "This usually takes 10-15 seconds. Please don't close this window."
                    : "Your personalized roadmap is ready!"}
                </p>

                {!isGenerating && (
                  <Button
                    variant="default"
                    onClick={() => onComplete(generatedRoadmap)}
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="neon-glow"
                  >
                    View My Roadmap
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerationModal;
