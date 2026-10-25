import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import { downloadCareGuidePdf, printCareGuidePdf } from '../utils/generateBotanicalPdf';

interface PdfViewerModalProps {
  onClose: () => void;
}

const PAGES = [
  {
    id: 1,
    title: 'Cover & Title',
    subtitle: 'Verdana Botanica Compendium · Brooklyn Greenhouse Archive',
    preview: (
      <div className="bg-[#073b24] text-[#f6ede2] p-8 rounded-2xl border-2 border-[#e28b27]/60 flex flex-col items-center text-center shadow-inner min-h-[460px] justify-between">
        <div className="w-14 h-14 rounded-full border-2 border-[#e28b27] flex items-center justify-center text-[#e28b27] font-serif text-2xl font-bold bg-[#042a1a] shadow-md">
          V
        </div>
        <div className="my-6">
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#e28b27] uppercase block mb-3">
            Official Greenhouse Compendium · 2026 Edition
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f6ede2] tracking-tight leading-tight m-0 mb-3">
            VERDANA BOTANICA
          </h2>
          <p className="font-serif italic text-[#8ab89a] text-lg max-w-md mx-auto m-0 mb-4">
            The Indoor Horticulturist&apos;s Master Compendium &amp; Specimen Care Field Guide
          </p>
          <div className="w-20 h-0.5 bg-[#e28b27] mx-auto my-3" />
          <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
            Curated protocols for lighting physics, living micro-aerated substrate chemistry, hydration cycles, clinical triage, and certified specimen guarantee standards.
          </p>
        </div>

        <div className="w-full bg-[#042a1a]/70 border border-[#e28b27]/40 rounded-xl p-4 text-left">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#e28b27] mb-2 text-center">
            Included Field Chapters
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
            <div>§ 01. Phototropism &amp; Lux Matrix</div>
            <div>§ 02. Aroid Chunk Soil Ratios</div>
            <div>§ 03. Seasonal Hydration Curves</div>
            <div>§ 04. Foliar Triage &amp; Neem Protocols</div>
            <div className="col-span-2 text-center text-[#8ab89a] pt-1 border-t border-white/10">
              § 05. Certified 30-Day Living Guarantee Certificate
            </div>
          </div>
        </div>

        <div className="text-[11px] text-[#8ab89a] mt-4 font-serif italic">
          Dr. Lena Marsh, Ph.D. · Marcus Vance, Master Curator
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Photobiology & Light Index',
    subtitle: 'Foot-Candles, Lux Benchmarks, and Window Exposures',
    preview: (
      <div className="bg-[#faf8f5] text-[#1e2922] p-8 rounded-2xl border border-stone-300 shadow-sm min-h-[460px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center pb-3 border-b border-[#073b24]/20 mb-4">
            <span className="font-serif italic text-xs text-[#073b24]/70">Chapter 01 · Photobiology</span>
            <span className="text-[11px] font-bold text-[#e28b27] tracking-wider uppercase">VERDANA STANDARD</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#073b24] mb-2">
            The Universal Lux &amp; Foot-Candle Index
          </h3>
          <p className="text-xs text-stone-600 mb-5 leading-relaxed">
            Plants experience photon densities, not subjective brightness. Human eyes adapt automatically in dark rooms, creating a false impression of adequate light.
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex justify-between items-center text-xs font-bold text-[#b45309] mb-1">
                <span>Bright Indirect Light (1,500 – 2,500 Lux / 150 – 250 FC)</span>
                <span className="bg-amber-100 text-[#b45309] px-2 py-0.5 rounded text-[10px]">Tier 1</span>
              </div>
              <p className="text-[11px] text-stone-700 m-0">
                2–4 ft from South/West apertures or directly at an East window. Best for Fiddle Leaf Fig, Monstera, Bird of Paradise.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex justify-between items-center text-xs font-bold text-blue-800 mb-1">
                <span>Medium Dappled Light (800 – 1,500 Lux / 80 – 150 FC)</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px]">Tier 2</span>
              </div>
              <p className="text-[11px] text-stone-700 m-0">
                5–8 ft back or right beside North windows. Simulates understory canopy. Perfect for Calatheas, Peace Lilies, Ferns.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-800 mb-1">
                <span>Low Light Tolerance (300 – 800 Lux / 30 – 80 FC)</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px]">Tier 3</span>
              </div>
              <p className="text-[11px] text-stone-700 m-0">
                Ambient light in bedrooms or hallways. Survives without etiolation with monthly rotation: ZZ Plant, Snake Plant, Cast Iron.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#073b24] text-white rounded-xl text-xs flex items-center justify-between">
          <span className="font-semibold text-[#e28b27]">★ Golden Phototropic Law:</span>
          <span className="text-[11px] text-stone-200">Rotate planters 90° on the 1st of every month for symmetrical foliage.</span>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Living Soil & Substrate Architecture',
    subtitle: 'The 5-Ingredient Organic Aroid Chunk Blend',
    preview: (
      <div className="bg-[#faf8f5] text-[#1e2922] p-8 rounded-2xl border border-stone-300 shadow-sm min-h-[460px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center pb-3 border-b border-[#073b24]/20 mb-4">
            <span className="font-serif italic text-xs text-[#073b24]/70">Chapter 02 · Substrate Physics</span>
            <span className="text-[11px] font-bold text-[#e28b27] tracking-wider uppercase">PEAT-FREE SPECIFICATION</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#073b24] mb-2">
            The Signature Verdana Aroid Substrate Formula
          </h3>
          <p className="text-xs text-stone-600 mb-4 leading-relaxed">
            Indoor container plants require permanent macroporosity and high cation exchange capacity (CEC) to resist compaction and anaerobic root decay.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
              <div className="text-[#073b24] font-bold text-sm">40% Pine Bark Nuggets</div>
              <div className="text-[10px] text-stone-500">Grade #2 aged fir bark for long-term root aeration</div>
            </div>
            <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
              <div className="text-[#073b24] font-bold text-sm">25% Coarse Perlite &amp; Pumice</div>
              <div className="text-[10px] text-stone-500">5-8mm volcanic minerals that prevent compaction</div>
            </div>
            <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
              <div className="text-[#073b24] font-bold text-sm">20% Coconut Coir Pith</div>
              <div className="text-[10px] text-stone-500">Washed, neutral pH sustainable moisture holder</div>
            </div>
            <div className="p-3 bg-stone-100 rounded-xl border border-stone-200">
              <div className="text-[#073b24] font-bold text-sm">10% Earthworm Castings</div>
              <div className="text-[10px] text-stone-500">Natural mycorrhizae, humic acids, and slow nutrients</div>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
            <strong>+ 5% Activated Horticultural Charcoal:</strong> Adsorbs stagnant tap salts and keeps root zones fresh for 24+ months.
          </div>
        </div>

        <div className="p-3 bg-stone-200/60 rounded-xl text-[11px] text-stone-700">
          <strong>The 2-Inch Diameter Repotting Rule:</strong> Never increase planter size by more than 1–2 inches in diameter. Excess wet soil invites root rot.
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Hydration & 4-Season Cycle',
    subtitle: 'Capillary Soaking, Tap Water Quality, and Seasonal Curves',
    preview: (
      <div className="bg-[#faf8f5] text-[#1e2922] p-8 rounded-2xl border border-stone-300 shadow-sm min-h-[460px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center pb-3 border-b border-[#073b24]/20 mb-4">
            <span className="font-serif italic text-xs text-[#073b24]/70">Chapter 03 · Hydration Dynamics</span>
            <span className="text-[11px] font-bold text-[#e28b27] tracking-wider uppercase">OSMOTIC BALANCE</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#073b24] mb-2">
            The Mindful Watering Matrix
          </h3>
          <p className="text-xs text-stone-600 mb-4 leading-relaxed">
            Check soil moisture depth, never water solely by the calendar. Fine feeder roots need oxygen between hydration cycles.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl">
              <div className="font-bold text-xs text-sky-900 mb-1">Bottom Sub-Irrigation</div>
              <p className="text-[11px] text-stone-600 m-0">
                Sit nursery pot in 2 inches of water for 25 mins. Capillary suction draws water upward without compacting topsoil.
              </p>
            </div>
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="font-bold text-xs text-emerald-900 mb-1">Aerated Top Flush</div>
              <p className="text-[11px] text-stone-600 m-0">
                Water slowly until 15% drips from drainage holes. Flushes accumulated mineral salts and refreshes pore oxygen.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between p-2 bg-stone-100 rounded-lg">
              <span className="font-semibold text-stone-800">Spring &amp; Summer Flush</span>
              <span className="text-stone-600">Check soil every 4–7 days · Bi-weekly organic kelp food</span>
            </div>
            <div className="flex justify-between p-2 bg-stone-100 rounded-lg">
              <span className="font-semibold text-stone-800">Autumn Taper</span>
              <span className="text-stone-600">Check soil every 8–10 days · Halt fertilizer by Oct 15</span>
            </div>
            <div className="flex justify-between p-2 bg-stone-100 rounded-lg">
              <span className="font-semibold text-stone-800">Winter Dormancy</span>
              <span className="text-stone-600">Check every 12–16 days · Zero fertilizer · Keep 55% RH</span>
            </div>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50/80 border-l-4 border-amber-500 border border-amber-200 rounded-xl text-xs text-stone-800">
          <div className="font-bold text-amber-900 text-xs mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            WATER PURITY &amp; VOLATILE CHLORINE DISSIPATION PROTOCOL
          </div>
          <p className="text-[11px] text-stone-700 m-0 leading-relaxed">
            Let municipal tap water sit in an open carafe for 24 hours to dissipate chlorine and reach room temperature. This dissipates volatile chloramines that cause foliar tip burn, while equilibrating liquid temperature to avoid vascular shock.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Clinical Foliar Triage',
    subtitle: 'Diagnostic Symptoms, Root Pathology, and Organic Remedies',
    preview: (
      <div className="bg-[#faf8f5] text-[#1e2922] p-8 rounded-2xl border border-stone-300 shadow-sm min-h-[460px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center pb-3 border-b border-[#073b24]/20 mb-4">
            <span className="font-serif italic text-xs text-[#073b24]/70">Chapter 04 · Clinical Triage</span>
            <span className="text-[11px] font-bold text-[#e28b27] tracking-wider uppercase">ORGANIC MEDICINE</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#073b24] mb-2">
            Clinical Symptom Diagnostic Table
          </h3>
          <p className="text-xs text-stone-600 mb-4 leading-relaxed">
            Leaves are biological distress signals. Quick, methodical diagnosis prevents systemic root failure.
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl">
              <div className="font-bold text-rose-900">Yellow Lower Leaves (Chlorosis)</div>
              <div className="text-[11px] text-stone-600">
                <strong>Cause:</strong> Overwatering or anaerobic root rot. <strong>Rx:</strong> Probe root firmness. Trim necrotic roots, reduce watering.
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="font-bold text-amber-900">Crispy Brown Margins &amp; Tips</div>
              <div className="text-[11px] text-stone-600">
                <strong>Cause:</strong> Low relative humidity (&lt;40%) or tap water fluoride. <strong>Rx:</strong> Use filtered water; group plants or run humidifier.
              </div>
            </div>

            <div className="p-2.5 bg-stone-100 border border-stone-200 rounded-xl">
              <div className="font-bold text-stone-900">Spider Mites &amp; Fine Webbing</div>
              <div className="text-[11px] text-stone-600">
                <strong>Cause:</strong> Dry indoor winter heat. <strong>Rx:</strong> Shower foliage; spray cold-pressed organic neem oil + castile soap weekly.
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#073b24] text-white rounded-xl text-xs flex justify-between items-center">
          <span className="text-[#e28b27] font-bold">Need a live botanist second opinion?</span>
          <span className="text-white/80 text-[11px]">Contact our Brooklyn Clinic in the Support Tab</span>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Certificate of Authenticity',
    subtitle: 'The Official Stamped Verdana 30-Day Guarantee',
    preview: (
      <div className="bg-[#fbfaf8] text-[#1e2922] p-4 sm:p-6 rounded-2xl border-4 border-[#e28b27]/80 shadow-md min-h-[460px] flex flex-col justify-between text-center relative overflow-hidden">
        {/* Inner Certificate Framing Box with generous margins preventing text from touching border lines */}
        <div className="border-2 border-[#e28b27]/50 rounded-xl p-5 sm:p-7 flex flex-col justify-between h-full bg-[#fbfaf8] relative">
          <div className="absolute top-2 right-2 text-stone-300 font-serif text-7xl font-bold opacity-10 pointer-events-none select-none">
            VERDANA
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e28b27] block mb-2">
              Verdana Botanical Nursery · Brooklyn, New York
            </span>
            <h3 className="font-serif text-sm sm:text-base md:text-lg font-bold text-[#073b24] mb-1.5 tracking-wider uppercase px-4 max-w-sm sm:max-w-md mx-auto whitespace-normal">
              CERTIFICATE OF BOTANICAL AUTHENTICITY
            </h3>
            <p className="font-serif italic text-stone-500 text-xs mb-3">
              &amp; Living Specimen Health Guarantee Standard
            </p>

            {/* Official Stamped Gold Seal */}
            <div className="w-16 h-16 rounded-full border-2 border-[#e28b27] mx-auto flex flex-col items-center justify-center bg-white shadow-md my-2.5 ring-4 ring-[#e28b27]/15">
              <span className="font-serif font-bold text-xs text-[#073b24] tracking-wider leading-none">VERDANA</span>
              <span className="text-[7.5px] font-mono font-bold text-[#e28b27] mt-0.5 tracking-tight">PASSPORT 2026</span>
            </div>

            <p className="text-xs text-stone-700 max-w-md mx-auto leading-relaxed mb-3">
              Every botanical specimen distributed by Verdana undergoes a 3-week greenhouse acclimatization quarantine, root vigor inspection, and foliar disease screening.
            </p>

            <div className="bg-[#073b24]/5 border border-[#073b24]/20 rounded-xl p-3 text-left text-xs max-w-md mx-auto space-y-1 text-stone-700">
              <div>✓ 30-Day Unconditional Health Replacement Guarantee</div>
              <div>✓ Potted in 100% Peat-Free Organic Living Substrate</div>
              <div>✓ Insulated Climate Transit with Thermal Heat-Packs</div>
              <div>✓ Lifetime Access to our Brooklyn Botanist Diagnostic Queue</div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-300 flex justify-between items-end text-left mt-2">
            <div>
              <div className="font-serif italic font-bold text-xs text-[#073b24]">Dr. Lena Marsh, Ph.D.</div>
              <div className="text-[10px] text-stone-500">Director of Horticultural Science</div>
            </div>
            <div className="font-mono text-[10px] bg-amber-100 text-amber-900 px-3 py-1 rounded border border-amber-300 font-bold">
              VRD-PASSPORT-2026-NYC
            </div>
            <div className="text-right">
              <div className="font-serif italic font-bold text-xs text-[#073b24]">Marcus Vance</div>
              <div className="text-[10px] text-stone-500">Master Greenhouse Curator</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function PdfViewerModal({ onClose }: PdfViewerModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [downloading, setDownloading] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [printNotice, setPrintNotice] = useState<string | null>(null);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleDownload = () => {
    setDownloading(true);
    try {
      downloadCareGuidePdf();
    } finally {
      setTimeout(() => setDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    setPrinting(true);
    setPrintNotice(null);
    try {
      printCareGuidePdf();
      setPrintNotice('🖨️ Print Dispatch Ready: High-resolution 6-page vector compendium compiled & downloaded for your printer.');
    } catch {
      try {
        window.print();
        setPrintNotice('Print preview opened.');
      } catch {}
    } finally {
      setTimeout(() => setPrinting(false), 800);
    }
  };

  const page = PAGES.find(p => p.id === currentPage) || PAGES[0];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        animation: 'overlayIn 0.25s ease',
      }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#042a1a]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Main Reader Dialog */}
      <div
        className="relative w-full max-w-5xl bg-[#073b24] text-[#f6ede2] rounded-3xl shadow-2xl border border-[rgba(246,237,226,0.15)] overflow-hidden flex flex-col max-h-[94vh] z-10"
        style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Top App Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#042a1a]/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e28b27]/20 border border-[#e28b27]/40 flex items-center justify-center text-[#e28b27]">
              <Icon name="book" size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#e28b27] px-2 py-0.5 rounded bg-[#e28b27]/15">
                  Official Publication · PDF
                </span>
                <span className="text-xs text-white/50">6 Pages · Vector High-Res</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#f6ede2] m-0 leading-tight">
                Verdana Botanica Care Compendium &amp; Field Handbook
              </h3>
            </div>
          </div>

          {/* Actions: Print, Download, Cancel & Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handlePrint}
              disabled={printing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-[#f6ede2] border border-white/20 transition-all cursor-pointer shadow hover:scale-105 disabled:opacity-60"
              title="Print Handbook PDF"
            >
              <Icon name="clipboard" size={14} />
              {printing ? 'Opening Print...' : 'Print'}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#e28b27] hover:bg-[#cf7b1e] text-[#073b24] shadow-md hover:scale-[1.03] transition-all cursor-pointer"
            >
              <Icon name="truck" size={14} />
              {downloading ? 'Compiling PDF...' : 'Download Official PDF (.pdf)'}
            </button>

            {/* Cancel Button with prominent red hover */}
            <button
              type="button"
              onClick={onClose}
              data-action="cancel"
              className="btn-cancel px-3.5 py-2 rounded-full text-xs font-bold text-white/80 bg-white/10 border border-white/20 transition-all cursor-pointer hover:!bg-red-600 hover:!border-red-500 hover:!text-white hover:!shadow-[0_0_16px_rgba(239,68,68,0.55)]"
              title="Cancel and close handbook"
            >
              Cancel
            </button>

            {/* Prominent Red Close Window Button */}
            <button
              type="button"
              onClick={onClose}
              className="modal-close-btn close-red-hover w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
              title="Close PDF Reader"
              aria-label="Close PDF Reader"
            >
              <span className="text-xl font-bold leading-none">✕</span>
            </button>
          </div>
        </div>

        {/* Live Print Confirmation Notice */}
        {printNotice && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-6 py-2.5 flex items-center justify-between text-xs text-emerald-200 animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{printNotice}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  try {
                    window.print();
                  } catch {}
                }}
                className="px-3 py-1 rounded-full bg-emerald-500/30 hover:bg-emerald-500/50 text-white font-bold cursor-pointer text-[11px] transition-colors"
              >
                Re-open Print Dialog
              </button>
              <button
                type="button"
                onClick={() => setPrintNotice(null)}
                className="text-white/60 hover:text-white cursor-pointer px-1 text-sm font-bold"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Reader Layout: Sidebar + Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Table of Contents Navigation Sidebar */}
          <div className="md:col-span-4 lg:col-span-3 border-r border-white/10 p-4 overflow-y-auto bg-[#042a1a]/40 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#e28b27] px-2 mb-2">
              Handbook Chapters
            </div>
            {PAGES.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setCurrentPage(p.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                  currentPage === p.id
                    ? 'bg-[#e28b27] text-[#073b24] font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/10 text-white/80'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    currentPage === p.id ? 'bg-[#073b24] text-[#e28b27]' : 'bg-white/10 text-white/70'
                  }`}
                >
                  {p.id}
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold leading-tight truncate">{p.title}</div>
                  <div
                    className={`text-[10px] truncate ${
                      currentPage === p.id ? 'text-[#073b24]/80' : 'text-white/50'
                    }`}
                  >
                    {p.subtitle}
                  </div>
                </div>
              </button>
            ))}

            {/* Quick PDF stats card */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2 text-white/70">
              <div className="text-[#e28b27] font-bold text-[11px] uppercase tracking-wider">
                Publishing Specs
              </div>
              <div>• Format: Standard A4 Portrait</div>
              <div>• Color Profile: CMYK Botanical Rich</div>
              <div>• Includes: Official Certificate ID</div>
              <div>• Resolution: 300 DPI Vector Typography</div>
            </div>
          </div>

          {/* Page Preview Viewport */}
          <div className="md:col-span-8 lg:col-span-9 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between bg-black/20">
            {/* Header info for current page */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <div>
                <span className="text-xs text-[#e28b27] font-bold uppercase tracking-wider">
                  Page {page.id} of {PAGES.length}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#f6ede2] m-0">{page.title}</h4>
              </div>

              {/* Prev / Next Pagination Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(c => Math.max(1, c - 1))}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-semibold cursor-pointer disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <span className="text-xs font-mono text-white/60">
                  {currentPage} / {PAGES.length}
                </span>
                <button
                  type="button"
                  disabled={currentPage === PAGES.length}
                  onClick={() => setCurrentPage(c => Math.min(PAGES.length, c + 1))}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 text-xs font-semibold cursor-pointer disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Interactive High-Res Page Render */}
            <div className="my-auto">{page.preview}</div>

            {/* Bottom Download Banner */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-white/60">
                Official PDF generated with vector artwork, botanical seal &amp; serialized registry ID.
              </span>
              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#e28b27] hover:bg-[#cf7b1e] text-[#073b24] shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Icon name="truck" size={15} />
                {downloading ? 'Generating PDF...' : 'Download Complete 6-Page PDF (.pdf)'}
              </button>
            </div>
          </div>
        </div>

        {/* Print-only container rendering all 6 pages for browser window.print() */}
        <div id="botanical-handbook-print-area" className="hidden print:block text-black bg-white p-6">
          {PAGES.map((p, idx) => (
            <div key={p.id} className="print-handbook-page mb-8 border-b-2 border-stone-200 pb-8 last:border-b-0">
              <div className="text-right text-xs text-stone-400 font-mono mb-2">
                Verdana Botanical Care Compendium · Page {idx + 1} of {PAGES.length}
              </div>
              <div>{p.preview}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
