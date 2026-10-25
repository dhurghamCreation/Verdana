import { useState } from 'react';
import type { DiagnosticResult } from '../types';
import Icon from './Icon';

interface PlantDoctorModalProps {
  onClose: () => void;
  defaultPlantName?: string;
}

const COMMON_SYMPTOMS = [
  'Yellowing lower leaves',
  'Brown crispy leaf tips/edges',
  'Drooping or limp stems',
  'Mushy or blackened stem base',
  'Pale or faded leaf color',
  'Sudden leaf drop',
  'Fine webbing on leaf undersides',
  'Sticky residue or tiny white spots',
];

export default function PlantDoctorModal({
  onClose,
  defaultPlantName = 'Monstera Deliciosa',
}: PlantDoctorModalProps) {
  const [plantName, setPlantName] = useState(defaultPlantName);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Yellowing lower leaves']);
  const [light, setLight] = useState('Bright indirect');
  const [wateringFrequency, setWateringFrequency] = useState('Weekly');
  const [humidity, setHumidity] = useState('Dry indoor heating (30%-40%)');
  const [customNotes, setCustomNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState('');

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plantName.trim()) {
      setError('Please provide the name of the plant.');
      return;
    }
    if (selectedSymptoms.length === 0) {
      setError('Select at least one symptom for analysis.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/doctor/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plantName,
          symptoms: selectedSymptoms,
          environment: { light, wateringFrequency, humidity },
          customNotes,
        }),
      });

      const data = await res.json();
      if (data.result) {
        setResult(data.result);
      } else {
        throw new Error('Diagnosis unavailable');
      }
    } catch {
      setError('Failed to reach botanical diagnostic server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[7500] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#042a1a]/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#f6ede2] rounded-3xl shadow-2xl border border-[rgba(7,59,36,0.15)] p-6 sm:p-8"
        style={{ animation: 'scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Close Button with Running Red Hover */}
        <button
          onClick={onClose}
          className="modal-close-btn close-red-hover absolute top-5 right-5 w-9 h-9 rounded-full bg-white text-[#073b24] shadow flex items-center justify-center border border-[rgba(7,59,36,0.15)] font-bold text-sm cursor-pointer"
          aria-label="Close diagnostic clinic"
          title="Close window"
        >
          <Icon name="times" size={14} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#073b24] text-[#e28b27] flex items-center justify-center shadow">
            <Icon name="stethoscope" size={24} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#e28b27]">
              Horticultural Triage &amp; Clinic
            </span>
            <h2
              id="doctor-title"
              className="text-2xl sm:text-3xl font-bold text-[#073b24]"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Verdana Plant Doctor
            </h2>
          </div>
        </div>

        <p className="text-sm text-[#5a8a6a] mb-6 leading-relaxed">
          Describe what you're noticing with your plant. Our botanical diagnosis engine analyzes foliar symptoms, soil moisture levels, and room conditions to deliver an immediate recovery prescription.
        </p>

        {!result ? (
          <form onSubmit={handleDiagnose} className="space-y-5">
            {/* Plant selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#073b24] mb-1.5">
                Plant Name or Variety
              </label>
              <input
                type="text"
                value={plantName}
                onChange={e => setPlantName(e.target.value)}
                placeholder="e.g. Monstera Deliciosa, Fiddle Leaf Fig, Pothos"
                required
                className="w-full px-4 py-2.5 bg-white border border-[rgba(7,59,36,0.18)] rounded-xl text-sm font-medium text-[#073b24] outline-none focus:border-[#e28b27] focus:ring-2 focus:ring-[#e28b27]/20"
              />
            </div>

            {/* Symptoms checklist */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#073b24] mb-2">
                Observed Symptoms (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COMMON_SYMPTOMS.map(sym => {
                  const active = selectedSymptoms.includes(sym);
                  return (
                    <button
                      type="button"
                      key={sym}
                      onClick={() => toggleSymptom(sym)}
                      className={`text-left text-xs p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        active
                          ? 'bg-[#073b24] text-[#f6ede2] border-[#073b24] shadow-sm'
                          : 'bg-white text-[#073b24] border-[rgba(7,59,36,0.14)] hover:border-[#e28b27]'
                      }`}
                    >
                      <span>{sym}</span>
                      {active && <Icon name="check" size={13} className="text-[#e28b27] ml-1 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Environment details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5a8a6a] mb-1">
                  Lighting
                </label>
                <select
                  value={light}
                  onChange={e => setLight(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-[rgba(7,59,36,0.18)] rounded-lg outline-none"
                >
                  <option value="Bright indirect">Bright Indirect (near window)</option>
                  <option value="Medium indirect">Medium Indirect</option>
                  <option value="Low light / interior">Low Light / Deep interior</option>
                  <option value="Direct harsh sun">Direct Harsh Sun</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5a8a6a] mb-1">
                  Water Frequency
                </label>
                <select
                  value={wateringFrequency}
                  onChange={e => setWateringFrequency(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-[rgba(7,59,36,0.18)] rounded-lg outline-none"
                >
                  <option value="Every 2-3 days">Every 2–3 Days</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Every 2 weeks">Every 2 Weeks</option>
                  <option value="Rarely / Once a month">Once a Month or Less</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#5a8a6a] mb-1">
                  Air Humidity
                </label>
                <select
                  value={humidity}
                  onChange={e => setHumidity(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-[rgba(7,59,36,0.18)] rounded-lg outline-none"
                >
                  <option value="Standard apartment (40%-50%)">Standard (40%–50%)</option>
                  <option value="Dry indoor heating (30%-40%)">Dry Heating (under 40%)</option>
                  <option value="High / Humidifier (60%+)">{`Humid (60%+)`}</option>
                </select>
              </div>
            </div>

            {/* Additional notes */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-[#073b24] mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                value={customNotes}
                onChange={e => setCustomNotes(e.target.value)}
                placeholder="When did symptoms begin? Any recent repotting or fertilizer?"
                rows={2}
                className="w-full px-3 py-2 bg-white border border-[rgba(7,59,36,0.18)] rounded-xl text-xs text-[#073b24] outline-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-amber flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Running Botanical Analysis...</span>
                </>
              ) : (
                <>
                  <span>Generate Diagnostic Prescription</span>
                  <Icon name="arrow-right" size={14} />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Diagnosis Result Card */
          <div className="space-y-5 animate-fadeIn">
            {/* Top Severity Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                result.severity === 'urgent'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : result.severity === 'moderate'
                  ? 'bg-amber-50 border-amber-200 text-amber-900'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest block opacity-75">
                  Diagnosis Result · {result.confidence}% Confidence
                </span>
                <h3
                  className="text-lg font-bold"
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                >
                  {result.diagnosis}
                </h3>
              </div>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  result.severity === 'urgent'
                    ? 'bg-rose-200 text-rose-800'
                    : result.severity === 'moderate'
                    ? 'bg-amber-200 text-amber-800'
                    : 'bg-emerald-200 text-emerald-800'
                }`}
              >
                {result.severity} Priority
              </span>
            </div>

            {/* Immediate 24-Hour Directive */}
            <div className="p-4 bg-white rounded-2xl border border-[rgba(7,59,36,0.1)] shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#e28b27] flex items-center gap-1.5 mb-1">
                <Icon name="bell" size={14} /> Immediate Action (Next 24 Hours)
              </div>
              <p className="text-sm font-semibold text-[#073b24]">
                {result.immediateAction}
              </p>
            </div>

            {/* Probable Causes */}
            <div className="p-4 bg-white rounded-2xl border border-[rgba(7,59,36,0.1)]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#5a8a6a] mb-2">
                Probable Contributing Causes
              </div>
              <ul className="text-xs text-[#073b24] space-y-1">
                {result.probableCauses.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#e28b27]">◆</span> {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Recovery Plan */}
            <div className="p-4 bg-[#073b24] text-white rounded-2xl shadow-md">
              <div className="text-xs font-bold uppercase tracking-wider text-[#e28b27] mb-2">
                Botanical Recovery Protocol
              </div>
              <ol className="text-xs space-y-2 text-white/90">
                {result.recoveryPlan.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#e28b27] text-[#073b24] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Water & Light Advice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[rgba(7,59,36,0.1)]">
                <div className="font-bold text-[#073b24] flex items-center gap-1 mb-1">
                  <Icon name="droplet" size={14} /> Moisture Prescription
                </div>
                <p className="text-[#5a8a6a] leading-relaxed">{result.wateringAdvice}</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[rgba(7,59,36,0.1)]">
                <div className="font-bold text-[#073b24] flex items-center gap-1 mb-1">
                  <Icon name="sun" size={14} /> Lighting Prescription
                </div>
                <p className="text-[#5a8a6a] leading-relaxed">{result.lightAdvice}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setResult(null)}
                className="px-5 py-2.5 rounded-full border border-[rgba(7,59,36,0.2)] text-[#073b24] text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Icon name="arrow-left" size={13} />
                <span>Test Another Plant</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn-amber text-xs"
              >
                Close &amp; Follow Protocol
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
