import { useState } from 'react';
import Icon, { type IconName } from './Icon';
import CareerApplicationModal from './CareerApplicationModal';
import DnsDiagnosticModal from './DnsDiagnosticModal';

interface CareersProps {
  onOpenDnsDiagnostic?: () => void;
  onApplyJob?: (job: (typeof jobs)[number]) => void;
}

const departments = ['All', 'Horticulture', 'Operations', 'Design', 'Engineering', 'Customer Care', 'Marketing'];

const jobs = [
  {
    id: 1,
    title: 'Senior Botanist',
    dept: 'Horticulture',
    location: 'Brooklyn, NY',
    type: 'Full-time',
    salary: '$78,000–$96,000',
    desc: 'Lead plant health assessments and develop proprietary micro-climate protocols for rare tropical aroids.',
    responsibilities: [
      'Formulate and execute botanical quarantine protocols, biological pest-management regimens, and mycorrhizal soil inoculations for rare aroid cultivars.',
      'Direct nursery specimen micro-climate zoning (PAR light intensity, VPD vapor targets, and relative humidity curves) in our Brooklyn and Newark grow houses.',
      'Co-author official Verdana care compendiums, cultivar passports, and clinical diagnosis keys for customers and greenhouse staff.',
    ],
    qualifications: [
      'M.S. or B.S. in Plant Biology, Horticulture, or Botany (or 5+ years equivalent commercial conservatory or nursery curation).',
      'Deep taxonomic expertise in Araceae, Marantaceae, and Ficus genera, including fungal/bacterial leaf pathology.',
      'Hands-on mastery of biological pest controls (beneficial nematodes, predatory mites) and peat-free living substrate chemistry.',
    ],
  },
  {
    id: 2,
    title: 'Greenhouse Operations Manager',
    dept: 'Operations',
    location: 'Newark, NJ',
    type: 'Full-time',
    salary: '$68,000–$84,000',
    desc: 'Oversee day-to-day nursery cultivation of our 12,000 sq ft facility and climate-safe packaging lines.',
    responsibilities: [
      'Oversee day-to-day nursery cultivation schedules, climate controls, and packing fulfillment pipelines across 12,000 sq ft of high-yield greenhouse.',
      'Manage inventory replenishment schedules, ethical nursery grower partnerships, and logistics delivery SLAs across the Northeast.',
      'Supervise and mentor a team of 14 greenhouse technicians and seasonal apprentices, conducting weekly nursery safety and yield audits.',
    ],
    qualifications: [
      '4+ years managing commercial nursery, greenhouse, or agricultural fulfillment operations.',
      'Proven track record operating automated greenhouse HVAC, automated sub-irrigation benches, and climate-safe packaging lines.',
      'Strong operational leadership with ERP/WMS inventory tracking experience and lean process optimization.',
    ],
  },
  {
    id: 3,
    title: 'Senior Brand & UI/UX Designer',
    dept: 'Design',
    location: 'Remote / NYC',
    type: 'Full-time',
    salary: '$85,000–$110,000',
    desc: 'Shape the visual language and interaction design for verdanaplants.com and mobile plant care tooling.',
    responsibilities: [
      'Lead the end-to-end user experience, interactive plant care tools (Lux calculators, soil matrix), and visual brand language across verdanaplants.com.',
      'Design packaging collateral, botanical passports, printed field guides, and digital specimen companion dashboards in Figma.',
      'Conduct customer usability research and partner with frontend engineers to build accessible, buttery-smooth web interactions.',
    ],
    qualifications: [
      '4+ years designing high-craft e-commerce, digital product experiences, or luxury lifestyle brand interfaces.',
      'Mastery of Figma, responsive design systems, micro-interactions, typography hierarchy, and print-ready vector preparation.',
      'Strong design portfolio demonstrating tasteful restraint, editorial typography, and high-conversion aesthetic sensibility.',
    ],
  },
  {
    id: 4,
    title: 'Full-Stack Software Engineer',
    dept: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$115,000–$145,000',
    desc: 'Build and scale our e-commerce platform and live plant doctor diagnostic services across the Northeast.',
    responsibilities: [
      'Architect and maintain our high-performance React/TypeScript web app, Express/Node backend APIs, and real-time plant doctor consultation queues.',
      'Build bespoke e-commerce tooling, personalized care calendar schedulers, and client-side botanical PDF generation engines.',
      'Ensure 99.9% platform uptime, sub-second page loads, and zero-downtime deployments with continuous integration.',
    ],
    qualifications: [
      '3+ years professional software engineering experience with modern TypeScript, React, Node.js, and REST/RPC architectures.',
      'Strong proficiency in responsive UI rendering, web performance optimization, and relational database schema design.',
      'Familiarity with canvas/PDF rendering, client-side caching, and headless commerce architectures.',
    ],
  },
  {
    id: 5,
    title: 'Plant Doctor & Care Specialist',
    dept: 'Customer Care',
    location: 'Brooklyn, NY',
    type: 'Full-time',
    salary: '$52,000–$62,000',
    desc: 'Provide expert botanical diagnostics and care advice to customers via chat, video, and community consultations.',
    responsibilities: [
      'Provide compassionate, scientifically grounded triage for customer foliage queries via live chat, photo upload diagnosis, and community webinars.',
      'Diagnose root rot, thrips, spider mites, light deficiencies, and nutrient toxicities using our proprietary Brooklyn triage protocol.',
      'Help refine the plant diagnostic algorithm and maintain the public knowledge base of botanical troubleshooting guides.',
    ],
    qualifications: [
      '2+ years customer-facing horticultural support, plant shop management, or Master Gardener certification.',
      'Empathetic, articulate communicator capable of translating complex botanical concepts into accessible home care guidance.',
      'High familiarity with indoor houseplant species, pest life-cycles, and organic pest control remedies.',
    ],
  },
  {
    id: 6,
    title: 'Content & Botanical Editor',
    dept: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    salary: '$55,000–$70,000',
    desc: 'Develop scientific care guides, manage our botanical journal, and grow educational plant parent outreach.',
    responsibilities: [
      'Write, curate, and publish engaging, scientifically accurate long-form articles for our botanical journal and seasonal care compendiums.',
      'Lead newsletter editorial programming, specimen spotlights, and social educational campaigns explaining photobiology and living soil.',
      'Collaborate with botanical scientists and external contributors to ensure rigorous academic accuracy across all publications.',
    ],
    qualifications: [
      '3+ years writing or editing for publication in botanical sciences, home lifestyle journalism, or environmental storytelling.',
      'Flawless editorial pen with ability to blend lyrical aesthetic prose with clear, actionable horticultural science.',
      'Proven experience managing content calendars, SEO strategy for botany terms, and multimedia storytelling.',
    ],
  },
  {
    id: 7,
    title: 'Junior Horticulturalist',
    dept: 'Horticulture',
    location: 'Newark, NJ',
    type: 'Full-time',
    salary: '$46,000–$56,000',
    desc: 'Assist senior botanists with propagation, specimen potting in living soil, and nursery health control.',
    responsibilities: [
      'Execute hands-on specimen potting, root pruning, division, and staking in our custom 5-ingredient organic aroid substrate.',
      'Monitor daily soil moisture levels, misting cycles, and greenhouse cleanliness according to senior botanist instructions.',
      'Assist in preparing live plants for safe shipment with insulated thermal wraps and compostable root ball collars.',
    ],
    qualifications: [
      'Degree or coursework in Horticulture, Environmental Science, or 1+ year practical greenhouse/nursery potting experience.',
      'Eager learner with gentle hands for fragile foliage and stamina for active, hands-on greenhouse work.',
      'Basic knowledge of plant morphology, watering techniques, and common indoor houseplant pests.',
    ],
  },
  {
    id: 8,
    title: 'Packaging & Circularity Lead',
    dept: 'Operations',
    location: 'Brooklyn, NY',
    type: 'Full-time',
    salary: '$62,000–$76,000',
    desc: 'Design and test 100% compostable shipping systems and maintain our B Corp environmental benchmarks.',
    responsibilities: [
      'Design, test, and source 100% compostable and curbside-recyclable packaging systems capable of surviving extreme transit temperatures.',
      'Conduct thermal chamber testing with biodegradable insulation and non-toxic heat packs for winter specimen shipping.',
      'Track and audit our B Corp environmental benchmarks, packaging lifecycle carbon footprints, and zero-plastic nursery goals.',
    ],
    qualifications: [
      '3+ years in packaging engineering, circular materials science, or sustainable supply chain logistics.',
      'Experience with ASTM D6400 compostability standards, paper pulp molds, and cold-chain thermal modeling.',
      'Passion for eliminating single-use plastics from consumer e-commerce and scaling closed-loop return systems.',
    ],
  },
];

const perks = [
  { icon: 'leaf' as IconName, title: 'Botanical Allowance', desc: '$600/year to nurture your personal indoor plant collection' },
  { icon: 'health' as IconName, title: 'Comprehensive Health', desc: '100% employer-covered premium medical, dental, and vision' },
  { icon: 'book' as IconName, title: 'Learning & Field Stipend', desc: '$1,500 annually for botanical gardens, courses, and conferences' },
  { icon: 'globe' as IconName, title: 'Hybrid & Remote', desc: 'Work-from-home flexibility with quiet greenhouse workspaces' },
  { icon: 'recycle' as IconName, title: 'Volunteer Eco-Days', desc: '3 paid days per year for urban gardening and conservation work' },
  { icon: 'chart' as IconName, title: 'Equity Ownership', desc: 'Stock options and B Corp performance profit-sharing' },
];

export default function Careers({ onOpenDnsDiagnostic, onApplyJob }: CareersProps) {
  const [activeDept, setActiveDept] = useState('All');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [applyingJob, setApplyingJob] = useState<(typeof jobs)[number] | null>(null);
  const [showInternalDnsModal, setShowInternalDnsModal] = useState(false);

  const filtered = activeDept === 'All' ? jobs : jobs.filter(j => j.dept === activeDept);

  const handleApply = (job: (typeof jobs)[number]) => {
    // Direct in-app application flow replaces old mailto that caused external Outlook DNS error
    if (onApplyJob) {
      onApplyJob(job);
    } else {
      setApplyingJob(job);
    }
  };

  const handleOpenDns = () => {
    if (onOpenDnsDiagnostic) onOpenDnsDiagnostic();
    else setShowInternalDnsModal(true);
  };

  return (
    <section id="careers" style={{ background: '#f6ede2', padding: 'clamp(80px, 12vh, 130px) 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Hero header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="reveal">
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#5a8a6a',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              Careers at Verdana
            </span>
            <h2
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 700,
                color: '#073b24',
                margin: '0 0 20px',
                lineHeight: 1.08,
                letterSpacing: '-0.025em',
              }}
            >
              Grow a career<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#5a8a6a' }}>
                you love
              </em>
            </h2>
            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.72,
                color: '#5a8a6a',
                margin: '0 0 24px',
                maxWidth: '480px',
              }}
            >
              We're a 48-person team of botanists, developers, designers, and plant enthusiasts building the future of sustainable flora retail. Join us in cultivating spaces that bring people closer to nature.
            </p>

            {/* In-App Direct Application & DNS Guarantee Badge */}
            <div className="p-4 bg-[#073b24]/5 border border-[#073b24]/15 rounded-2xl mb-6 max-w-lg">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#073b24]">
                  Official In-App Application Portal Active
                </span>
              </div>
              <p className="text-xs text-[#5a8a6a] m-0 leading-relaxed mb-3">
                All candidates apply directly through our verified web portal with instant candidate tracking numbers (<strong>VRD-CAREER-XXXXXX</strong>). Submissions are recorded live in our Brooklyn Nursery database.
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  type="button"
                  onClick={() => setApplyingJob(jobs[0])}
                  className="btn-amber text-xs py-2 px-4 font-bold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Icon name="book" size={14} /> Submit Application
                </button>
                <button
                  type="button"
                  onClick={handleOpenDns}
                  className="text-xs text-[#073b24] underline hover:text-[#e28b27] font-semibold cursor-pointer py-1 px-2"
                >
                  Outlook DNS Delivery Notice &amp; Diagnostics →
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ padding: '14px 22px', background: '#073b24', borderRadius: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#e28b27', lineHeight: 1 }}>48</div>
                <div style={{ fontSize: '12px', color: 'rgba(246,237,226,0.65)', marginTop: '4px' }}>Team Members</div>
              </div>
              <div style={{ padding: '14px 22px', background: '#073b24', borderRadius: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#e28b27', lineHeight: 1 }}>4.8</div>
                <div style={{ fontSize: '12px', color: 'rgba(246,237,226,0.65)', marginTop: '4px' }}>Team Culture Rating</div>
              </div>
              <div style={{ padding: '14px 22px', background: '#073b24', borderRadius: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '28px', fontWeight: 700, color: '#e28b27', lineHeight: 1 }}>91.4</div>
                <div style={{ fontSize: '12px', color: 'rgba(246,237,226,0.65)', marginTop: '4px' }}>B Impact Score</div>
              </div>
            </div>
          </div>

          <div className="reveal-right" style={{ borderRadius: '24px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 20px 50px rgba(7,59,36,0.12)' }}>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=500&fit=crop&auto=format"
              alt="Verdana team collaborating in the greenhouse studio"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Perks Grid */}
        <div className="mb-16 reveal">
          <h3
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(24px, 3vw, 34px)',
              fontWeight: 700,
              color: '#073b24',
              marginBottom: '24px',
            }}
          >
            Nurturing our people
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {perks.map((p, i) => (
              <div
                key={p.title}
                className={`feature-card reveal delay-${i + 1}`}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '22px',
                }}
              >
                <span className="section-icon">
                  <Icon name={p.icon} size={22} />
                </span>
                <h4
                  style={{
                    fontFamily: "'Fraunces', Georgia, serif",
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#073b24',
                    margin: '0 0 6px',
                  }}
                >
                  {p.title}
                </h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#5a8a6a', margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Roles */}
        <div className="reveal">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <h3
              style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(24px, 3vw, 34px)',
                fontWeight: 700,
                color: '#073b24',
                margin: 0,
              }}
            >
              Open Positions{' '}
              <span style={{ fontSize: '16px', fontWeight: 400, color: '#5a8a6a' }}>
                ({filtered.length} roles)
              </span>
            </h3>

            <button
              type="button"
              onClick={() => handleApply({
                id: 99,
                title: 'Open Botanical Application',
                dept: 'General',
                location: 'Brooklyn, NY / Remote',
                type: 'Full-time / Part-time',
                salary: 'Competitive',
                desc: 'General talent pool application for botany, operations, engineering, and design.',
                responsibilities: [
                  'Bring your domain expertise to cross-functional botanical, logistics, and digital projects.',
                  'Collaborate with our Brooklyn nursery and digital studio to cultivate exceptional flora experiences.',
                  'Help champion regenerative B Corp benchmarks and sustainable flora retail practices.',
                ],
                qualifications: [
                  'Curiosity, botanical empathy, and demonstrable high-craft execution in your craft.',
                  'Clear communication, collaborative mindset, and comfort with fast-moving nursery environments.',
                  'Passion for indoor horticulture and sustainable urban living.',
                ],
              })}
              className="text-xs font-bold text-[#073b24] hover:text-[#e28b27] transition-colors cursor-pointer"
            >
              Don&apos;t see your role? Submit an open application →
            </button>
          </div>

          {/* Department Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {departments.map(d => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '40px',
                  border: '1.5px solid',
                  fontSize: '13px',
                  fontWeight: 500,
                  transition: 'all 0.25s ease',
                  borderColor: activeDept === d ? '#073b24' : 'rgba(7,59,36,0.18)',
                  background: activeDept === d ? '#073b24' : 'transparent',
                  color: activeDept === d ? '#f6ede2' : '#073b24',
                  cursor: 'pointer',
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Jobs List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(job => (
              <div
                key={job.id}
                className="job-card"
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '20px 24px',
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                      <h4
                        style={{
                          fontFamily: "'Fraunces', Georgia, serif",
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#073b24',
                          margin: 0,
                        }}
                      >
                        {job.title}
                      </h4>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: '20px',
                          background: 'rgba(7,59,36,0.08)',
                          color: '#5a8a6a',
                        }}
                      >
                        {job.dept}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '3px 10px',
                          borderRadius: '20px',
                          background: 'rgba(226,139,39,0.12)',
                          color: '#e28b27',
                        }}
                      >
                        {job.type}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <span className="job-meta">
                        <Icon name="map-pin" size={14} />
                        {job.location}
                      </span>
                      <span className="job-meta">
                        <Icon name="dollar" size={14} />
                        {job.salary}
                      </span>
                    </div>

                    {selectedJob === job.id && (
                      <div className="job-details">
                        <p>{job.desc}</p>
                        <div>
                          <section>
                            <h5>Core Responsibilities</h5>
                            <ul>
                              {job.responsibilities.map((resp, idx) => (
                                <li key={idx}>{resp}</li>
                              ))}
                            </ul>
                          </section>
                          <section>
                            <h5>Qualifications</h5>
                            <ul>
                              {job.qualifications.map((qual, idx) => (
                                <li key={idx}>{qual}</li>
                              ))}
                            </ul>
                          </section>
                        </div>
                        <footer>
                          <span>Reports to Department Lead</span>
                          <span>Applications reviewed weekly</span>
                          <span>B Corp benefits included</span>
                        </footer>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexShrink: 0, alignItems: 'center' }}>
                    <button
                      onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                      style={{
                        padding: '9px 18px',
                        borderRadius: '40px',
                        border: '1.5px solid rgba(7,59,36,0.2)',
                        background: 'transparent',
                        color: '#073b24',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {selectedJob === job.id ? 'Hide Details ↑' : 'View Role ↓'}
                    </button>
                    <button
                      className="btn-amber"
                      onClick={() => handleApply(job)}
                      style={{ fontSize: '13px', padding: '9px 20px' }}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* In-App Direct Application Modal */}
      {applyingJob && (
        <CareerApplicationModal
          job={applyingJob}
          onClose={() => setApplyingJob(null)}
          onOpenDnsDiagnostic={handleOpenDns}
        />
      )}

      {/* Internal DNS Diagnostic Modal */}
      {showInternalDnsModal && (
        <DnsDiagnosticModal
          onClose={() => setShowInternalDnsModal(false)}
          onOpenCareers={() => {
            setShowInternalDnsModal(false);
            setApplyingJob(jobs[0]);
          }}
          onOpenPress={() => {
            setShowInternalDnsModal(false);
            window.dispatchEvent(new CustomEvent('verdana:open-support', { detail: { department: 'press' } }));
          }}
        />
      )}
    </section>
  );
}
