// Quiz questions for first 5 models of each subject (Physics, Chemistry, Biology)

export const quizData = {
  // Physics Quizzes
  physics: {
    decoration: {
      // Newton's Cradle
      questions: [
        {
          id: 1,
          question: "What principle does Newton's Cradle demonstrate?",
          options: [
            "Conservation of momentum and energy",
            "Conservation of mass",
            "Thermal expansion",
            "Electromagnetic induction",
          ],
          correctAnswer: 0,
        },
        {
          id: 2,
          question:
            "When one ball is lifted and released, what happens to the ball on the opposite end?",
          options: [
            "It remains stationary",
            "It swings out with similar energy",
            "It moves slightly backward",
            "It moves in a circular motion",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What type of collision occurs in Newton's Cradle?",
          options: [
            "Inelastic collision",
            "Perfectly elastic collision",
            "Partially elastic collision",
            "Explosive collision",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What happens to the middle balls during momentum transfer?",
          options: [
            "They swing violently",
            "They remain relatively stationary",
            "They move upward",
            "They rotate",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "Which law of motion is primarily illustrated by Newton's Cradle?",
          options: [
            "First law (Inertia)",
            "Second law (F=ma)",
            "Third law (Action-Reaction)",
            "All of the above",
          ],
          correctAnswer: 3,
        },
      ],
    },

    prism: {
      // Reflection & Refraction Prism
      questions: [
        {
          id: 1,
          question: "What phenomenon causes white light to separate into colors in a prism?",
          options: ["Reflection", "Dispersion", "Diffraction", "Polarization"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Which law governs the refraction of light through a prism?",
          options: [
            "Newton's law",
            "Ohm's law",
            "Snell's law",
            "Hooke's law",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question:
            "What happens to light when it passes from air into the prism?",
          options: [
            "It speeds up and bends away from normal",
            "It slows down and bends toward normal",
            "It maintains constant speed",
            "It gets absorbed completely",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question:
            "At what angle can total internal reflection occur in a prism?",
          options: [
            "Any angle",
            "At critical angle and beyond",
            "Only at 90 degrees",
            "Only at 45 degrees",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "Which optical device uses prisms for their operation?",
          options: [
            "Microscope only",
            "Telescope only",
            "Periscope and binoculars",
            "Camera lens only",
          ],
          correctAnswer: 2,
        },
      ],
    },

    figure121: {
      // Electric Circuit
      questions: [
        {
          id: 1,
          question: "What is Ohm's Law?",
          options: [
            "V = I × R",
            "P = V × I",
            "E = mc²",
            "F = ma",
          ],
          correctAnswer: 0,
        },
        {
          id: 2,
          question:
            "In a series circuit, what remains constant throughout the circuit?",
          options: [
            "Voltage",
            "Current",
            "Resistance",
            "Power",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What does a resistor do in an electric circuit?",
          options: [
            "Stores electrical energy",
            "Opposes the flow of current",
            "Increases voltage",
            "Generates electricity",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question:
            "Which component stores electrical energy in an electric field?",
          options: [
            "Resistor",
            "Inductor",
            "Capacitor",
            "Transistor",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "What is Kirchhoff's Current Law?",
          options: [
            "Current in equals current out at a junction",
            "Voltage increases with resistance",
            "Power equals voltage times current",
            "Resistance increases with temperature",
          ],
          correctAnswer: 0,
        },
      ],
    },

    figure1010: {
      // Refraction of Light
      questions: [
        {
          id: 1,
          question: "What is refraction of light?",
          options: [
            "Bouncing back of light",
            "Bending of light when passing between different media",
            "Absorption of light",
            "Splitting of light into colors",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question:
            "What is the refractive index of a medium?",
          options: [
            "Speed of light in vacuum / Speed of light in medium",
            "Speed of light in medium / Speed of light in vacuum",
            "Angle of incidence / Angle of refraction",
            "Wavelength in vacuum / Wavelength in medium",
          ],
          correctAnswer: 0,
        },
        {
          id: 3,
          question:
            "When light travels from air to glass, what happens to its speed?",
          options: [
            "Increases",
            "Decreases",
            "Remains constant",
            "Becomes zero",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "Which device works on the principle of refraction?",
          options: [
            "Plane mirror",
            "Convex lens",
            "Flat glass plate",
            "Concave mirror",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question:
            "What causes objects underwater to appear at a different depth?",
          options: [
            "Reflection",
            "Refraction",
            "Diffraction",
            "Interference",
          ],
          correctAnswer: 1,
        },
      ],
    },

    figure102: {
      // Concave and Convex Mirror
      questions: [
        {
          id: 1,
          question: "What type of image does a convex mirror always form?",
          options: [
            "Real and inverted",
            "Virtual, upright, and diminished",
            "Real and magnified",
            "Virtual and magnified",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Where is a concave mirror used in daily life?",
          options: [
            "Car side mirrors",
            "Shaving mirrors",
            "Store security mirrors",
            "Street corner mirrors",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What is the focal length of a plane mirror?",
          options: ["Zero", "Infinite", "Equal to radius of curvature", "Negative"],
          correctAnswer: 1,
        },
        {
          id: 4,
          question:
            "A concave mirror can form which type of image?",
          options: [
            "Only virtual images",
            "Only real images",
            "Both real and virtual images",
            "Neither real nor virtual",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "Why are convex mirrors used as rear-view mirrors in vehicles?",
          options: [
            "They magnify objects",
            "They provide a wider field of view",
            "They form real images",
            "They are cheaper",
          ],
          correctAnswer: 1,
        },
      ],
    },
  },

  // Chemistry Quizzes
  chemistry: {
    waterBallStick: {
      questions: [
        {
          id: 1,
          question: "What is the bond angle in a water molecule?",
          options: ["90°", "104.5°", "109.5°", "180°"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Why does the water molecule have a bent shape?",
          options: [
            "Due to single bonds only",
            "Due to two lone pairs on oxygen repelling bonding pairs",
            "Due to hydrogen bonding",
            "Due to equal electronegativity",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What does the ball-and-stick model represent?",
          options: [
            "Only bond angles",
            "Atoms as balls and bonds as sticks showing geometry",
            "Electron cloud distribution",
            "Nuclear structure only",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What creates the dipole moment in water?",
          options: [
            "Equal charge distribution",
            "The bent shape and difference in electronegativity",
            "Metallic bonding",
            "Hydrogen atoms being larger than oxygen",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What is the electron geometry around the oxygen atom in water?",
          options: [
            "Linear",
            "Trigonal planar",
            "Tetrahedral",
            "Octahedral",
          ],
          correctAnswer: 2,
        },
      ],
    },

    atom: {
      // Atomic Structure
      questions: [
        {
          id: 1,
          question: "What is located in the nucleus of an atom?",
          options: [
            "Protons and electrons",
            "Protons and neutrons",
            "Neutrons and electrons",
            "Only protons",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What determines the atomic number of an element?",
          options: [
            "Number of neutrons",
            "Number of protons",
            "Number of electrons",
            "Total mass",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "Which subatomic particle has a negative charge?",
          options: ["Proton", "Neutron", "Electron", "Nucleus"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "What are isotopes?",
          options: [
            "Atoms with same protons but different neutrons",
            "Atoms with same neutrons but different protons",
            "Atoms with same electrons but different protons",
            "Completely different elements",
          ],
          correctAnswer: 0,
        },
        {
          id: 5,
          question: "Where are electrons located in an atom?",
          options: [
            "In the nucleus",
            "In energy levels/shells around nucleus",
            "Between protons and neutrons",
            "Outside the atom",
          ],
          correctAnswer: 1,
        },
      ],
    },

    cyclohexane: {
      questions: [
        {
          id: 1,
          question: "What is the molecular formula of cyclohexane?",
          options: ["C₆H₆", "C₆H₁₂", "C₆H₁₀", "C₆H₁₄"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Why does cyclohexane adopt a chair conformation?",
          options: [
            "To increase ring strain",
            "To minimize steric strain and achieve optimal bond angles",
            "Because it is aromatic",
            "Due to double bonds in the ring",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What are the two types of hydrogen positions in chair cyclohexane?",
          options: [
            "Cis and trans",
            "Axial and equatorial",
            "Alpha and beta",
            "Primary and secondary",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "Which position is generally more stable for substituents on cyclohexane?",
          options: [
            "Axial",
            "Equatorial",
            "Both are equally stable",
            "Neither is stable",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "Cyclohexane is an example of which type of hydrocarbon?",
          options: [
            "Aromatic",
            "Cycloalkane (saturated cyclic)",
            "Alkene",
            "Alkyne",
          ],
          correctAnswer: 1,
        },
      ],
    },

    orbitalF: {
      questions: [
        {
          id: 1,
          question: "What is the minimum principal quantum number (n) for f orbitals to exist?",
          options: ["n = 1", "n = 2", "n = 3", "n = 4"],
          correctAnswer: 3,
        },
        {
          id: 2,
          question: "How many f orbitals are there in a given subshell?",
          options: ["3", "5", "7", "9"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "What is the maximum number of electrons f orbitals can hold?",
          options: ["6", "10", "14", "18"],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "Which block of elements in the periodic table involves f orbitals?",
          options: [
            "s-block",
            "p-block",
            "d-block",
            "f-block (lanthanides and actinides)",
          ],
          correctAnswer: 3,
        },
        {
          id: 5,
          question: "What is the azimuthal quantum number (l) for f orbitals?",
          options: ["0", "1", "2", "3"],
          correctAnswer: 3,
        },
      ],
    },

    orbitalDxz: {
      questions: [
        {
          id: 1,
          question: "How many d orbitals exist in a given subshell?",
          options: ["3", "5", "7", "9"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What is the azimuthal quantum number (l) for d orbitals?",
          options: ["0", "1", "2", "3"],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "What causes d orbital splitting in transition metal complexes?",
          options: [
            "Temperature changes",
            "Interaction with ligands (crystal field effect)",
            "Nuclear decay",
            "Gravitational forces",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What is the maximum number of electrons all five d orbitals can hold?",
          options: ["6", "8", "10", "14"],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "The Dxz orbital has lobes oriented along which axes?",
          options: [
            "x and y axes",
            "x and z axes",
            "y and z axes",
            "Along all three axes",
          ],
          correctAnswer: 1,
        },
      ],
    },

    benzene: {
      // Benzene Molecule
      questions: [
        {
          id: 1,
          question: "What is the molecular formula of benzene?",
          options: ["C₆H₆", "C₆H₁₂", "C₆H₁₄", "C₆H₈"],
          correctAnswer: 0,
        },
        {
          id: 2,
          question: "What type of structure does benzene have?",
          options: [
            "Linear chain",
            "Hexagonal ring with resonance",
            "Tetrahedral",
            "Octahedral",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "Why is benzene more stable than expected?",
          options: [
            "Due to resonance and electron delocalization",
            "Due to ionic bonding",
            "Due to hydrogen bonding",
            "Due to high molecular weight",
          ],
          correctAnswer: 0,
        },
        {
          id: 4,
          question: "What type of compound is benzene?",
          options: [
            "Aliphatic hydrocarbon",
            "Aromatic hydrocarbon",
            "Alcohol",
            "Carboxylic acid",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "Which reaction is typical for benzene?",
          options: [
            "Addition reaction",
            "Substitution reaction",
            "Elimination reaction",
            "Polymerization",
          ],
          correctAnswer: 1,
        },
      ],
    },

    water: {
      // Water Molecule (H₂O)
      questions: [
        {
          id: 1,
          question: "What is the bond angle in a water molecule?",
          options: ["90°", "104.5°", "109.5°", "180°"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What type of molecular geometry does water have?",
          options: ["Linear", "Bent", "Tetrahedral", "Trigonal planar"],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "Why is water called a universal solvent?",
          options: [
            "It dissolves all substances",
            "Its polarity allows it to dissolve many ionic and polar compounds",
            "It has high boiling point",
            "It is abundant",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What type of bonding exists between water molecules?",
          options: [
            "Ionic bonding",
            "Covalent bonding",
            "Hydrogen bonding",
            "Metallic bonding",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "At what temperature does water have maximum density?",
          options: ["0°C", "4°C", "100°C", "25°C"],
          correctAnswer: 1,
        },
      ],
    },

    atomicModel: {
      // Atomic Model
      questions: [
        {
          id: 1,
          question: "Who proposed the plum pudding model of the atom?",
          options: [
            "John Dalton",
            "J.J. Thomson",
            "Ernest Rutherford",
            "Niels Bohr",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What did Rutherford's gold foil experiment prove?",
          options: [
            "Atoms are indivisible",
            "Atoms have a small, dense, positive nucleus",
            "Electrons orbit in fixed shells",
            "Atoms are electrically neutral",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "According to Bohr's model, electrons move in:",
          options: [
            "Random paths",
            "Fixed circular orbits with specific energy levels",
            "Straight lines",
            "Spiral paths",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What is the modern atomic model based on?",
          options: [
            "Classical mechanics",
            "Quantum mechanics",
            "Thermodynamics",
            "Relativity",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What are electron orbitals?",
          options: [
            "Fixed circular paths",
            "Regions where electrons are most likely to be found",
            "Paths electrons must follow",
            "Energy levels only",
          ],
          correctAnswer: 1,
        },
      ],
    },

    molecule: {
      // Molecular Structure
      questions: [
        {
          id: 1,
          question: "What is a molecule?",
          options: [
            "A single atom",
            "Two or more atoms bonded together",
            "A subatomic particle",
            "An ion",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What does VSEPR theory predict?",
          options: [
            "Atomic mass",
            "Molecular geometry based on electron repulsion",
            "Reaction rates",
            "Melting points",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What type of bond involves sharing of electrons?",
          options: [
            "Ionic bond",
            "Covalent bond",
            "Metallic bond",
            "Hydrogen bond",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "Which intermolecular force is the strongest?",
          options: [
            "London dispersion forces",
            "Dipole-dipole interactions",
            "Hydrogen bonding",
            "Van der Waals forces",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "What determines the shape of a molecule?",
          options: [
            "Number of atoms only",
            "Electron pair geometry and bonding",
            "Temperature",
            "Pressure",
          ],
          correctAnswer: 1,
        },
      ],
    },
  },

  // Biology Quizzes
  biology: {
    neuron: {
      questions: [
        {
          id: 1,
          question: "What part of the neuron receives signals from other neurons?",
          options: ["Axon", "Dendrites", "Cell body", "Myelin sheath"],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What is the function of the axon?",
          options: [
            "Receive incoming signals",
            "Transmit electrical impulses away from the cell body",
            "Produce neurotransmitters only",
            "Store genetic material",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "How do neurons communicate with each other?",
          options: [
            "Direct physical contact",
            "Through neurotransmitters at synapses",
            "Through blood vessels",
            "Through hormones only",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What is the gap between two neurons called?",
          options: [
            "Axon terminal",
            "Synapse",
            "Node of Ranvier",
            "Dendrite junction",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What does the myelin sheath do?",
          options: [
            "Produces neurotransmitters",
            "Insulates the axon and speeds up signal transmission",
            "Receives signals from other neurons",
            "Stores nutrients for the neuron",
          ],
          correctAnswer: 1,
        },
      ],
    },

    humanBrain: {
      questions: [
        {
          id: 1,
          question: "Which part of the brain is responsible for decision-making and reasoning?",
          options: [
            "Cerebellum",
            "Frontal lobe",
            "Brainstem",
            "Occipital lobe",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What does the cerebellum control?",
          options: [
            "Memory and emotions",
            "Balance and coordination",
            "Vision and hearing",
            "Breathing and heart rate",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "Which brain region controls involuntary functions like breathing?",
          options: [
            "Cerebrum",
            "Cerebellum",
            "Brainstem",
            "Temporal lobe",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "Which lobe of the brain processes visual information?",
          options: [
            "Frontal lobe",
            "Parietal lobe",
            "Temporal lobe",
            "Occipital lobe",
          ],
          correctAnswer: 3,
        },
        {
          id: 5,
          question: "What is the largest part of the human brain?",
          options: [
            "Cerebellum",
            "Brainstem",
            "Cerebrum",
            "Hypothalamus",
          ],
          correctAnswer: 2,
        },
      ],
    },

    digestiveSystem: {
      questions: [
        {
          id: 1,
          question: "Where does most nutrient absorption take place?",
          options: [
            "Stomach",
            "Small intestine",
            "Large intestine",
            "Esophagus",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What is the role of villi in the small intestine?",
          options: [
            "Produce digestive enzymes",
            "Increase surface area for absorption",
            "Store bile",
            "Break down fats mechanically",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "Which organ produces bile to help digest fats?",
          options: [
            "Stomach",
            "Pancreas",
            "Liver",
            "Small intestine",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "What type of digestion occurs when you chew food?",
          options: [
            "Chemical digestion",
            "Mechanical digestion",
            "Enzymatic digestion",
            "Bacterial digestion",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What does the stomach use to break down food chemically?",
          options: [
            "Bile",
            "Hydrochloric acid and pepsin",
            "Insulin",
            "Saliva",
          ],
          correctAnswer: 1,
        },
      ],
    },

    heartLungs: {
      questions: [
        {
          id: 1,
          question: "What is the primary function of the lungs?",
          options: [
            "Pumping blood",
            "Gas exchange (oxygen in, carbon dioxide out)",
            "Filtering toxins",
            "Producing hormones",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Where does gas exchange occur in the lungs?",
          options: [
            "Bronchi",
            "Trachea",
            "Alveoli",
            "Pharynx",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "What type of blood does the pulmonary artery carry?",
          options: [
            "Oxygenated blood",
            "Deoxygenated blood",
            "Mixed blood",
            "Plasma only",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "Which side of the heart pumps blood to the lungs?",
          options: [
            "Left side",
            "Right side",
            "Both sides equally",
            "Neither, the lungs pump their own blood",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What is pulmonary circulation?",
          options: [
            "Blood flow from heart to body and back",
            "Blood flow between heart and lungs for gas exchange",
            "Blood flow within the brain",
            "Blood flow through the digestive system",
          ],
          correctAnswer: 1,
        },
      ],
    },

    cellModel: {
      // Cell Model - Basic Structure
      questions: [
        {
          id: 1,
          question: "What is the basic unit of life?",
          options: ["Tissue", "Organ", "Cell", "Organism"],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "What is the function of the cell membrane?",
          options: [
            "Produces energy",
            "Controls what enters and exits the cell",
            "Stores genetic information",
            "Synthesizes proteins",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "Which organelle is known as the powerhouse of the cell?",
          options: [
            "Nucleus",
            "Ribosome",
            "Mitochondria",
            "Chloroplast",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "Where is genetic material (DNA) stored in a cell?",
          options: [
            "Cytoplasm",
            "Nucleus",
            "Cell membrane",
            "Ribosome",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What is cytoplasm?",
          options: [
            "The cell's outer covering",
            "The jelly-like substance inside the cell",
            "The genetic material",
            "The energy producer",
          ],
          correctAnswer: 1,
        },
      ],
    },

    plantCell: {
      // Plant Cell Structure
      questions: [
        {
          id: 1,
          question: "What structure is unique to plant cells?",
          options: [
            "Nucleus",
            "Cell wall",
            "Cell membrane",
            "Mitochondria",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What is the function of chloroplasts?",
          options: [
            "Cell division",
            "Photosynthesis",
            "Protein synthesis",
            "Energy storage",
          ],
          correctAnswer: 1,
        },
        {
          id: 3,
          question: "What does the large central vacuole in plant cells store?",
          options: [
            "DNA",
            "Proteins",
            "Water and nutrients",
            "Lipids",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "What is the cell wall made of in plants?",
          options: [
            "Protein",
            "Cellulose",
            "Lipids",
            "Chitin",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "What pigment in chloroplasts gives plants their green color?",
          options: [
            "Carotene",
            "Xanthophyll",
            "Chlorophyll",
            "Anthocyanin",
          ],
          correctAnswer: 2,
        },
      ],
    },

    animalCell: {
      // Animal Cell Structure
      questions: [
        {
          id: 1,
          question: "What structure do animal cells have that plant cells lack?",
          options: [
            "Cell wall",
            "Centrioles",
            "Chloroplasts",
            "Large central vacuole",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "What organelle contains digestive enzymes in animal cells?",
          options: [
            "Lysosome",
            "Ribosome",
            "Mitochondria",
            "Golgi apparatus",
          ],
          correctAnswer: 0,
        },
        {
          id: 3,
          question: "What is the function of mitochondria?",
          options: [
            "Protein synthesis",
            "Cellular respiration and ATP production",
            "Photosynthesis",
            "Cell division",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What do ribosomes synthesize?",
          options: [
            "Lipids",
            "Carbohydrates",
            "Proteins",
            "DNA",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "Why don't animal cells have a cell wall?",
          options: [
            "They don't need protection",
            "They need flexibility for movement",
            "They are too small",
            "They have thick cell membranes instead",
          ],
          correctAnswer: 1,
        },
      ],
    },

    humanCell: {
      // Human Cell
      questions: [
        {
          id: 1,
          question: "Approximately how many cells are in the human body?",
          options: [
            "1 million",
            "100 million",
            "37 trillion",
            "1 billion",
          ],
          correctAnswer: 2,
        },
        {
          id: 2,
          question: "What is the most common type of cell in the human body?",
          options: [
            "Nerve cell",
            "Muscle cell",
            "Red blood cell",
            "Skin cell",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "What maintains homeostasis in human cells?",
          options: [
            "Random processes",
            "Coordinated regulation of cellular processes",
            "External temperature only",
            "Diet alone",
          ],
          correctAnswer: 1,
        },
        {
          id: 4,
          question: "What happens when human cells malfunction?",
          options: [
            "Nothing significant",
            "They automatically repair themselves",
            "Can lead to diseases",
            "They become stronger",
          ],
          correctAnswer: 2,
        },
        {
          id: 5,
          question: "What do human cells use for energy?",
          options: [
            "Sunlight",
            "ATP (Adenosine triphosphate)",
            "Water",
            "Oxygen alone",
          ],
          correctAnswer: 1,
        },
      ],
    },

    prokaryoteCell: {
      // Prokaryotic Cell
      questions: [
        {
          id: 1,
          question: "What is the main difference between prokaryotic and eukaryotic cells?",
          options: [
            "Size only",
            "Prokaryotes lack a membrane-bound nucleus",
            "Prokaryotes are larger",
            "Prokaryotes have more organelles",
          ],
          correctAnswer: 1,
        },
        {
          id: 2,
          question: "Which organisms are prokaryotes?",
          options: [
            "Plants and animals",
            "Fungi and plants",
            "Bacteria and archaea",
            "Protists and fungi",
          ],
          correctAnswer: 2,
        },
        {
          id: 3,
          question: "How do prokaryotes reproduce?",
          options: [
            "Meiosis",
            "Mitosis",
            "Binary fission",
            "Budding only",
          ],
          correctAnswer: 2,
        },
        {
          id: 4,
          question: "What structure helps prokaryotes move?",
          options: [
            "Cilia",
            "Flagella",
            "Pseudopodia",
            "Fins",
          ],
          correctAnswer: 1,
        },
        {
          id: 5,
          question: "Where is DNA located in prokaryotic cells?",
          options: [
            "In the nucleus",
            "In mitochondria",
            "Freely in the cytoplasm (nucleoid region)",
            "In chloroplasts",
          ],
          correctAnswer: 2,
        },
      ],
    },
  },
};

// Helper function to get quiz by subject and model ID
export const getQuizByModel = (subject, modelId) => {
  return quizData[subject]?.[modelId] || null;
};

// Helper function to check if a model has a quiz
export const hasQuiz = (subject, modelId) => {
  return quizData[subject]?.[modelId] !== undefined;
};
