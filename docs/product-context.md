# SafeSock product context and priorities

## Scope of this website

This repository currently contains the public landing page. Its job is to explain the product direction; the clinical application is future work. The page preserves the requested video hero and replaces the DesignPro placeholder copy with SafeSock messaging.

Working positioning: **a connected recovery workspace that gives clinicians a clearer view of movement and loading between visits, while reducing coordination work for patients and care teams.** “See more. Care better.” expresses the intended benefit, not a measured claim about patient throughput or outcomes.

## Reference repository

Reviewed [cs280sp26-homework/safesock](https://github.com/cs280sp26-homework/safesock) at commit [`2bd7e1879dd31bdca35e840e4a6ee53e168f367f`](https://github.com/cs280sp26-homework/safesock/tree/2bd7e1879dd31bdca35e840e4a6ee53e168f367f).

| Evidence | What it contributes |
| --- | --- |
| [`src/routes/index.tsx`](https://github.com/cs280sp26-homework/safesock/blob/2bd7e1879dd31bdca35e840e4a6ee53e168f367f/src/routes/index.tsx) | Positions SafeSock around monitoring loading and recovery outside the clinic. |
| [`src/routes/approach.tsx`](https://github.com/cs280sp26-homework/safesock/blob/2bd7e1879dd31bdca35e840e4a6ee53e168f367f/src/routes/approach.tsx) | Describes a pressure-sensing sleeve for a cast, boot, or brace, a patient app, and a clinician dashboard. This is product positioning, not independent verification of hardware, accuracy, or regulatory status. |
| [`src/routes/data.tsx`](https://github.com/cs280sp26-homework/safesock/blob/2bd7e1879dd31bdca35e840e4a6ee53e168f367f/src/routes/data.tsx) | Demonstrates an 11-position plantar-pressure visualization, weekly loading trends, and care-team notes. `WEEK_LOADS`, `WEEK_SENSORS`, and notes are hard-coded; the UI’s “live” labels do not establish a working sensor integration. |
| [`src/routes/demo.tsx`](https://github.com/cs280sp26-homework/safesock/blob/2bd7e1879dd31bdca35e840e4a6ee53e168f367f/src/routes/demo.tsx) | Plays an existing demo video. It does not implement telehealth or a 3D assessment pipeline. |

The reference supports the wearable-and-dashboard direction. The files reviewed do not establish working telehealth, patient scheduling, live 3D capture, or joint-force estimation. The public page therefore presents those as planned capabilities. The reference contact form prevents submission; no verified contact endpoint was carried over.

## Requested workflows

1. **Review gait and weight-bearing.** Show pressure distribution and longitudinal loading, plus movement recordings and derived gait metrics once the necessary sensing is available. Include units, timestamps, data quality, and the clinician’s prescribed loading range. Deriving cadence, stance/swing timing, or bilateral symmetry requires validated time-series inputs; the reference’s weekly arrays are insufficient.
2. **Meet patients remotely.** Support an individual video visit first, then clinician-led sessions with multiple patients when appropriate. Keep each patient’s measurements and notes isolated; a clinician selecting a patient must select that patient’s video, sensor stream, model, and chart together.
3. **Explore movement in 3D.** Let the clinician rotate, zoom, choose a joint, inspect estimated angles, and replay synchronized movement and loading. Rotating a rendered avatar does not recover body parts the camera failed to observe. A useful viewer and validated movement capture are separate milestones.
4. **Understand joint loading.** Treat internal joint-force estimation as a distinct modeling and validation effort. Preserve the distinction among sensor pressure, estimated external loading, joint moments, and estimated joint reaction forces.
5. **Let patients choose a clinician and schedule.** Interpreting “patients can select them” as clinician selection: provide clinician profiles, availability, appointment types, intake, booking, cancellation, and rescheduling. Match selection to clinician coverage and care-team routing rules. Reduce routine front-desk work while retaining an assistance path for patients who need help.

## Efficiency features worth prioritizing

These are product recommendations and hypotheses to test with care teams.

| Priority | Capability | Intended benefit | Useful success measure |
| --- | --- | --- | --- |
| 1 | Recorded movement check-ins with loading snapshots | Routine progress can be reviewed without coordinating a full appointment. | Clinician review minutes per completed check-in; escalation rate. |
| 1 | Patient summaries showing changes since last review | Reduce chart searching and repeated history-taking. | Preparation time; summary corrections and omissions. |
| 1 | A review queue with clear reasons, assignments, and due times | Help the team focus attention and avoid duplicate work. Clinicians define thresholds and review recommendations. | Time to acknowledgement, overdue reviews, false alerts, duplicate work. |
| 1 | Pre-visit intake and camera/sensor readiness checks | Catch missing information and setup problems before the visit. | Late starts, failed capture sessions, support requests. |
| 2 | Self-service booking, reminders, rescheduling, and a cancellation waitlist | Reduce phone calls and unused appointment slots. | Scheduling contacts per visit, no-shows, filled cancellations. |
| 2 | Draft visit notes and structured handoffs for clinician approval | Reduce repeated documentation while preserving accountability. | Editing time, correction rate, unsigned notes. |
| 3 | Selected group sessions with private follow-up | Potentially share education and supervised activities across an appropriate cohort. | Clinician time per participant, patient experience, need for individual follow-up. |

Track total clinician time, including asynchronous review and documentation. More appointments alone would not demonstrate greater efficiency. Establish a baseline before advertising time saved, increased capacity, or better outcomes.

## Difficult engineering work

### Useful measurements

Sensor calibration, fit, drift, left/right identification, and timestamp alignment matter before drawing conclusions from pressure maps. Distinguish a missing reading from a true low value. A visually smooth interpolated heatmap should not imply measurement resolution beyond the sensors. Validate derived gait metrics against an appropriate reference protocol.

### 3D capture and synchronization

Camera angle, occlusion, lighting, clothing, mobility aids, and device differences can affect capture. Select and validate a capture method before committing to live anatomical measurements. Show capture quality, flag uncertain estimates, and offer re-recording. Put video, pose estimates, and sensor readings on a common timeline; handle latency and missing frames explicitly. First prove this with recorded clips, then extend it to live sessions.

### Force through a joint

Foot pressure alone does not directly measure internal joint force. Inverse dynamics uses motion and external forces to estimate net joint moments; joint reaction analysis additionally depends on modeled internal forces, including muscle contributions. The product implication is to develop and validate a separate estimation pipeline before presenting a joint-force readout. Define the requested force quantity and coordinate frame with clinicians, show units and uncertainty, and label model estimates clearly. [OpenSim joint reaction analysis](https://opensimconfluence.atlassian.net/wiki/spaces/OpenSim/pages/53089600)

Subject-specific scaling and motion quality also influence modeled joint angles. A rotatable model is an interaction feature; measurement accuracy must be evaluated separately. [OpenSim inverse kinematics](https://opensimconfluence.atlassian.net/wiki/spaces/OpenSim/pages/53090032/Getting%20Started%20with%20Inverse%20Kinematics)

### Several patients in a live session

Multiple streams increase bandwidth, synchronization, and attention demands. Start with individual visits; evaluate group size with clinicians. A group session needs explicit participant consent, controlled admission, accessible mute/camera controls, private measurements, and a way to move a patient into individual follow-up. Avoid showing one patient’s clinical data to another by default.

### Booking without routine staff intervention

The hard parts are concurrent slot reservation, time zones, appointment eligibility, clinician availability changes, cancellations, and external calendar consistency. Use a real availability source and atomic reservations. A patient must not receive confirmation until the booking exists. Intake and reminders should follow the confirmed appointment state.

### Clinical workflow boundaries

Before introducing real patient information, define patient/care-team access, audit history, retention, and session consent. Any summary or prioritization feature should expose its underlying information and remain subject to clinician review. These are application requirements; the current landing page neither handles patient data nor performs clinical assessment.

## Recommended build order

1. **This landing page:** communicate the wearable, connected recovery direction, patient experience, and roadmap honestly.
2. **Clinician workflow prototype:** use clearly labeled sample data to test the patient list, summary, recorded gait review, pressure trends, and review queue with clinicians.
3. **Patient workflow:** implement clinician selection, booking, intake, device readiness, and an individual video visit with an authorized backend.
4. **Recorded 3D assessment:** establish synchronized replay, model interaction, angle definitions, capture-quality feedback, and validation.
5. **Live and group extensions:** extend validated individual workflows; evaluate group suitability and attention demands.
6. **Joint-loading research:** define the desired measurement and validation plan early, then ship estimates only once the required sensing and modeling are substantiated.

No scheduling, video conferencing, clinical data ingestion, 3D capture, or force-estimation service is implemented by this landing-page change.
