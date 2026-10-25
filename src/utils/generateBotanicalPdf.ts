import { jsPDF } from 'jspdf';
import type { Plant } from '../types';

/**
 * Generates the official 6-page Verdana Botanical Care Field Guide & Handbook PDF doc
 */
export function createCareGuidePdfDoc(): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  // Helper colors
  const forestGreen = [7, 59, 36] as [number, number, number];
  const warmAmber = [226, 139, 39] as [number, number, number];
  const creamBg = [246, 237, 226] as [number, number, number];
  const sageGreen = [138, 184, 154] as [number, number, number];
  const darkCharcoal = [30, 41, 35] as [number, number, number];
  const mutedText = [85, 100, 92] as [number, number, number];

  const addHeaderFooter = (pageNum: number, totalPages: number, pageTitle: string) => {
    // Top border line
    doc.setDrawColor(...warmAmber);
    doc.setLineWidth(0.6);
    doc.line(margin, 12, pageWidth - margin, 12);

    // Top Header text
    doc.setFont('times', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(...mutedText);
    doc.text('VERDANA BOTANICA  ·  BROOKLYN GREENHOUSE ARCHIVE', margin, 9.5);
    doc.text(pageTitle.toUpperCase(), pageWidth - margin, 9.5, { align: 'right' });

    // Bottom Footer line
    doc.setDrawColor(200, 205, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    // Bottom Footer text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...mutedText);
    doc.text('© 2026 Verdana Plants LLC  ·  Certified B-Corp  ·  Zero-Plastic Greenhouse Standard', margin, pageHeight - 7);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  };

  // -------------------------------------------------------------
  // PAGE 1: COVER PAGE
  // -------------------------------------------------------------
  // Full page elegant forest green background
  doc.setFillColor(...forestGreen);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Decorative double gold border
  doc.setDrawColor(...warmAmber);
  doc.setLineWidth(0.8);
  doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin * 2 - 8));
  doc.setLineWidth(0.3);
  doc.rect(margin - 1.5, margin - 1.5, contentWidth + 3, pageHeight - (margin * 2 - 3));

  // Botanical crest seal
  doc.setFillColor(255, 255, 255);
  doc.circle(pageWidth / 2, 48, 18, 'F');
  doc.setDrawColor(...warmAmber);
  doc.setLineWidth(1.2);
  doc.circle(pageWidth / 2, 48, 18, 'S');

  // Inner crest emblem text
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...forestGreen);
  doc.text('V', pageWidth / 2, 53, { align: 'center' });

  // Sub-badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...warmAmber);
  doc.text('EST. 2019  ·  BROOKLYN, NEW YORK', pageWidth / 2, 78, { align: 'center' });

  // Main Title
  doc.setFont('times', 'bold');
  doc.setFontSize(32);
  doc.setTextColor(246, 237, 226);
  doc.text('VERDANA BOTANICA', pageWidth / 2, 94, { align: 'center' });

  // Subtitle
  doc.setFont('times', 'italic');
  doc.setFontSize(15);
  doc.setTextColor(...sageGreen);
  doc.text("The Indoor Horticulturist's Compendium", pageWidth / 2, 105, { align: 'center' });
  doc.text('& Master Specimen Field Guide', pageWidth / 2, 112, { align: 'center' });

  // Amber separator line
  doc.setDrawColor(...warmAmber);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 35, 120, pageWidth / 2 + 35, 120);

  // Description paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(246, 237, 226);
  const coverIntro = [
    'A definitive reference for cultivating rare, architectural, and acclimatized indoor flora.',
    'Compiled by our resident horticulturists, master soil chemists, and climate curators at',
    'the Verdana Brooklyn Greenhouse & Acclimatization Center.',
  ];
  coverIntro.forEach((line, idx) => {
    doc.text(line, pageWidth / 2, 134 + idx * 6, { align: 'center' });
  });

  // Table of Contents Box
  doc.setFillColor(15, 75, 48);
  doc.roundedRect(pageWidth / 2 - 70, 160, 140, 72, 4, 4, 'F');
  doc.setDrawColor(...warmAmber);
  doc.setLineWidth(0.4);
  doc.roundedRect(pageWidth / 2 - 70, 160, 140, 72, 4, 4, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...warmAmber);
  doc.text('COMPENDIUM TABLE OF CONTENTS', pageWidth / 2, 170, { align: 'center' });

  const tocItems = [
    { sec: '01', page: '02', title: 'The Universal Light Index & Lumens Matrix' },
    { sec: '02', page: '03', title: 'Substrate Architecture & Living Soil Chemistry' },
    { sec: '03', page: '04', title: 'The 4-Season Hydration & Moisture Physics' },
    { sec: '04', page: '05', title: 'Clinical Foliar Triage & Organic Pathology' },
    { sec: '05', page: '06', title: 'Official Botanical Passport & Guarantee Terms' },
  ];

  tocItems.forEach((item, idx) => {
    const yPos = 180 + idx * 8.5;
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...warmAmber);
    doc.text(`SECTION ${item.sec}`, pageWidth / 2 - 62, yPos);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(246, 237, 226);
    doc.text(item.title, pageWidth / 2 - 36, yPos);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...sageGreen);
    doc.text(`p. ${item.page}`, pageWidth / 2 + 58, yPos, { align: 'right' });
  });

  // Authors & Edition Signature
  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...sageGreen);
  doc.text('Dr. Lena Marsh, Lead Botanical Director  ·  Marcus Vance, Master Grower', pageWidth / 2, 252, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...warmAmber);
  doc.text('OFFICIAL VERIFIED GREENHOUSE EDITION 2026', pageWidth / 2, 258, { align: 'center' });

  // -------------------------------------------------------------
  // PAGE 2: LIGHT INDEX & PHOTOBIOLOGY
  // -------------------------------------------------------------
  doc.addPage();
  addHeaderFooter(2, 6, 'Section 01 · Light Physics & Exposure');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...forestGreen);
  doc.text('01. The Universal Light Index & Lux Calibrations', margin, 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...mutedText);
  const lightIntro = doc.splitTextToSize(
    'Photosynthesis is the fundamental thermodynamic driver of indoor flora. Plants do not perceive brightness as human eyes do; our retinas automatically dilate in dim rooms, creating the illusion of adequate light where a plant is starving for photons. Use foot-candles (fc) or lux meters for accurate calibration.',
    contentWidth
  );
  doc.text(lightIntro, margin, 31);

  // Light Categories Grid
  const lightTiers = [
    {
      title: 'BRIGHT INDIRECT EXPOSURE (1,500 – 2,500 LUX / 150 – 250 FC)',
      color: warmAmber,
      desc: 'Position 2 to 4 feet away from an unobstructed South- or West-facing window, or right at an East-facing window with morning sun. Plant can view open sky without foliage receiving burning afternoon ultraviolet rays.',
      plants: 'Fiddle Leaf Fig, Monstera Deliciosa, Bird of Paradise, Olive Tree, Rubber Tree',
    },
    {
      title: 'MEDIUM DAPPLED EXPOSURE (800 – 1,500 LUX / 80 – 150 FC)',
      color: [74, 144, 196] as [number, number, number],
      desc: 'Position 5 to 8 feet back from bright apertures or directly beside a North-facing window. Simulates dense rainforest canopies where filtered sun penetrates foliage.',
      plants: 'Calathea Orbifolia, Peace Lily, Maranta Prayer Plant, Philodendron Birkin',
    },
    {
      title: 'LOW LIGHT TOLERANCE (300 – 800 LUX / 30 – 80 FC)',
      color: forestGreen,
      desc: 'Ambient indirect illumination in offices, hallways, or inner rooms. While specimens survive, cellular elongation (etiolation) may occur without monthly rotational care.',
      plants: 'Black Raven ZZ, Snake Plant Laurentii, Cast Iron Plant, Aglaonema Silver Bay',
    },
  ];

  let currentY = 48;
  lightTiers.forEach(tier => {
    doc.setFillColor(250, 248, 245);
    doc.roundedRect(margin, currentY, contentWidth, 34, 3, 3, 'F');
    doc.setDrawColor(...tier.color);
    doc.setLineWidth(0.6);
    doc.roundedRect(margin, currentY, contentWidth, 34, 3, 3, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...tier.color);
    doc.text(tier.title, margin + 4, currentY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...darkCharcoal);
    const descLines = doc.splitTextToSize(tier.desc, contentWidth - 8);
    doc.text(descLines, margin + 4, currentY + 12);

    doc.setFont('times', 'bolditalic');
    doc.setFontSize(8);
    doc.setTextColor(...forestGreen);
    doc.text(`Key Specimens: ${tier.plants}`, margin + 4, currentY + 30);

    currentY += 39;
  });

  // Window Orientation Cardinal Guide
  currentY += 4;
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...forestGreen);
  doc.text('Window Exposure Cardinal Orientation Guide', margin, currentY);

  const windowData = [
    ['Direction', 'Solar Intensity', 'Hours of Direct Light', 'Recommended Species'],
    ['South-Facing', 'Peak intensity (High)', '5 – 8 hrs afternoon', 'Olive, Ficus Lyrata, Cacti, Bird of Paradise'],
    ['East-Facing', 'Gentle gentle morning (Ideal)', '3 – 4 hrs gentle sun', 'Monstera, Philodendrons, Alocasias, Ferns'],
    ['West-Facing', 'Intense hot late day (High)', '4 – 6 hrs hot afternoon', 'Rubber Tree, Jade, Snake Plant, Yucca'],
    ['North-Facing', 'Low, consistent ambient (Mild)', '0 hrs direct sun', 'ZZ Plant, Cast Iron, Pothos, Aglaonema'],
  ];

  let tableY = currentY + 6;
  windowData.forEach((row, rIdx) => {
    const isHeader = rIdx === 0;
    if (isHeader) {
      doc.setFillColor(...forestGreen);
      doc.rect(margin, tableY, contentWidth, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(246, 237, 226);
    } else {
      doc.setFillColor(rIdx % 2 === 0 ? 245 : 255, rIdx % 2 === 0 ? 245 : 255, rIdx % 2 === 0 ? 245 : 255);
      doc.rect(margin, tableY, contentWidth, 7, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(...darkCharcoal);
    }

    doc.text(row[0], margin + 2, tableY + 5.5);
    doc.text(row[1], margin + 35, tableY + 5.5);
    doc.text(row[2], margin + 85, tableY + 5.5);
    doc.text(row[3], margin + 125, tableY + 5.5);

    tableY += isHeader ? 8 : 7;
  });

  // Master Rotational Rule Box
  doc.setFillColor(...warmAmber);
  doc.roundedRect(margin, tableY + 6, contentWidth, 14, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('★ VERDANA 90° PHOTOTROPIC ROTATION PRINCIPLE', margin + 6, tableY + 11.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Rotate every specimen 90 degrees clockwise on the 1st of every month to prevent structural leaning.', margin + 6, tableY + 16);

  // -------------------------------------------------------------
  // PAGE 3: SUBSTRATE ARCHITECTURE & LIVING SOIL
  // -------------------------------------------------------------
  doc.addPage();
  addHeaderFooter(3, 6, 'Section 02 · Substrate Architecture & Soil Chemistry');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...forestGreen);
  doc.text('02. Living Soil Science & Root Micro-Aeration', margin, 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...mutedText);
  const soilIntro = doc.splitTextToSize(
    'Standard commercial potting soil is formulated for outdoor agricultural seed-starting, leading to hydrophobic compaction and anaerobic root decay indoors. Verdana specimens are potted in custom horticultural matrix engineered for macroporosity, cation exchange capacity (CEC), and continuous aeration.',
    contentWidth
  );
  doc.text(soilIntro, margin, 31);

  // The 5 Substrate Components
  doc.setFont('times', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...forestGreen);
  doc.text('The Proprietary Verdana Aroid Aeration Formula', margin, 49);

  const formula = [
    { pct: '40%', name: 'Aged Horticultural Pine Bark Nuggets (Grade #2)', purpose: 'Creates structural macropores that allow roots to breathe; prevents soil compaction over 24 months.' },
    { pct: '25%', name: 'Pumice & Coarse Perlite (5-8mm diameter)', purpose: 'Volcanic minerals providing permanent drainage channels; non-compacting capillary water reservoirs.' },
    { pct: '20%', name: 'Pre-Washed Coconut Coir Pith', purpose: 'Sustainable, peat-free organic moisture retainer with neutral pH (6.0 - 6.5) and high re-wetting affinity.' },
    { pct: '10%', name: 'Organic Cold-Processed Worm Castings', purpose: 'Delivers living mycorrhizae, humic acids, and slow-release nitrogen, phosphorus, and zinc.' },
    { pct: '05%', name: 'Activated Horticultural Hardwood Charcoal', purpose: 'Adsorbs toxic mineral salts, tap water impurities, and prevents anaerobic foul root bacterial odors.' },
  ];

  let formulaY = 54;
  formula.forEach((f, idx) => {
    doc.setFillColor(248, 246, 242);
    doc.roundedRect(margin, formulaY, contentWidth, 16, 2, 2, 'F');
    doc.setDrawColor(...warmAmber);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, formulaY, contentWidth, 16, 2, 2, 'S');

    // Percentage badge
    doc.setFillColor(...forestGreen);
    doc.roundedRect(margin + 2, formulaY + 2.5, 14, 11, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...warmAmber);
    doc.text(f.pct, margin + 9, formulaY + 9.5, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...forestGreen);
    doc.text(f.name, margin + 19, formulaY + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...mutedText);
    const purposeText = doc.splitTextToSize(f.purpose, contentWidth - 22);
    doc.text(purposeText, margin + 19, formulaY + 11.5);

    formulaY += 19;
  });

  // Repotting Golden Rule Protocol
  formulaY += 5;
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...forestGreen);
  doc.text('The 2-Inch Pot Diameter Protocol', margin, formulaY);

  const repottingRules = [
    '1. NEVER INCREASE POT DIAMETER BY MORE THAN 1 TO 2 INCHES: Excess volume holds unused moisture that suffocates feeder roots.',
    '2. ALWAYS USE DRAINAGE APERTURES: Un-drained cachepots invite anaerobic bacterial stagnation. Always keep nursery liner inside.',
    '3. TIMING THE REPOTTING: Spring (March to June) is the prime vegetative growth window. Never repot dormant plants in late autumn.',
    '4. ROOT INSPECTION: If roots are tightly wound or circling the base, gently tease bottom 10% before settling into fresh Verdana substrate.',
  ];

  formulaY += 5;
  repottingRules.forEach((rule, idx) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkCharcoal);
    const rLines = doc.splitTextToSize(rule, contentWidth);
    doc.text(rLines, margin, formulaY + idx * 8.5);
  });

  // -------------------------------------------------------------
  // PAGE 4: HYDRATION & SEASONAL CALENDAR
  // -------------------------------------------------------------
  doc.addPage();
  addHeaderFooter(4, 6, 'Section 03 · Hydration & Seasonal Care Calendar');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...forestGreen);
  doc.text('03. The Hydration Matrix & 4-Season Cycle', margin, 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...mutedText);
  const waterIntro = doc.splitTextToSize(
    'More houseplants die from well-intentioned overwatering than neglect. Water is absorbed through fine microscopic root hairs via osmotic gradient; when saturated soil eliminates oxygen pockets, roots literally drown. Master soil moisture measurement rather than relying on a rigid calendar.',
    contentWidth
  );
  doc.text(waterIntro, margin, 31);

  // Deep Bottom Soaking vs Top Pouring
  doc.setFillColor(242, 247, 244);
  doc.roundedRect(margin, 46, contentWidth / 2 - 3, 44, 3, 3, 'F');
  doc.setDrawColor(...forestGreen);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, 46, contentWidth / 2 - 3, 44, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...forestGreen);
  doc.text('METHOD A: BOTTOM SUB-IRRIGATION', margin + 4, 53);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...darkCharcoal);
  const methodALines = doc.splitTextToSize(
    'Place nursery pot in a tray or vessel with 2 inches of lukewarm water for 25 minutes. Capillary forces draw water upward through the root zone without disturbing fragile topsoil mycorrhizae. Empty standing water after soak.',
    contentWidth / 2 - 10
  );
  doc.text(methodALines, margin + 4, 60);

  // Method B
  const rightX = margin + contentWidth / 2 + 3;
  doc.setFillColor(242, 247, 244);
  doc.roundedRect(rightX, 46, contentWidth / 2 - 3, 44, 3, 3, 'F');
  doc.setDrawColor(...forestGreen);
  doc.setLineWidth(0.5);
  doc.roundedRect(rightX, 46, contentWidth / 2 - 3, 44, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...forestGreen);
  doc.text('METHOD B: AERATED DEEP FLUSH', rightX + 4, 53);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...darkCharcoal);
  const methodBLines = doc.splitTextToSize(
    'Pour water slowly across the entire soil circumference until approximately 15% drains freely from bottom holes. This flushes accumulated fertilizer salts and replenishes oxygen in root pores. Allow drip tray to empty fully.',
    contentWidth / 2 - 10
  );
  doc.text(methodBLines, rightX + 4, 60);

  // 4 Season Calendar Table
  let calY = 98;
  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...forestGreen);
  doc.text('The 4-Season Indoor Botanical Calendar', margin, calY);

  const seasons = [
    {
      season: 'SPRING (March – May) · VEGETATIVE AWAKENING',
      freq: 'Check soil every 5–7 days. Water when top 2 inches dry.',
      fert: 'Begin bi-weekly organic 3-1-2 nitrogen-rich kelp emulsion feeding.',
      humidity: 'Maintain 55% RH. Ideal window for repotting root-bound specimens.',
    },
    {
      season: 'SUMMER (June – August) · ACTIVE PEAK FLUSH',
      freq: 'Check soil every 3–5 days. High transpiration rates accelerate drying.',
      fert: 'Feed every 14 days at half dilution. Ensure maximum bright indirect light.',
      humidity: 'Maintain 60% RH. Watch for hot afternoon window glass magnification burns.',
    },
    {
      season: 'AUTUMN (Sept – Nov) · METABOLIC TAPERING',
      freq: 'Check soil every 8–10 days. Days shorten; reduce watering frequency by 35%.',
      fert: 'Cease fertilizer applications completely by mid-October.',
      humidity: 'Turn on indoor ultrasonic humidifiers as central heating begins drying air.',
    },
    {
      season: 'WINTER (Dec – Feb) · DORMANCY MAINTENANCE',
      freq: 'Check soil every 12–16 days. Water sparingly; keep roots barely moist.',
      fert: 'ZERO fertilizer. Feeding during dormancy burns fragile resting root systems.',
      humidity: 'Keep foliage away from radiators, heat registers, and icy window glass drafts.',
    },
  ];

  calY += 5;
  seasons.forEach((s, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 250 : 243, 248, 245);
    doc.roundedRect(margin, calY, contentWidth, 24, 2, 2, 'F');
    doc.setDrawColor(...warmAmber);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, calY, contentWidth, 24, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...forestGreen);
    doc.text(s.season, margin + 4, calY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...darkCharcoal);
    doc.text(`• Hydration: ${s.freq}`, margin + 4, calY + 11);
    doc.text(`• Nutrition: ${s.fert}`, margin + 4, calY + 16);
    doc.text(`• Climate: ${s.humidity}`, margin + 4, calY + 21);

    calY += 27;
  });

  // Dedicated Water Purity Protocol Callout Block
  const noteBoxY = calY + 4;
  const noteBoxHeight = 25;
  doc.setFillColor(255, 248, 238);
  doc.roundedRect(margin, noteBoxY, contentWidth, noteBoxHeight, 3, 3, 'F');
  doc.setDrawColor(...warmAmber);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, noteBoxY, contentWidth, noteBoxHeight, 3, 3, 'S');

  // Left solid accent bar
  doc.setFillColor(...warmAmber);
  doc.rect(margin, noteBoxY, 3.5, noteBoxHeight, 'F');

  // Title on its own line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...warmAmber);
  doc.text('WATER PURITY & VOLATILE CHLORINE DISSIPATION PROTOCOL', margin + 8, noteBoxY + 6.5);

  // Wrapped descriptive text on lines below with generous margin
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...darkCharcoal);
  const waterPurityParagraph = doc.splitTextToSize(
    'Let municipal tap water sit in an open carafe for 24 hours to dissipate chlorine and reach room temperature. Municipal tap water contains volatile chlorine and chloramines that can scorch delicate feeder roots and cause tip chlorosis. Allowing water to breathe uncovered for 24 hours vaporizes chlorine and equilibrates liquid to ambient room temperature, preventing vascular thermal shock.',
    contentWidth - 14
  );
  doc.text(waterPurityParagraph, margin + 8, noteBoxY + 12);

  // -------------------------------------------------------------
  // PAGE 5: CLINICAL FOLIAR TRIAGE & PEST PROTOCOLS
  // -------------------------------------------------------------
  doc.addPage();
  addHeaderFooter(5, 6, 'Section 04 · Clinical Foliar Triage & Organic Medicine');

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...forestGreen);
  doc.text('04. Clinical Foliar Triage & Botanical Medicine', margin, 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...mutedText);
  const triageIntro = doc.splitTextToSize(
    'Foliar discoloration, drooping, and spotting are biological distress signals. Quick, methodical diagnosis prevents minor systemic imbalances from escalating into permanent specimen loss. Treat root causes, not just visual symptoms.',
    contentWidth
  );
  doc.text(triageIntro, margin, 31);

  // Triage Table
  const triageData = [
    {
      symptom: 'Yellowing Lower Leaves (Chlorosis)',
      cause: 'Overwatering / Anaerobic root rot OR natural aging of oldest bottom foliage.',
      rx: 'Check root firmness. If soft/black, prune necrotic roots and repot in fresh aerated mix. Reduce watering frequency.',
    },
    {
      symptom: 'Crispy Brown Leaf Tips & Margins',
      cause: 'Low ambient humidity (< 40%) OR tap water fluoride/chloramine buildup in tips.',
      rx: 'Switch to filtered or rainwater. Group plants closely to create a humidity dome; run cool-mist humidifier.',
    },
    {
      symptom: 'Drooping / Limp Stems & Foliage',
      cause: 'Dehydration (crisp dry soil) OR root rot (drowned roots unable to pump water).',
      rx: 'Perform the 2-inch soil probe. If bone dry, sub-irrigate 30 mins. If soggy, withhold water immediately.',
    },
    {
      symptom: 'Pale Leaves with Long Leggy Stems',
      cause: 'Etiolation (severe lack of usable photons). Plant stretches toward windows.',
      rx: 'Relocate specimen 3 feet closer to light source or supplement with a 36W full-spectrum LED grow bulb.',
    },
    {
      symptom: 'Fine Webbing on Undersides (Spider Mites)',
      cause: 'Tetranychidae proliferation accelerated by hot, dry indoor winter heating.',
      rx: 'Wash leaves thoroughly in shower. Spray weekly with cold-pressed organic neem oil + mild castile soap solution.',
    },
    {
      symptom: 'Cottony White Clusters in Leaf Axils',
      cause: 'Mealybugs (Pseudococcidae) feeding on vascular phloem sap.',
      rx: 'Dab insects with cotton swab dipped in 70% isopropyl alcohol. Follow with systemic organic botanical rinse.',
    },
  ];

  let triageY = 48;
  triageData.forEach((item, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 250 : 243, 247, 244);
    doc.roundedRect(margin, triageY, contentWidth, 25, 2, 2, 'F');
    doc.setDrawColor(idx % 2 === 0 ? 200 : 180, 210, 195);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, triageY, contentWidth, 25, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...forestGreen);
    doc.text(`DIAGNOSIS: ${item.symptom}`, margin + 4, triageY + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...warmAmber);
    doc.text('Probable Cause: ', margin + 4, triageY + 11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkCharcoal);
    const causeText = doc.splitTextToSize(item.cause, contentWidth - 32);
    doc.text(causeText, margin + 28, triageY + 11);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...forestGreen);
    doc.text('Horticultural Rx: ', margin + 4, triageY + 18);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkCharcoal);
    const rxText = doc.splitTextToSize(item.rx, contentWidth - 32);
    doc.text(rxText, margin + 28, triageY + 18);

    triageY += 28;
  });

  // Emergency Care Hotline Bar
  doc.setFillColor(...forestGreen);
  doc.roundedRect(margin, triageY + 2, contentWidth, 14, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...warmAmber);
  doc.text('FREE BOTANIST CLINICAL CONSULTATION WITH EVERY SPECIMEN', margin + 6, triageY + 7.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(246, 237, 226);
  doc.text('Need a certified botanist evaluation? Open our online Plant Doctor Diagnostic Clinic or submit a care ticket.', margin + 6, triageY + 12.5);

  // -------------------------------------------------------------
  // PAGE 6: OFFICIAL BOTANICAL PASSPORT & 30-DAY GUARANTEE
  // -------------------------------------------------------------
  doc.addPage();
  addHeaderFooter(6, 6, 'Section 05 · Specimen Passport & Guarantee Certificate');

  // Certificate Frame - Generous inner margins so text never touches or crosses borders
  const certMargin = 18;
  const certWidth = pageWidth - certMargin * 2;
  doc.setDrawColor(...warmAmber);
  doc.setLineWidth(1.2);
  doc.rect(certMargin, 20, certWidth, pageHeight - 38);
  doc.setLineWidth(0.4);
  doc.rect(certMargin + 2.5, 22.5, certWidth - 5, pageHeight - 43);

  // Certificate Header
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...warmAmber);
  doc.text('VERDANA BOTANICAL NURSERY  ·  BROOKLYN, NEW YORK', pageWidth / 2, 33, { align: 'center' });

  // Certificate of Authenticity Heading - Sized safely at 12.5pt so letters are completely inside the border
  doc.setFont('times', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(...forestGreen);
  doc.text('CERTIFICATE OF BOTANICAL AUTHENTICITY', pageWidth / 2, 43.5, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...sageGreen);
  doc.text('& Living Specimen Health Guarantee Standard', pageWidth / 2, 50, { align: 'center' });

  // Seal Graphic
  doc.setFillColor(255, 255, 255);
  doc.circle(pageWidth / 2, 70, 14, 'F');
  doc.setDrawColor(...warmAmber);
  doc.setLineWidth(1);
  doc.circle(pageWidth / 2, 70, 14, 'S');

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...forestGreen);
  doc.text('VERDANA', pageWidth / 2, 69, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(...warmAmber);
  doc.text('PASSPORT 2026', pageWidth / 2, 74, { align: 'center' });

  // Guarantee Text
  doc.setFont('times', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...darkCharcoal);
  const certLines = [
    'This certifies that every botanical specimen distributed by Verdana has undergone our stringent',
    '3-week greenhouse acclimatization quarantine, root vigor inspection, and foliar disease screening.',
    'Potted in our proprietary organic living substrate, this plant is guaranteed to thrive in your indoor sanctuary.',
  ];
  certLines.forEach((l, idx) => {
    doc.text(l, pageWidth / 2, 94 + idx * 6, { align: 'center' });
  });

  // Guarantee Box
  doc.setFillColor(245, 248, 245);
  doc.roundedRect(margin + 10, 116, contentWidth - 20, 52, 3, 3, 'F');
  doc.setDrawColor(...forestGreen);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin + 10, 116, contentWidth - 20, 52, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...forestGreen);
  doc.text('THE VERDANA 30-DAY LIVING GUARANTEE PLEDGE', pageWidth / 2, 126, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...darkCharcoal);
  const pledgeText = [
    '• 30 DAYS OF UNCONDITIONAL HEALTH ASSURANCE: If your specimen displays decline within 30 days',
    '  of delivery, our botanists will diagnose it or dispatch an immediate healthy replacement free of charge.',
    '• LIFETIME BOTANIST SUPPORT: Access our diagnostic care team for the entire lifetime of your plant.',
    '• ZERO CRACKED POTS: Hand-packed in custom molded biodegradable cornstarch pods, shock-isolated.',
    '• CLIMATE-CONTROLLED TRANSIT: Insulated with thermal heat-packs in winter and breathable vents in summer.',
  ];
  pledgeText.forEach((p, idx) => {
    doc.text(p, margin + 14, 134 + idx * 6);
  });

  // Signatures
  const sigY = 188;
  doc.setDrawColor(...darkCharcoal);
  doc.setLineWidth(0.4);
  doc.line(margin + 16, sigY, margin + 65, sigY);
  doc.line(pageWidth - margin - 65, sigY, pageWidth - margin - 16, sigY);

  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...forestGreen);
  doc.text('Dr. Lena Marsh, Ph.D.', margin + 40, sigY - 2, { align: 'center' });
  doc.text('Marcus Vance, Lead Curator', pageWidth - margin - 40, sigY - 2, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...mutedText);
  doc.text('Director of Horticultural Science', margin + 40, sigY + 4, { align: 'center' });
  doc.text('Head of Acclimatization & Nursery', pageWidth - margin - 40, sigY + 4, { align: 'center' });

  // Serial Passport Footer
  const randomSerial = `VRD-PASSPORT-${Math.floor(100000 + Math.random() * 900000)}-NYC`;
  doc.setFillColor(255, 245, 230);
  doc.roundedRect(pageWidth / 2 - 45, 212, 90, 10, 2, 2, 'F');
  doc.setFont('courier', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...warmAmber);
  return doc;
}

/**
 * Downloads the official 6-page Verdana Botanical Care Field Guide & Handbook PDF
 */
export function downloadCareGuidePdf(): void {
  const doc = createCareGuidePdfDoc();
  doc.save('Verdana-Botanical-Care-Field-Guide-2026.pdf');
}

/**
 * Prepares and prints the official 6-page Verdana Botanical Care Field Guide PDF
 */
export function printCareGuidePdf(): void {
  // 1. Generate print-ready vector PDF document
  try {
    const doc = createCareGuidePdfDoc();
    if (typeof (doc as any).autoPrint === 'function') {
      try {
        (doc as any).autoPrint({ variant: 'non-conform' });
      } catch {}
    }
    // Guaranteed download so user always receives the high-res printable file
    doc.save('Verdana-Botanical-Care-Handbook-PRINT-READY-2026.pdf');
  } catch (err) {
    console.warn('PDF print generation error:', err);
  }

  // 2. Trigger native browser window.print()
  try {
    window.print();
  } catch (err) {
    console.warn('Native window.print prevented by browser sandbox:', err);
  }
}

/**
 * Generates and downloads an individual Official Botanical Passport & Certificate PDF for a specific plant
 */
export function downloadSpecimenPassportPdf(plant: Plant): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  const forestGreen = [7, 59, 36] as [number, number, number];
  const warmAmber = [226, 139, 39] as [number, number, number];
  const sageGreen = [138, 184, 154] as [number, number, number];
  const darkCharcoal = [30, 41, 35] as [number, number, number];

  // Certificate Frame
  doc.setDrawColor(...warmAmber);
  doc.setLineWidth(1.2);
  doc.rect(margin, margin, contentWidth, pageHeight - margin * 2);
  doc.setLineWidth(0.4);
  doc.rect(margin + 2.5, margin + 2.5, contentWidth - 5, pageHeight - margin * 2 - 5);

  // Top Header
  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...warmAmber);
  doc.text('VERDANA BOTANICAL NURSERY  ·  BROOKLYN, NEW YORK', pageWidth / 2, 28, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...forestGreen);
  doc.text('OFFICIAL BOTANICAL PASSPORT', pageWidth / 2, 40, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...sageGreen);
  doc.text('Certified Living Specimen Pedigree & Care Dossier', pageWidth / 2, 47, { align: 'center' });

  // Botanical Name Box
  doc.setFillColor(244, 248, 245);
  doc.roundedRect(margin + 8, 56, contentWidth - 16, 32, 3, 3, 'F');
  doc.setDrawColor(...forestGreen);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin + 8, 56, contentWidth - 16, 32, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...warmAmber);
  doc.text('REGISTERED CULTIVAR SPECIMEN:', margin + 14, 64);

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...forestGreen);
  doc.text(plant.name, margin + 14, 73);

  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...sageGreen);
  doc.text(plant.scientificName || plant.name, margin + 14, 81);

  // Key Specs Grid
  const specs = [
    { label: 'Greenhouse Origin', val: plant.origin || 'Tropical Understory' },
    { label: 'Light Requirement', val: plant.light },
    { label: 'Hydration Cycle', val: plant.water },
    { label: 'Foliage Care Level', val: plant.care },
    { label: 'Pet Safety Index', val: plant.petSafe ? 'Pet Friendly (Non-toxic)' : 'Toxic if Ingested (Keep Elevated)' },
    { label: 'Acclimatization Rating', val: 'Triple Inspected (99.4% Health Score)' },
  ];

  let specY = 96;
  specs.forEach((s, idx) => {
    const isLeft = idx % 2 === 0;
    const colX = isLeft ? margin + 8 : margin + contentWidth / 2 + 2;
    const rowY = specY + Math.floor(idx / 2) * 16;

    doc.setFillColor(250, 248, 245);
    doc.roundedRect(colX, rowY, contentWidth / 2 - 10, 13, 2, 2, 'F');
    doc.setDrawColor(210, 215, 210);
    doc.setLineWidth(0.3);
    doc.roundedRect(colX, rowY, contentWidth / 2 - 10, 13, 2, 2, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...warmAmber);
    doc.text(s.label.toUpperCase(), colX + 4, rowY + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...darkCharcoal);
    doc.text(s.val, colX + 4, rowY + 9.5);
  });

  // Description & Care Advice
  const descY = 152;
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...forestGreen);
  doc.text('Greenhouse Curator Notes', margin + 8, descY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...darkCharcoal);
  const careDesc = doc.splitTextToSize(
    `${plant.description} This specimen has been grown under filtered photoperiods and nourished with organic micronutrients. Upon unpacking, place in indirect light for 48 hours without repotting to allow root cellular pressure to stabilize.`,
    contentWidth - 16
  );
  doc.text(careDesc, margin + 8, descY + 6);

  // Guarantee Stamp
  doc.setFillColor(...forestGreen);
  doc.roundedRect(margin + 8, 185, contentWidth - 16, 26, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...warmAmber);
  doc.text('30-DAY BOTANICAL HEALTH GUARANTEE INCLUDED', margin + 14, 194);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(246, 237, 226);
  doc.text(
    'If this plant displays stress or does not adjust to your space within 30 days, contact our Brooklyn clinic for free replacement.',
    margin + 14,
    201
  );

  // Serial Passport ID
  const passportId = `VRD-${plant.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
  doc.setFont('courier', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...warmAmber);
  doc.text(`SPECIMEN PASSPORT NUMBER: ${passportId}`, margin + 14, 206);

  // Signatures
  const sigY = 236;
  doc.setDrawColor(...darkCharcoal);
  doc.setLineWidth(0.4);
  doc.line(margin + 16, sigY, margin + 65, sigY);
  doc.line(pageWidth - margin - 65, sigY, pageWidth - margin - 16, sigY);

  doc.setFont('times', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(...forestGreen);
  doc.text('Dr. Lena Marsh', margin + 40, sigY - 2, { align: 'center' });
  doc.text('Verdana Greenhouse QC', pageWidth - margin - 40, sigY - 2, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 110, 100);
  doc.text('Chief Botanist Inspector', margin + 40, sigY + 4, { align: 'center' });
  doc.text('Certified B-Corp Horticulturalist', pageWidth - margin - 40, sigY + 4, { align: 'center' });

  doc.save(`Verdana-Passport-${plant.name.replace(/\s+/g, '-')}.pdf`);
}
