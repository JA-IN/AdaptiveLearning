// ─────────────────────────────────────────────────────────
// B.Tech CSE — 1st Semester Syllabus
// ─────────────────────────────────────────────────────────
// TODO: Paste your 1st semester syllabus here and it will
//       be structured like 3rd-sem.js
//
// Subjects expected:
//   - Mathematics-1
//   - BEE (Basic Electrical Engineering)
//   - Physics

export const firstSemSyllabus = {
    "Mathematics-1": {
        code: "",
        title: "Mathematics-1",
        credits: null,
        modules: [],
    },
    BEE: {
        code: "",
        title: "Basic Electrical Engineering",
        credits: 4,
        structure: "3L:1T:0P",
        modules: [
            {
                name: "DC Circuits",
                number: 1,
                hours: 9,
                topics: [
                    "Electrical circuit elements (R, L and C)",
                    "Voltage and current sources",
                    "Kirchhoff's current and voltage laws",
                    "Analysis of simple circuits with dc excitation",
                    "Superposition, Thevenin's and Norton's Theorems",
                    "Time-domain analysis of first-order RL and RC circuits"
                ]
            },
            {
                name: "AC Circuits",
                number: 2,
                hours: 9,
                topics: [
                    "Representation of sinusoidal waveforms",
                    "Peak and RMS values, phasor representation",
                    "Real power, reactive power, apparent power, power factor",
                    "Analysis of single-phase ac circuits consisting of R, L, C, RL, RC, RLC combinations (series and parallel)",
                    "Resonance",
                    "Three-phase balanced circuits, voltage and current relations in star and delta connections"
                ]
            },
            {
                name: "Electrical Machines",
                number: 3,
                hours: 16,
                topics: [
                    "Magnetic materials, BH characteristics",
                    "Ideal and practical transformer, equivalent circuit",
                    "Losses in transformers, regulation and efficiency",
                    "Auto-transformer and three-phase transformer connections",
                    "Generation of rotating magnetic fields",
                    "Construction and working of a three-phase induction motor",
                    "Significance of torque-slip characteristic",
                    "Loss components and efficiency, starting and speed control of induction motor",
                    "Single-phase induction motor",
                    "Construction, working, torque-speed characteristic and speed control of separately excited dc motor",
                    "Construction and working of synchronous generators"
                ]
            },
            {
                name: "Electrical Installations",
                number: 4,
                hours: 7,
                topics: [
                    "Components of LT Switchgear: Switch Fuse Unit (SFU)",
                    "Miniature Circuit Breaker (MCB)",
                    "Earth Leakage Circuit Breaker (ELCB), MCCB",
                    "Contactors, Types of Wires and Cables, Earthing",
                    "Types of Batteries, Important Characteristics for Batteries",
                    "Elementary calculations for energy consumption, power factor improvement and battery backup"
                ]
            }
        ]
    },
    Physics: {
        code: "BTPH101-23",
        title: "Engineering Physics",
        credits: 4,
        structure: "L-3, T-1, P-0",
        modules: [
            {
                name: "Elements of Crystallography",
                number: 1,
                hours: 5,
                topics: [
                    "Unit cell, Basis, Space lattice, Crystal Systems",
                    "Miller Indices of Planes and directions",
                    "Bonding in solids, origin of bands in solids (Qualitative idea)",
                    "Metals, semiconductors & insulators",
                    "Continuous & Characteristic X-Rays, X-Ray Diffraction & Bragg's law in Crystals",
                    "Bragg's spectrometer"
                ]
            },
            {
                name: "Semiconductor Materials",
                number: 2,
                hours: 5,
                topics: [
                    "Intrinsic and extrinsic semiconductors, p-type, and n-type semiconductors",
                    "Fermi level in semiconductors",
                    "Continuous and characteristic conductors, I-V characteristics of p-n junction diode",
                    "Some special p-n diodes: Zener diode, Tunnel diode, Photo diode, and Light emitting diode"
                ]
            },
            {
                name: "Magnetic Materials & Superconductivity",
                number: 3,
                hours: 5,
                topics: [
                    "Basic ideas of Dia, Para, Ferro & Ferrimagnetic materials",
                    "Ferrites, Hysteresis loop, Magnetic Anisotropy, Superconductivity",
                    "Superconductors as ideal diamagnetic materials",
                    "Signatures of Superconducting state, Meissner Effect, Type I & Type II superconductors, London Equations"
                ]
            },
            {
                name: "EM Waves & Dielectrics",
                number: 4,
                hours: 5,
                topics: [
                    "Physical significance of Gradient, Divergence & Curl",
                    "Relationship between Electric Field & Potential, Dielectric polarization, Displacement current",
                    "Maxwell's Equations",
                    "Electromagnetic wave propagation in free space and isotropic dielectric medium",
                    "Poynting vector, Electromagnetic Spectrum (Basic ideas of different region)"
                ]
            },
            {
                name: "Quantum Theory",
                number: 5,
                hours: 5,
                topics: [
                    "Need and origin of quantum concept",
                    "Wave-particle duality, Matter waves, Group & Phase velocities",
                    "Wave function and Born interpretation",
                    "Uncertainty Principle",
                    "Schrodinger wave equations (time independent & dependent)",
                    "Application to particle in a box"
                ]
            },
            {
                name: "Lasers",
                number: 6,
                hours: 5,
                topics: [
                    "Concepts of laser, Spontaneous & Stimulated emissions",
                    "Einstein's Coefficients, Population Inversion, Pumping Mechanisms",
                    "Components of a laser System, Three & four level laser systems",
                    "Ruby, He-Ne, and semiconductor Lasers",
                    "Introduction to Holography"
                ]
            },
            {
                name: "Fibre Optics",
                number: 7,
                hours: 5,
                topics: [
                    "Introduction, Acceptance Angle, Numerical Aperture, Normalized frequency",
                    "Modes of propagation, material dispersion & pulse broadening in optical fibres",
                    "Fibre connectors, splices and couplers",
                    "Applications of optical fibres"
                ]
            },
            {
                name: "Nanomaterials",
                number: 8,
                hours: 5,
                topics: [
                    "Nanoscale, Classifications of nanomaterials (3D, 2D, 1D and 0D)",
                    "Electron confinement, Nanocomposites, Carbon nanotubes (CNTs)",
                    "Properties of nanomaterials, synthesis of nanomaterials (ball milling and sol-gel techniques)",
                    "Basic characterization techniques for nanomaterials",
                    "Applications of nanomaterials"
                ]
            }
        ]
    },
};
