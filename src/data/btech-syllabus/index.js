// ─────────────────────────────────────────────────────────
// B.Tech CSE — Combined Syllabus Index
// ─────────────────────────────────────────────────────────
// Single import point for all semester syllabi

export { firstSemSyllabus } from "./1st-sem";
export { secondSemSyllabus } from "./2nd-sem";
export { thirdSemSyllabus } from "./3rd-sem";

// Helper: get syllabus for a subject by name (searches all semesters)
import { firstSemSyllabus } from "./1st-sem";
import { secondSemSyllabus } from "./2nd-sem";
import { thirdSemSyllabus } from "./3rd-sem";

const allSyllabi = {
    ...firstSemSyllabus,
    ...secondSemSyllabus,
    ...thirdSemSyllabus,
};

/**
 * Get structured syllabus for a B.Tech subject by name.
 * @param {string} subjectName - e.g. "DSA", "OOPS", "Mathematics-1"
 * @returns {object|null} The syllabus object or null if not found
 */
export function getSyllabus(subjectName) {
    return allSyllabi[subjectName] || null;
}

/**
 * Get all topic names for a subject (flattened from all modules).
 * @param {string} subjectName
 * @returns {string[]} Array of topic strings
 */
export function getAllTopics(subjectName) {
    const syllabus = getSyllabus(subjectName);
    if (!syllabus) return [];
    return syllabus.modules.flatMap((mod) => mod.topics || []);
}

/**
 * Get module names for a subject.
 * @param {string} subjectName
 * @returns {string[]} Array of module name strings
 */
export function getModuleNames(subjectName) {
    const syllabus = getSyllabus(subjectName);
    if (!syllabus) return [];
    return syllabus.modules.map((mod) => mod.name);
}
