// Builds the resource pages from one template. node tools/build-pages.mjs
// Facts come from founder-ops/partners/collateral-facts-2026-10.md (sources checked 2026-10-03); wording says "expects" and "may request", never "requires".
import fs from 'node:fs';

const START = 'https://evidence-pack-862511025342.us-central1.run.app/start';
const REPO = 'https://github.com/bickfordd-bit/decision-ledger';
const PA = 'https://www.pacodeandbulletin.gov/Display/pabull?file=/secure/pabulletin/data/vol54/54-14/484.html';
const NAIC_BULLETIN = 'https://content.naic.org/sites/default/files/cmte-h-big-data-artificial-intelligence-wg-ai-model-bulletin.pdf.pdf';
const NAIC_WG = 'https://content.naic.org/committees/h/big-data-artificial-intelligence-wg';
const NAIC_PILOT = 'https://content.naic.org/sites/default/files/inline-files/Pilot%20Project%20Summary_1.pdf';

const CSS = `
  :root { --bg: #ffffff; --text: #14202b; --muted: #4c5a67; --line: #dde3e8; --accent: #1f4e79; --soft: #f2f6f9; }
  @media (prefers-color-scheme: dark) { :root { --bg: #0f161c; --text: #e8eef3; --muted: #a8b6c2; --line: #26323c; --accent: #7fb3e0; --soft: #16212a; } }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--text); font: 17px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  main { max-width: 760px; margin: 0 auto; padding: 48px 20px 64px; }
  a { color: var(--accent); }
  .brand { font-weight: 700; color: var(--accent); text-decoration: none; }
  h1 { font-size: clamp(28px, 5.5vw, 38px); line-height: 1.2; margin: 18px 0 12px; }
  h2 { font-size: 21px; margin: 36px 0 10px; }
  p.lead { font-size: 18px; color: var(--muted); }
  ol li, ul li { margin: 8px 0; }
  blockquote { margin: 12px 0; padding: 12px 16px; background: var(--soft); border-left: 3px solid var(--accent); border-radius: 6px; }
  .card { border: 1px solid var(--line); border-radius: 10px; padding: 18px 20px; background: var(--soft); }
  table { border-collapse: collapse; width: 100%; font-size: 15px; }
  th, td { text-align: left; vertical-align: top; padding: 8px 10px; border-bottom: 1px solid var(--line); }
  code, pre { font-family: ui-monospace, Consolas, Menlo, monospace; font-size: 14px; }
  pre { background: var(--soft); padding: 12px; border-radius: 8px; overflow-x: auto; }
  small, footer { color: var(--muted); }
  footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid var(--line); font-size: 14px; }
`;

const page = (p) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${p.title} · bickford</title>
<meta name="description" content="${p.description}">
<link rel="icon" type="image/png" href="favicon.png">
<link rel="canonical" href="https://bickfordd-bit.github.io/bickford-diagnostic/${p.file}">
<style>${CSS}</style>
</head>
<body>
<main>
  <a class="brand" href="index.html">bickford</a>
  <h1>${p.h1}</h1>
  <p class="lead">${p.lead}</p>
${p.body}
  <h2>Related</h2>
  <ul>
    ${PAGES.filter((q) => q.file !== p.file).map((q) => `<li><a href="${q.file}">${q.h1}</a></li>`).join('\n    ')}
    <li><a href="index.html">The AI Workflow Evidence Pack</a>: find out which of these you can evidence today, from one decision-log export.</li>
  </ul>
  <footer>
    Bickford Technologies · Philadelphia, PA · <a href="mailto:bickfordd@gmail.com">bickfordd@gmail.com</a><br>
    A summary for orientation, not legal advice. Sources checked October 3, 2026; read the documents themselves for their exact terms.
  </footer>
</main>
</body>
</html>
`;

const PAGES = [
  {
    file: 'states-adopted-naic-ai-bulletin.html',
    title: 'Which states have adopted the NAIC AI bulletin',
    h1: 'Which states have adopted the NAIC AI Model Bulletin, with bulletin numbers and dates',
    description: "The 25 states and the District of Columbia that have adopted the NAIC Model Bulletin on insurers' use of AI systems, each with its bulletin number and adoption date, plus the four states with their own AI insurance rules. Source: NAIC adoption map, August 31, 2026.",
    lead: "If your company is licensed in any state below, that state's regulator expects a written AI systems program and may ask for its documentation. Twenty-five states and the District of Columbia had adopted the NAIC Model Bulletin as of August 31, 2026; four more states regulate AI in insurance under rules of their own.",
    body: `
  <h2>Adopting states</h2>
  <table>
    <tr><th>State</th><th>Instrument</th><th>Adopted</th></tr>
    <tr><td>Alaska</td><td>Bulletin B 24-01</td><td>February 1, 2024</td></tr>
    <tr><td>Arkansas</td><td>Bulletin 13-2024</td><td>July 31, 2024</td></tr>
    <tr><td>Connecticut</td><td>Bulletin No. MC-25</td><td>February 26, 2024</td></tr>
    <tr><td>Delaware</td><td>Domestic and Foreign Bulletin No. 148</td><td>February 5, 2025</td></tr>
    <tr><td>District of Columbia</td><td>Bulletin 24-IB-002-05/21</td><td>May 21, 2024</td></tr>
    <tr><td>Hawaii</td><td>Insurance Commissioner Memorandum No. 2025-13A</td><td>December 10, 2025</td></tr>
    <tr><td>Illinois</td><td>Company Bulletin 2024-08</td><td>March 13, 2024</td></tr>
    <tr><td>Iowa</td><td>Insurance Division Bulletin 24-04</td><td>November 7, 2024</td></tr>
    <tr><td>Kentucky</td><td>Bulletin No. 2024-02</td><td>April 16, 2024</td></tr>
    <tr><td>Maryland</td><td>Bulletin No. 24-11</td><td>April 22, 2024</td></tr>
    <tr><td>Massachusetts</td><td>Bulletin No. 2024-10</td><td>December 9, 2024</td></tr>
    <tr><td>Michigan</td><td>Bulletin 2024-20-INS</td><td>August 7, 2024</td></tr>
    <tr><td>Mississippi</td><td>Bulletin 2026-9</td><td>July 22, 2026</td></tr>
    <tr><td>Nebraska</td><td>Insurance Guidance Document No. IGD-H1</td><td>issued June 11, 2024</td></tr>
    <tr><td>Nevada</td><td>Bulletin 24-001</td><td>February 23, 2024</td></tr>
    <tr><td>New Hampshire</td><td>Bulletin Docket #INS 24-011-AB</td><td>February 20, 2024</td></tr>
    <tr><td>New Jersey</td><td>Insurance Bulletin No. 25-03</td><td>February 11, 2025</td></tr>
    <tr><td>North Carolina</td><td>Bulletin No. 24-B-19</td><td>December 18, 2024</td></tr>
    <tr><td>Oklahoma</td><td>Bulletin No. 2024-11</td><td>November 14, 2024</td></tr>
    <tr><td>Pennsylvania</td><td>Insurance Notice 2024-04, 54 Pa.B. 1910</td><td>April 6, 2024</td></tr>
    <tr><td>Rhode Island</td><td>Insurance Bulletin No. 2024-03</td><td>March 15, 2024</td></tr>
    <tr><td>Vermont</td><td>Insurance Bulletin No. 229</td><td>March 12, 2024</td></tr>
    <tr><td>Virginia</td><td>Administrative Letter 2024-01</td><td>July 22, 2024</td></tr>
    <tr><td>Washington</td><td>Technical Assistance Advisory 2024-02</td><td>April 22, 2024</td></tr>
    <tr><td>West Virginia</td><td>Insurance Bulletin No. 24-06</td><td>August 9, 2024</td></tr>
    <tr><td>Wisconsin</td><td>Insurance Bulletin</td><td>March 18, 2025</td></tr>
  </table>
  <p>Pennsylvania's version is the one this site covers in detail: <a href="notice-2024-04-checklist.html">the Notice 2024-04 documentation checklist</a>. Wisconsin's bulletin carries no number on the NAIC map. Nebraska issued guidance rather than a bulletin.</p>

  <h2>States with their own AI rules instead</h2>
  <table>
    <tr><th>State</th><th>Instrument</th><th>Issued</th></tr>
    <tr><td>California</td><td>Bulletin 2022-5</td><td>June 30, 2022</td></tr>
    <tr><td>Colorado</td><td>3 CCR 702-10 (amended effective October 15, 2025)</td><td>effective November 13, 2023</td></tr>
    <tr><td>New York</td><td>Insurance Circular Letter No. 7</td><td>July 11, 2024</td></tr>
    <tr><td>Texas</td><td>Bulletin B-0036-20</td><td>September 30, 2020</td></tr>
  </table>

  <h2>What adoption means in practice</h2>
  <p>Each adopting state's instrument tracks the <a href="naic-ai-model-bulletin.html">NAIC Model Bulletin</a>: insurers that use AI systems, including AI embedded in vendor rating, claims or fraud tools, are expected to keep a written AI systems program covering governance, risk management and internal audit, and can be asked for that program and its documentation in an examination. The wording is "expected" and "may request"; the bulletins say they create no new requirements. Twelve of these states piloted the NAIC's examiner evaluation tool from March to September 2026.</p>
  <p>A company licensed in several of these states answers the same questions once; the documentation list is the same list. The <a href="index.html">Evidence Pack</a> scores it in one pass.</p>

  <h2>Source</h2>
  <ul><li>NAIC, "Implementation of NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers," status as of August 31, 2026 (PDF): <a href="https://content.naic.org/sites/default/files/legal-adoption-map-ai-model-bulletin.pdf">content.naic.org</a>. Read October 6, 2026.</li></ul>`,
  },
  {
    file: 'notice-2024-04-checklist.html',
    title: 'Pennsylvania Insurance Notice 2024-04: the AI documentation checklist',
    h1: 'Pennsylvania Insurance Notice 2024-04: the AI documentation checklist',
    description: 'Every document Section 4 of Pennsylvania Insurance Notice 2024-04 says an insurer can expect to be asked for about its AI systems, as a checklist, with the exact item references.',
    lead: 'Section 4 of the Notice lists what the Pennsylvania Insurance Department "may request during an investigation or examination" of an insurer\'s use of AI. Here is that list as a checklist you can tick, item by item, with the Notice\'s own numbering.',
    body: `
  <h2>What the Notice is</h2>
  <p>Published April 6, 2024 (54 Pa.B. 1910), signed by the Insurance Commissioner, adopting the NAIC Model Bulletin on insurers' use of artificial intelligence systems. It covers every "insurer" in the broad statutory sense: insurance companies, exchanges, HMOs, PPOs, hospital and professional health plan corporations, fraternal benefit societies and beneficial associations. It says its guidelines "are not intended to be binding upon insurers," and that its goal "is not to prescribe specific practices or to prescribe specific documentation requirements." It also says, in Section 4, that an insurer "can expect to be asked" for the documents below "in the context of an investigation or market conduct action or at any time determined necessary by the Insurance Commissioner." That last phrase is Pennsylvania's addition; it is not in the NAIC model.</p>

  <h2>The checklist (Section 4)</h2>
  <p>Wording in quotes is the Notice's. Tick what you could hand over this week.</p>
  <h3>1.1 The program itself</h3>
  <ul>
    <li>☐ 1.1(a) "The current written AIS program."</li>
    <li>☐ 1.1(b) "Information and documentation relating to or evidencing the adoption of the AIS program" (board or committee minutes, approvals).</li>
    <li>☐ 1.1(c) "The scope of the insurer's AIS program, including any and all AI systems and technologies whether or not included in or addressed by the AIS program."</li>
    <li>☐ 1.1(d) How the program is "tailored to and proportionate with" the insurer's use of AI, the risk, and the potential harm.</li>
    <li>☐ 1.1(e) "The policies, procedures, guidance, training materials and other information relating to the adoption, implementation, maintenance, monitoring and oversight of the insurer's AIS program," including data governance, model "measurements, standards, or thresholds," and protection of nonpublic information.</li>
  </ul>
  <h3>1.2 Third-party diligence</h3>
  <ul>
    <li>☐ "Information and documentation relating to the insurer's pre-acquisition/pre-use diligence, monitoring, oversight and auditing of data or AI systems developed by a third party."</li>
  </ul>
  <h3>1.3 Governance and the models</h3>
  <ul>
    <li>☐ 1.3(a) "Documentation relating to or evidencing the formation and ongoing operation of the insurer's coordinating bodies for the development, use and oversight of AI systems."</li>
    <li>☐ 1.3(b) Data-practice documentation: lineage, quality, integrity, bias analysis, suitability, data currency.</li>
    <li>☐ 1.3(c)(i) "The insurer's inventories and descriptions of predictive models, and AI systems used by the insurer to make or support decisions that can result in adverse consumer outcomes."</li>
    <li>☐ 1.3(c)(ii) For a specific model under examination: "(1) Documentation of compliance with all applicable AIS program policies, protocols and procedures"; "(2) Information about data used ... including the data source, provenance, data lineage"; "(3) Information related to the techniques, measurements, thresholds and similar controls used by the insurer."</li>
    <li>☐ 1.3(d) "Documentation related to validation, testing and auditing, including evaluation of model drift."</li>
  </ul>
  <h3>2. Third-party AI systems, models and data</h3>
  <ul>
    <li>☐ 2.1 "Due diligence conducted on third parties and their data, models or AI systems."</li>
    <li>☐ 2.2 "Contracts with third-party AI system, model or data vendors, including terms relating to representations, warranties, data security and privacy, data sourcing, intellectual property rights, confidentiality and disclosures, and/or cooperation with regulators."</li>
    <li>☐ 2.3 "Audits or confirmation processes, or both, performed regarding third-party compliance."</li>
    <li>☐ 2.4 "Documentation pertaining to validation, testing and auditing, including evaluation of model drift."</li>
  </ul>

  <h2>What most small and mid-size insurers find</h2>
  <p>The items that exist are usually 1.1(a) in draft, 2.2 (contracts, though rarely with AI-specific terms), and some of 1.3(c)(i) in a spreadsheet. The items that are usually missing are the ones that need <em>records</em> rather than policies: 1.3(c)(ii)(1), compliance evidenced per decision; 1.3(d), testing and drift with dates; and the "measurements, standards, or thresholds" in 1.1(e). Vendor tools for rating, claims triage or fraud scoring count; the Notice covers AI "whether developed by the insurer or embedded within an affiliate or third-party vendor process."</p>

  <h2>Sources</h2>
  <ul>
    <li>Pennsylvania Bulletin, 54 Pa.B. 1910 (April 6, 2024), Insurance Notice 2024-04: <a href="${PA}">pacodeandbulletin.gov</a></li>
    <li>NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers (adopted December 4, 2023): <a href="${NAIC_BULLETIN}">naic.org</a></li>
  </ul>`,
  },
  {
    file: 'naic-ai-model-bulletin.html',
    title: 'The NAIC AI Model Bulletin, explained for insurers',
    h1: 'The NAIC AI Model Bulletin: what it expects insurers to keep',
    description: 'The NAIC Model Bulletin on insurers\' use of AI systems (December 2023): the written AIS program it expects, the four sections, which states adopted it, and the 2026 examiner evaluation tool that follows it.',
    lead: 'Adopted by the NAIC on December 4, 2023 and, as of August 31, 2026, by 25 states and the District of Columbia. Here is what it expects, what it does not, and what examiners are now piloting on top of it.',
    body: `
  <h2>The core expectation, in the Bulletin's words</h2>
  <blockquote>"all Insurers authorized to do business in this state are expected to develop, implement, and maintain a written program (an "AIS Program") for the responsible use of AI Systems that make, or support decisions related to regulated insurance practices."</blockquote>
  <p>The program "should address governance, risk management controls, and internal audit functions," with senior management "accountable to the board or an appropriate committee of the board," proportionate to the insurer's use of AI, covering the whole insurance life cycle and the whole AI life cycle, including systems "developed by the insurer or embedded within an affiliate or third-party vendor process." It may sit inside enterprise risk management and "may adopt, incorporate or rely upon" the NIST AI Risk Management Framework 1.0.</p>

  <h2>The four sections of an AIS program</h2>
  <table>
    <tr><th>Section</th><th>What it covers</th><th>What an examiner would ask to see</th></tr>
    <tr><td>1. General</td><td>Purpose (mitigating adverse consumer outcomes), accountability, proportionality, scope, consumer notice that AI is in use</td><td>The written program and evidence of its adoption</td></tr>
    <tr><td>2. Governance</td><td>Life-cycle policies; documentation requirements "developed with Section 4 in mind"; committees and chains of command; "monitoring, auditing, escalation, and reporting protocols"; training</td><td>Minutes, org charts, escalation records, training records</td></tr>
    <tr><td>3. Risk management and internal controls</td><td>Approvals; data practices (currency, lineage, quality, integrity, bias analysis, suitability); model "inventories and descriptions"; "detailed documentation of the development and use"; assessments including "model drift, and the auditability of these measurements"; validation and retesting; nonpublic information; "data and record retention"</td><td>The inventory, per-model documentation, test results with dates, retention policy, the decision records themselves</td></tr>
    <tr><td>4. Third-party AI systems and data</td><td>Due diligence; contract terms for "audit rights and/or ... audit reports by qualified auditing entities" and cooperation with regulators; exercising those rights</td><td>Diligence files, contracts, SOC 2 or equivalent reports covering the AI</td></tr>
  </table>

  <h2>What it does not do</h2>
  <p>"The goal of the bulletin is not to prescribe specific practices or to prescribe specific documentation requirements." It creates no new law; it tells insurers what regulators expect under existing unfair-trade-practice, claims-settlement, corporate-governance and examination laws, and what they may ask for. States adopt it as a bulletin or notice (Pennsylvania's is <a href="notice-2024-04-checklist.html">Notice 2024-04</a>, nearly word for word).</p>

  <h2>What is happening in 2026</h2>
  <ul>
    <li>Twelve states, Pennsylvania among them, piloted the NAIC's <em>AI Systems Evaluation Tool</em>, a set of optional exhibits for examiners, in market conduct exams, financial analysis and financial exams from March to September 2026, "focusing on using the Tool with domestic insurers."</li>
    <li>The NAIC Big Data and Artificial Intelligence (H) Working Group then exposed the <em>AI Risk Evaluation Supplement v5.0</em>, with the same four-exhibit structure, for comment through September 29, 2026. Exhibit A counts systems and asks for a model inventory with an "Inherent Risk Level"; Exhibit B asks for the AIS program and "whether there is a human in the loop"; Exhibit C asks, per high-risk model, for the "AI model name and version number" and the "last date of model testing"; Exhibit D asks for data sources including vendor names.</li>
    <li>The draft states plainly that ordinary rating models are in scope: "GLMs are not without risk of causing unfair discrimination or other adverse consumer outcomes and require effective governance."</li>
    <li>The March pilot plan was to consider an updated tool for adoption at the Fall National Meeting, November 14–17, 2026. A plan, not a decision.</li>
  </ul>

  <h2>Sources</h2>
  <ul>
    <li>NAIC Model Bulletin (PDF): <a href="${NAIC_BULLETIN}">naic.org</a></li>
    <li>Big Data and Artificial Intelligence (H) Working Group, with the v5.0 draft and the Evaluation Tool 4.0: <a href="${NAIC_WG}">naic.org</a></li>
    <li>Pilot Project Summary, March 2, 2026: <a href="${NAIC_PILOT}">naic.org</a></li>
  </ul>`,
  },
  {
    file: 'not-evidenced.html',
    title: 'What "Not evidenced" means in an AI governance review',
    h1: 'What "Not evidenced" means, and why it is scored like a gap',
    description: 'In an AI governance review, "Not evidenced" means the records did not show a control, not that the control is absent. Why examiners treat it the same as a gap, and how to turn it into a pass.',
    lead: 'Every check in an evidence review ends in one of four states: pass, partial, gap, or not evidenced. The last one surprises people. Here is what it means and why it costs you the same as a gap.',
    body: `
  <h2>The four outcomes</h2>
  <table>
    <tr><th>Outcome</th><th>Meaning</th><th>Example</th></tr>
    <tr><td>Pass</td><td>The records show the control working at or above threshold</td><td>A model version is recorded on 99.9% of decisions</td></tr>
    <tr><td>Partial</td><td>The records show it, below the pass threshold</td><td>A reviewer is recorded on 87% of the decisions the review rule covers</td></tr>
    <tr><td>Gap</td><td>The records show the control is missing or not followed</td><td>Overrides exist and none carries a reason</td></tr>
    <tr><td>Not evidenced</td><td>Nothing submitted shows the control either way</td><td>No answer about an incident process; no reviewer field in the export</td></tr>
  </table>

  <h2>Why it is scored like a gap</h2>
  <p>Because that is how it is treated in the room. An examiner working from Section 4 of <a href="notice-2024-04-checklist.html">Notice 2024-04</a> asks for "documentation of compliance." A control that exists but cannot be shown is, for the purpose of that request, a control that does not exist. The 2026 NAIC examiner draft makes the point structurally: its checklist version "added request to provide document name and page #" for each answer. An answer without a document is not an answer.</p>
  <p>So in a readiness score, Not evidenced counts against you with the same weight as a Gap. The one difference is in the remediation plan: a Gap needs the control built; Not evidenced often needs only the record produced, which is faster and cheaper, if the control is real.</p>

  <h2>The two ways it happens</h2>
  <ol>
    <li><strong>The practice exists; the record does not.</strong> The underwriters do review referrals; the system does not store who reviewed what. The fix is a field, not a policy.</li>
    <li><strong>The answer was "unknown."</strong> Nobody on the call could say whether the incident process covers model errors. The fix is to find out, then write it down.</li>
  </ol>

  <h2>Turning it into a pass</h2>
  <ul>
    <li>Make the decision record carry the evidence: decision ID, timestamp, model and version, output, score, reviewer, override and reason, reason codes on adverse outcomes. Every one of those is a field an examiner can count.</li>
    <li>Answer practice questions with the document name, not an adjective. "Yes: AI policy v1.2, approved by the Risk Committee 2026-03-14" is evidence. "Yes, we have a policy" is not.</li>
    <li>Keep the records tamper-evident, so the evidence survives the question "how do we know nobody changed this?" (See <a href="verify-decision-log.html">how to verify a decision log</a>.)</li>
  </ul>
  <p>The <a href="index.html">Evidence Pack</a> uses exactly this scale: 24 checks, 9 measured from your logs and 15 from your answers, each ending in pass, partial, gap or not evidenced, with the record or the missing record named.</p>`,
  },
  {
    file: 'verify-decision-log.html',
    title: 'How to verify an AI decision log',
    h1: 'How to verify an AI decision log, and prove nobody edited it',
    description: 'How a hash-chained decision log works, how an examiner can verify an exported log with a 40-line script, and why that answers "prove nobody edited it" without trusting the system that wrote it.',
    lead: 'The question behind every AI records request is "show me the decisions, and prove nobody edited them." A hash chain answers the second half with a plain file and a script anyone can read.',
    body: `
  <h2>The problem with ordinary audit logs</h2>
  <p>A database audit log is kept by the same people who run the model. When an examiner asks whether the decision records are complete and unaltered, "we have an audit table" asks them to trust the system under review. The NAIC's 2026 examiner draft asks for a model's "last date of model testing" and whether "there is a human in the loop"; both are claims about records, and records are only evidence if a third party can check them.</p>

  <h2>How a hash chain works</h2>
  <p>Each decision is written as one line of JSON with four parts: the hash of the previous line, the timestamp, the decision itself, and a SHA-256 hash of those three. Because every hash covers the previous hash, changing, deleting or reordering any record changes every hash after it. The first record points at sixty-four zeros.</p>
  <pre>{"prev_hash":"000…000","timestamp":"2026-01-01T09:00:00Z","entry":{"decision_id":"D-0001","model_version":"2.3.0","output":"approve","score":0.37},"hash":"652014cf…"}
{"prev_hash":"652014cf…","timestamp":"2026-01-02T09:01:00Z","entry":{"decision_id":"D-0002",…},"hash":"9b24eccd…"}</pre>
  <p>The export is a text file. Anyone holding a copy, an examiner, an auditor, a reinsurer, can recompute the chain and compare the final hash ("the head") with the one they were given. If the two match, the file is the file. No access to the insurer's systems is needed.</p>

  <h2>Verifying one yourself</h2>
  <p>Two verifiers, about forty lines each, with no dependencies, are published at <a href="${REPO}">github.com/bickfordd-bit/decision-ledger</a> under the MIT license:</p>
  <pre>node verify.mjs ledger.jsonl      # OK: 1231 records, head 04441e32…
python verify.py ledger.jsonl     # same answer, standard library only</pre>
  <p>Both report the first record that fails and why: <code>prev_hash does not match the previous record</code> (a record was removed, inserted or reordered) or <code>hash does not match the record content</code> (a record was edited). The repository includes a 50-record sample ledger and the tests that show both verifiers agree byte for byte.</p>

  <h2>What it proves, and what it does not</h2>
  <ul>
    <li><strong>Proves:</strong> that the records in the export have not been altered since the head hash was recorded. Record the head somewhere the writer cannot change (an email to the auditor, a board minute, a signed PDF) and the proof is complete.</li>
    <li><strong>Does not prove:</strong> who wrote the records, or that the model's decision was correct. Signatures answer the first; validation and testing answer the second. The chain answers the question examiners ask most: is this what happened?</li>
  </ul>

  <h2>Which framework controls a verified log evidences</h2>
  <p>The same repository maps a decision log's fields to the controls they can evidence: ISO/IEC 42001 A.6.2.8 (event logging) and 7.5 (documented information), NIST AI RMF MEASURE 2.8 and MAP 3.5, and EU AI Act Articles 12 (record-keeping), 14 (human oversight) and 26 (deployer obligations). Only control IDs and one-line paraphrases are given; standard text is licensed.</p>
  <p>The <a href="index.html">Evidence Pack</a> replays your exported log into exactly this kind of chain and returns it to you, with the head hash printed in the report, so the report and the records can be checked by someone who did not buy it.</p>`,
  },
];

for (const p of PAGES) fs.writeFileSync(p.file, page(p));
const site = 'https://bickfordd-bit.github.io/bickford-diagnostic/';
const urls = ['index.html', 'examiner-questions.html', ...PAGES.map((p) => p.file)];
fs.writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site}${u === 'index.html' ? '' : u}</loc><lastmod>2026-10-06</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n`);
console.log('built', PAGES.map((p) => p.file).join(', '), '+ sitemap.xml, robots.txt');
