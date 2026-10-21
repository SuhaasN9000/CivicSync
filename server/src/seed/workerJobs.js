// Extra dummy jobs so every worker has 5 assigned complaints in total
// (2 in progress + 3 resolved, counting the ones already in data.js).

const IMAGES = {
  'Roads & Infrastructure': [
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621544402532-78c290378588?w=600&auto=format&fit=crop&q=80'
  ],
  'Sanitation & Waste': [
    'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80'
  ],
  'Water Supply': [
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=80'
  ],
  'Electrical & Lighting': [
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80'
  ]
};

// [workerId, status, category, title, description, location, landmark, ward, priority, reportedAt, workerNotes]
const JOBS = [
  // W-101 Ramesh Patil — Road Maintenance (already has CS-101 in progress)
  ['W-101', 'In Progress', 'Roads & Infrastructure', 'Broken Speed Breaker near Primary School', 'Speed breaker crumbled, vehicles speeding past the school gate during drop-off hours.', 'Tilak Road, Ward 12', 'Opposite Municipal School No. 7', 'Ward 12', 'High', '2026-10-02T08:40', 'Old breaker scraped. Fresh concrete laid, curing in progress.'],
  ['W-101', 'Resolved', 'Roads & Infrastructure', 'Caved-in Footpath Slab at Bus Depot', 'Footpath slab collapsed into the drain below, pedestrians forced onto the road.', 'Swargate Depot Lane, Ward 12', 'Near Platform 4 exit', 'Ward 12', 'Medium', '2026-09-18T10:20', 'Replaced 3 broken slabs with precast RCC slabs and levelled the edges.'],
  ['W-101', 'Resolved', 'Roads & Infrastructure', 'Series of Potholes on Station Approach Road', 'Five potholes in a 50m stretch, filled with rainwater and hard to see at night.', 'Station Approach Road, Ward 12', 'Before railway over-bridge', 'Ward 12', 'High', '2026-09-12T07:55', 'All 5 potholes patched with hot-mix asphalt and compacted.'],
  ['W-101', 'Resolved', 'Roads & Infrastructure', 'Missing Manhole Cover on Main Road', 'Open manhole in the middle of the lane, extremely dangerous for two-wheelers.', 'Laxmi Road, Ward 12', 'Outside Saraswati Jewellers', 'Ward 12', 'Urgent', '2026-09-08T19:10', 'Installed new heavy-duty ductile iron cover with locking frame.'],

  // W-102 Sunil Shinde — Sanitation & Waste
  ['W-102', 'In Progress', 'Sanitation & Waste', 'Garbage Not Collected for a Week in Lane 6', 'Door-to-door garbage collection van has skipped Lane 6 for seven days.', 'Lane 6, Prabhat Road, Ward 12', 'Near Krishna Apartments', 'Ward 12', 'High', '2026-10-03T09:00', 'Van rerouted. Backlog collection started, 2 of 4 buildings cleared.'],
  ['W-102', 'In Progress', 'Sanitation & Waste', 'Construction Debris Dumped on Footpath', 'Large pile of bricks and rubble blocking the footpath for over a week.', 'FC Road, Ward 12', 'Near Goodluck Cafe signal', 'Ward 12', 'Medium', '2026-10-04T11:30', 'JCB requested. Manual loading of smaller debris underway.'],
  ['W-102', 'Resolved', 'Sanitation & Waste', 'Dead Animal Carcass on Roadside', 'Carcass lying near the park entrance for 2 days, strong smell spreading.', 'Sambhaji Park Road, Ward 12', 'Park Gate 2', 'Ward 12', 'Urgent', '2026-09-21T07:15', 'Carcass removed hygienically and area disinfected with lime and bleach.'],
  ['W-102', 'Resolved', 'Sanitation & Waste', 'Public Toilet Not Cleaned', 'Community toilet block is unusable, no water and not cleaned for days.', 'Kamgar Nagar, Ward 12', 'Beside ration shop', 'Ward 12', 'High', '2026-09-15T08:30', 'Deep cleaning done, water tank refilled, cleaning schedule posted.'],
  ['W-102', 'Resolved', 'Sanitation & Waste', 'Burning of Garbage in Open Plot', 'Residents burning waste every evening, smoke entering nearby homes.', 'Open plot behind Shanti Nagar, Ward 12', 'Behind Shanti Nagar Society', 'Ward 12', 'Medium', '2026-09-10T18:45', 'Waste cleared, plot fenced off and a No Dumping board installed.'],

  // W-103 Vikram Kadam — Water Works (already has CS-104 in progress)
  ['W-103', 'In Progress', 'Water Supply', 'Low Water Pressure in Entire Society', 'Water pressure very low for 10 days, upper floors receiving no water at all.', 'Kothrud Housing Society, Ward 14', 'Near Karve Statue', 'Ward 14', 'High', '2026-10-01T06:50', 'Partially blocked valve found on feeder line. Replacement valve ordered.'],
  ['W-103', 'Resolved', 'Water Supply', 'Contaminated Muddy Tap Water', 'Brown muddy water coming from taps since morning, unsafe to drink.', 'Erandwane, Ward 14', 'Near Mhatre Bridge', 'Ward 14', 'Urgent', '2026-09-19T07:30', 'Cracked pipe near sewer line replaced, line flushed and chlorinated.'],
  ['W-103', 'Resolved', 'Water Supply', 'Public Water Tap Broken and Running', 'Tap at the public stand is broken and water runs all day.', 'Paud Road Slum Area, Ward 14', 'Near Hanuman Mandir', 'Ward 14', 'Medium', '2026-09-14T12:00', 'Replaced with a push-type self-closing tap to prevent wastage.'],
  ['W-103', 'Resolved', 'Water Supply', 'Overflowing Water Tank on Municipal Building', 'Overhead tank overflowing for hours every morning, flooding the street.', 'Ward Office Building, Ward 14', 'Ward 14 Office', 'Ward 14', 'Low', '2026-09-09T09:20', 'Faulty float valve replaced, overflow stopped.'],

  // W-104 Deepak More — Electrical & Lighting (already has CS-103 resolved)
  ['W-104', 'In Progress', 'Electrical & Lighting', 'Entire Row of Streetlights Off', 'All 8 streetlights on the stretch have been off for 4 nights.', 'Canal Road, Ward 12', 'From Sai Chowk to canal bridge', 'Ward 12', 'High', '2026-10-03T20:10', 'Underground cable fault traced. Digging to repair the joint.'],
  ['W-104', 'In Progress', 'Electrical & Lighting', 'Exposed Live Wires at Junction Box', 'Junction box door missing and live wires exposed at child height.', 'Market Yard Gate 1, Ward 12', 'Near fruit market entrance', 'Ward 12', 'Urgent', '2026-10-05T10:05', 'Area cordoned off. Wires insulated temporarily, new box being fitted.'],
  ['W-104', 'Resolved', 'Electrical & Lighting', 'Traffic Signal Not Working', 'Signal at a busy four-way junction is blinking yellow only, causing confusion.', 'Nal Stop Junction, Ward 12', 'Nal Stop Chowk', 'Ward 12', 'Urgent', '2026-09-17T08:10', 'Controller card replaced, signal timing reset and tested.'],
  ['W-104', 'Resolved', 'Electrical & Lighting', 'Streetlight On During the Day', 'Streetlights on the entire lane stay on 24 hours, wasting electricity.', 'Model Colony Lane 3, Ward 12', 'Near Chittaranjan Vatika', 'Ward 12', 'Low', '2026-09-11T13:25', 'Faulty photocell sensor replaced, lights now switch automatically.']
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pad = (n) => String(n).padStart(2, '0');
const to12h = (d) => `${pad(d.getHours() % 12 || 12)}:${pad(d.getMinutes())} ${d.getHours() < 12 ? 'AM' : 'PM'}`;
const createdAtStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${to12h(d)}`; // "2026-09-28 09:30 AM"
const timelineStr = (d) => `${MONTHS[d.getMonth()]} ${pad(d.getDate())}, ${to12h(d)}`; // "Sep 28, 09:30 AM"
const plusHours = (d, h) => new Date(d.getTime() + h * 3600 * 1000);

const buildWorkerJobs = (workers, citizens, firstSeq) => {
  const workerById = Object.fromEntries(workers.map((w) => [w.id, w]));

  return JOBS.map((job, i) => {
    const [workerId, status, category, title, description, location, landmark, ward, priority, reportedAt, workerNotes] = job;
    const worker = workerById[workerId];
    const citizen = citizens[i % citizens.length];
    const t0 = new Date(reportedAt);
    const [imageUrl, resolvedImage] = IMAGES[category];

    const timeline = [
      { stage: 'Complaint Registered', date: timelineStr(t0), note: 'Filed via CivicSync User App', actor: 'Citizen' },
      { stage: 'Under Review', date: timelineStr(plusHours(t0, 1)), note: `Verified by ${ward} Admin Desk`, actor: 'Admin' },
      { stage: 'Worker Assigned', date: timelineStr(plusHours(t0, 3)), note: `Assigned to ${worker.name} (${worker.department})`, actor: 'Admin' },
      { stage: 'In Progress', date: timelineStr(plusHours(t0, 20)), note: 'Field crew arrived on site. Commencing maintenance work.', actor: 'Worker' }
    ];
    if (status === 'Resolved') {
      timeline.push({ stage: 'Resolved & Verified', date: timelineStr(plusHours(t0, 30)), note: workerNotes, actor: 'Worker' });
    }

    return {
      id: `CS-${firstSeq + i}`,
      title,
      category,
      description,
      location,
      landmark,
      ward,
      priority,
      status,
      citizenName: citizen.name,
      citizenPhone: citizen.phone,
      citizenEmail: citizen.email,
      createdAt: createdAtStr(t0),
      upvotes: 5 + ((i * 7) % 30),
      imageUrl,
      resolvedImageUrl: status === 'Resolved' ? resolvedImage : null,
      workerNotes,
      assignedWorker: { id: worker.id, name: worker.name, department: worker.department, phone: worker.phone },
      timeline
    };
  });
};

module.exports = buildWorkerJobs;
