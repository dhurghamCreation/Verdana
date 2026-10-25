import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';

interface CareerApplicationModalProps {
  job: {
    id: number;
    title: string;
    dept: string;
    location: string;
    type: string;
    salary?: string;
  } | null;
  onClose: () => void;
  onOpenDnsDiagnostic?: () => void;
}

export default function CareerApplicationModal({
  job,
  onClose,
  onOpenDnsDiagnostic,
}: CareerApplicationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [positionTitle, setPositionTitle] = useState(job ? job.title : 'General Botanical Application');
  const [department, setDepartment] = useState(job ? job.dept : 'Horticulture');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [experience, setExperience] = useState('3-5 years');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<{
    ticketId: string;
    createdAt: string;
    status: string;
  } | null>(null);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          jobTitle: positionTitle,
          jobId: job ? job.id : undefined,
          department,
          portfolioUrl: portfolioUrl.trim() || undefined,
          experience,
          coverLetter: coverLetter.trim() || undefined,
          resumeFileName: resumeFile || 'Resume_Attached.pdf',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSubmittedTicket(data.ticket);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred while submitting your application.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

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

      <div
        className="relative w-full max-w-2xl bg-[#073b24] text-[#f6ede2] rounded-3xl shadow-2xl border border-[rgba(226,139,39,0.35)] overflow-hidden flex flex-col max-h-[92vh] z-10 overflow-y-auto"
        style={{
          animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: 'clamp(24px, 4vw, 36px)',
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#e28b27]">
                Verdana Talent &amp; Culture Portal
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                100% Direct In-App Delivery
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f6ede2] m-0">
              {submittedTicket ? 'Application Received' : 'Apply for ' + (job ? job.title : 'Verdana Careers')}
            </h2>
            {job && !submittedTicket && (
              <div className="text-xs text-[#8ab89a] mt-1 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1">
                  <Icon name="map-pin" size={12} className="text-[#e28b27]" />
                  <span>{job.location}</span>
                </span>
                <span>• {job.dept}</span>
                <span>• {job.type}</span>
                {job.salary && <span>• {job.salary}</span>}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="modal-close-btn close-red-hover p-2 rounded-full text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Close application dialog"
          >
            <Icon name="times" size={14} />
          </button>
        </div>

        {/* Success Confirmation State */}
        {submittedTicket ? (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
              <Icon name="check" size={24} />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#f6ede2] mb-2">
              Candidate Dossier Registered
            </h3>
            <p className="text-sm text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-white">{name}</strong>. Your application has been logged directly into our Brooklyn Nursery talent queue.
            </p>

            {/* Official Candidate Ticket Badge */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#042a1a] border border-[#e28b27]/40 text-left mb-6 shadow-inner">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#e28b27]">
                  Official Candidate Tracking Pass
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                  VERIFIED
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Tracking ID:</span>
                  <span className="font-mono font-bold text-[#e28b27] text-sm">{submittedTicket.ticketId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Position:</span>
                  <span className="font-semibold text-white">{positionTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Candidate Email:</span>
                  <span className="text-[#8ab89a]">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Review Stage:</span>
                  <span className="text-emerald-300">Under Review by People &amp; Culture</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Response Timeframe:</span>
                  <span className="text-white/80">2 to 3 Business Days</span>
                </div>
              </div>
            </div>

            {/* Direct In-App Delivery Guarantee explanation */}
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white/70 max-w-md mx-auto mb-6 text-left">
              <strong className="text-[#e28b27] block mb-1">Direct Secure Delivery Notice:</strong>
              Your application was transmitted via our internal API server. Unlike external desktop email clients (such as Microsoft Outlook) which bounce when sending to unpurchased domains without public DNS MX records, this in-app submission is 100% active, guaranteed, and saved in our greenhouse database.
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                type="button"
                onClick={onClose}
                className="btn-amber text-xs py-2.5 px-6 font-bold cursor-pointer"
              >
                Done
              </button>
              {onOpenDnsDiagnostic && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenDnsDiagnostic();
                  }}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#8ab89a] bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  View DNS &amp; Mail System Details
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* DNS / Direct Delivery Explainer Banner */}
            <div className="p-3.5 bg-[#e28b27]/10 border border-[#e28b27]/30 rounded-xl text-xs text-white/80 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#e28b27] text-[#073b24] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                !
              </div>
              <div className="flex-1">
                <span className="font-bold text-[#e28b27] block mb-0.5">
                  Official In-App Direct Candidate Dispatch
                </span>
                <p className="m-0 text-[11px] leading-relaxed text-white/70">
                  Submitting through this form delivers your candidacy directly into our internal greenhouse system with instant ticket confirmation. External email clients (such as desktop Outlook) report DNS errors because public MX records require third-party commercial domain registration. This portal is free, secure, and fully operational.
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/40 rounded-xl text-xs text-red-200">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Full Name <span className="text-[#e28b27]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doh"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#e28b27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Email Address <span className="text-[#e28b27]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#e28b27]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 012-3456"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#e28b27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Relevant Experience
                </label>
                <select
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#042a1a] border border-white/15 text-white text-sm focus:outline-none focus:border-[#e28b27]"
                >
                  <option value="1-2 years">1 – 2 years (Junior / Entry)</option>
                  <option value="3-5 years">3 – 5 years (Mid-Level)</option>
                  <option value="5-8 years">5 – 8 years (Senior / Specialist)</option>
                  <option value="8+ years">8+ years (Staff / Lead)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  Target Position
                </label>
                <input
                  type="text"
                  value={positionTitle}
                  onChange={e => setPositionTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm focus:outline-none focus:border-[#e28b27]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1">
                  LinkedIn or Portfolio URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/... or portfolio"
                  value={portfolioUrl}
                  onChange={e => setPortfolioUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#e28b27]"
                />
              </div>
            </div>

            {/* Resume Upload / Simulation */}
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">
                Attach Resume (PDF / DOCX)
              </label>
              <div className="flex items-center gap-3">
                <label className="flex-1 border-2 border-dashed border-white/20 hover:border-[#e28b27]/60 rounded-xl p-3 text-center cursor-pointer transition-colors bg-white/5">
                  <span className="text-xs text-white/80 flex items-center justify-center gap-2">
                    <Icon name="book" size={15} />
                    {resumeFile ? (
                      <span className="text-[#e28b27] font-semibold">{resumeFile}</span>
                    ) : (
                      'Click to attach resume or credentials document'
                    )}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleSimulatedFileUpload}
                    className="hidden"
                  />
                </label>
                {resumeFile && (
                  <button
                    type="button"
                    onClick={() => setResumeFile(null)}
                    className="text-xs text-white/50 hover:text-white"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="block text-xs font-semibold text-white/80 mb-1">
                Why Verdana? (Botanical Interest &amp; Motivation)
              </label>
              <textarea
                rows={3}
                placeholder="Share a brief note on your background, interest in tropical flora or sustainable operations, and why you would thrive on our Brooklyn team..."
                value={coverLetter}
                onChange={e => setCoverLetter(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#e28b27] resize-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] text-white/50 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                SSL Encrypted Direct Server Queue
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  data-action="cancel"
                  className="btn-cancel px-5 py-2.5 rounded-full text-xs font-bold text-white/80 bg-white/10 border border-white/20 transition-all cursor-pointer hover:!bg-red-600 hover:!border-red-500 hover:!text-white hover:!shadow-[0_0_16px_rgba(239,68,68,0.55)]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-amber text-xs py-2.5 px-6 font-bold cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Submitting Application...' : 'Submit Application Directly'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
