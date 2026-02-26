import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const ProgressPage = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [progressData, setProgressData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedSubject, setExpandedSubject] = useState(null);

    useEffect(() => {
        if (!user && !authLoading) {
            navigate('/auth', { state: { from: { pathname: '/progress' } } });
            return;
        }
        if (user) {
            loadProgress();
        }
    }, [user, authLoading]);

    const loadProgress = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await userService.getProgressSummary(user.uid);
            setProgressData(data);
        } catch (err) {
            console.error('Error loading progress:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || seconds === 0) return '0m';
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hrs > 0) return `${hrs}h ${mins}m`;
        return `${mins}m`;
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHrs < 24) return `${diffHrs}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getScoreBarColor = (score) => {
        if (score >= 80) return 'from-emerald-500 to-emerald-400';
        if (score >= 60) return 'from-yellow-500 to-yellow-400';
        return 'from-red-500 to-red-400';
    };

    const getSubjectIcon = (subject) => {
        const map = {
            'JavaScript': 'Code2',
            'Python': 'Terminal',
            'React': 'Atom',
            'Node.js': 'Server',
            'History': 'BookOpen',
            'Economics': 'TrendingUp',
            'Geography': 'Globe',
            'Politics': 'Landmark',
        };
        return map[subject] || 'BookOpen';
    };

    const getSubjectColor = (index) => {
        const colors = [
            'from-purple-500 to-indigo-500',
            'from-pink-500 to-rose-500',
            'from-blue-500 to-cyan-500',
            'from-emerald-500 to-teal-500',
            'from-orange-500 to-amber-500',
            'from-violet-500 to-purple-500',
        ];
        return colors[index % colors.length];
    };

    // Loading state
    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#000000_0%,_rgba(74,26,125,0.5)_0%,_#000000_70%)]">
                <Header />
                <main className="pt-32 pb-16">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="flex items-center justify-center min-h-[60vh]">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                                <p className="mt-4 text-gray-400">Loading your progress...</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const hasData = progressData && progressData.totalQuizzes > 0;

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#000000_0%,_rgba(74,26,125,0.5)_0%,_#000000_70%)]">
            <Header />
            <main className="pt-32 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                            Your Progress
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Track your learning journey across all subjects
                        </p>
                    </motion.div>

                    {/* Error State */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3"
                        >
                            <Icon name="AlertCircle" size={18} />
                            <span>Failed to load progress data. Please try again.</span>
                            <button
                                onClick={loadProgress}
                                className="ml-auto text-red-300 hover:text-red-200 underline text-xs"
                            >
                                Retry
                            </button>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!hasData && !error && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                <Icon name="BarChart3" size={40} className="text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">No Progress Yet</h2>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                Complete quizzes to start tracking your learning progress. Your scores, subjects, and achievements will appear here.
                            </p>
                            <button
                                onClick={() => navigate('/subject-selection')}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25"
                            >
                                Start Learning
                            </button>
                        </motion.div>
                    )}

                    {/* Dashboard Content */}
                    {hasData && (
                        <>
                            {/* Overview Stats Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                {[
                                    {
                                        label: 'Quizzes Taken',
                                        value: progressData.totalQuizzes,
                                        icon: 'ClipboardCheck',
                                        color: 'from-purple-500 to-indigo-500',
                                        bgGlow: 'shadow-purple-500/20',
                                    },
                                    {
                                        label: 'Avg. Score',
                                        value: `${progressData.overallAverage}%`,
                                        icon: 'Target',
                                        color: progressData.overallAverage >= 70
                                            ? 'from-emerald-500 to-teal-500'
                                            : 'from-yellow-500 to-orange-500',
                                        bgGlow: progressData.overallAverage >= 70
                                            ? 'shadow-emerald-500/20'
                                            : 'shadow-yellow-500/20',
                                    },
                                    {
                                        label: 'Subjects',
                                        value: progressData.totalSubjects,
                                        icon: 'BookMarked',
                                        color: 'from-pink-500 to-rose-500',
                                        bgGlow: 'shadow-pink-500/20',
                                    },
                                    {
                                        label: 'Time Spent',
                                        value: formatTime(progressData.totalTime),
                                        icon: 'Clock',
                                        color: 'from-blue-500 to-cyan-500',
                                        bgGlow: 'shadow-blue-500/20',
                                    },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className={`bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-lg ${stat.bgGlow} hover:border-white/10 transition-all duration-300`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                                            <Icon name={stat.icon} size={20} className="text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Subject Breakdown */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mb-8"
                            >
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <Icon name="Layers" size={20} className="text-purple-400" />
                                    Subject Breakdown
                                </h2>
                                <div className="space-y-3">
                                    {progressData.subjects.map((subj, index) => (
                                        <motion.div
                                            key={subj.subject}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                        >
                                            <div
                                                className={`bg-gray-900/50 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${expandedSubject === subj.subject
                                                        ? 'border-purple-500/40 shadow-lg shadow-purple-500/10'
                                                        : 'border-white/5 hover:border-white/10'
                                                    }`}
                                                onClick={() =>
                                                    setExpandedSubject(
                                                        expandedSubject === subj.subject ? null : subj.subject
                                                    )
                                                }
                                            >
                                                {/* Subject Header */}
                                                <div className="p-5 flex items-center gap-4">
                                                    <div
                                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getSubjectColor(index)} flex items-center justify-center shadow-lg flex-shrink-0`}
                                                    >
                                                        <Icon name={getSubjectIcon(subj.subject)} size={24} className="text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h3 className="font-semibold text-white text-lg truncate">
                                                                {subj.subject}
                                                            </h3>
                                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                                <span className={`text-lg font-bold ${getScoreColor(subj.averageScore)}`}>
                                                                    {subj.averageScore}%
                                                                </span>
                                                                <Icon
                                                                    name={expandedSubject === subj.subject ? 'ChevronUp' : 'ChevronDown'}
                                                                    size={18}
                                                                    className="text-gray-400"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-gray-400">
                                                            <span>{subj.totalQuizzes} quiz{subj.totalQuizzes !== 1 ? 'zes' : ''}</span>
                                                            <span>·</span>
                                                            <span>{subj.modulesCompleted} module{subj.modulesCompleted !== 1 ? 's' : ''}</span>
                                                            <span>·</span>
                                                            <span>{subj.passRate}% pass rate</span>
                                                        </div>
                                                        {/* Score bar */}
                                                        <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${subj.averageScore}%` }}
                                                                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                                                                className={`h-full bg-gradient-to-r ${getScoreBarColor(subj.averageScore)} rounded-full`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Expanded Module Details */}
                                                <AnimatePresence>
                                                    {expandedSubject === subj.subject && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-5 pb-5 border-t border-white/5 pt-4">
                                                                {/* Stats grid */}
                                                                <div className="grid grid-cols-3 gap-3 mb-4">
                                                                    <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                                                                        <div className="text-lg font-bold text-white">{subj.totalCorrect}</div>
                                                                        <div className="text-xs text-gray-400">Correct</div>
                                                                    </div>
                                                                    <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                                                                        <div className="text-lg font-bold text-white">{subj.totalQuestions}</div>
                                                                        <div className="text-xs text-gray-400">Questions</div>
                                                                    </div>
                                                                    <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                                                                        <div className="text-lg font-bold text-white">{formatTime(subj.totalTime)}</div>
                                                                        <div className="text-xs text-gray-400">Time</div>
                                                                    </div>
                                                                </div>

                                                                {/* Module-level attempts */}
                                                                <h4 className="text-sm font-medium text-gray-300 mb-2">Quiz Attempts</h4>
                                                                <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                                                                    {subj.attempts.map((attempt, aIdx) => (
                                                                        <div
                                                                            key={attempt.id || aIdx}
                                                                            className="flex items-center justify-between bg-gray-800/30 rounded-lg px-3 py-2.5"
                                                                        >
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className="text-sm text-white truncate">
                                                                                    {attempt.module_title}
                                                                                </div>
                                                                                <div className="text-xs text-gray-500">
                                                                                    {formatDate(attempt.created_at)}
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                                                <span className={`text-sm font-semibold ${getScoreColor(Number(attempt.score))}`}>
                                                                                    {Math.round(Number(attempt.score))}%
                                                                                </span>
                                                                                {attempt.passed ? (
                                                                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                                                                                        Passed
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded-full border border-red-500/20">
                                                                                        Failed
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Recent Activity */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <Icon name="Activity" size={20} className="text-purple-400" />
                                    Recent Activity
                                </h2>
                                <div className="bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
                                    {/* Table Header */}
                                    <div className="hidden sm:grid grid-cols-12 gap-3 px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-white/5">
                                        <div className="col-span-3">Subject</div>
                                        <div className="col-span-4">Module</div>
                                        <div className="col-span-2 text-center">Score</div>
                                        <div className="col-span-1 text-center">Status</div>
                                        <div className="col-span-2 text-right">When</div>
                                    </div>
                                    {/* Table Rows */}
                                    {progressData.recentAttempts.map((attempt, index) => (
                                        <motion.div
                                            key={attempt.id || index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.6 + index * 0.05 }}
                                            className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 px-5 py-3.5 items-center hover:bg-white/[0.02] transition-colors ${index < progressData.recentAttempts.length - 1
                                                    ? 'border-b border-white/5'
                                                    : ''
                                                }`}
                                        >
                                            {/* Mobile layout labels */}
                                            <div className="col-span-1 sm:col-span-3 flex items-center gap-2">
                                                <span className="sm:hidden text-xs text-gray-500 w-16">Subject</span>
                                                <span className="text-sm text-purple-300 font-medium">{attempt.subject}</span>
                                            </div>
                                            <div className="col-span-1 sm:col-span-4 flex items-center gap-2">
                                                <span className="sm:hidden text-xs text-gray-500 w-16">Module</span>
                                                <span className="text-sm text-gray-300 truncate">{attempt.module_title}</span>
                                            </div>
                                            <div className="col-span-1 sm:col-span-2 flex items-center gap-2 sm:justify-center">
                                                <span className="sm:hidden text-xs text-gray-500 w-16">Score</span>
                                                <span className={`text-sm font-bold ${getScoreColor(Number(attempt.score))}`}>
                                                    {Math.round(Number(attempt.score))}%
                                                </span>
                                            </div>
                                            <div className="col-span-1 sm:col-span-1 flex items-center gap-2 sm:justify-center">
                                                <span className="sm:hidden text-xs text-gray-500 w-16">Status</span>
                                                {attempt.passed ? (
                                                    <Icon name="CheckCircle" size={16} className="text-emerald-400" />
                                                ) : (
                                                    <Icon name="XCircle" size={16} className="text-red-400" />
                                                )}
                                            </div>
                                            <div className="col-span-1 sm:col-span-2 flex items-center gap-2 sm:justify-end">
                                                <span className="sm:hidden text-xs text-gray-500 w-16">When</span>
                                                <span className="text-xs text-gray-500">{formatDate(attempt.created_at)}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProgressPage;
