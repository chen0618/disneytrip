// All bus routes start from Pop Century bus stop in front of Everything POP
// Coordinates sourced from OSRM road routing via OpenStreetMap data
// Downsampled to ~25 key waypoints per route for smooth map animation

const POP_BUS_STOP = [28.3500, -81.5425];

// Shared initial segment: Pop Century bus loop → Century Drive north → Victory Way
const centuryDriveExit = [
  POP_BUS_STOP,
  [28.3506, -81.5424],  // Exit bus loop
  [28.3511, -81.5419],  // Century Dr heading north
  [28.3511, -81.5411],  // Continue north on Century Dr
  [28.3518, -81.5411],  // Slight curve
  [28.3524, -81.5416],  // Turn northwest
  [28.3535, -81.5429],  // Century Dr heading NW
  [28.3543, -81.5439],  // Continue NW
  [28.3548, -81.5449],  // Approaching Victory Way
  [28.3550, -81.5454],  // Curve onto ramp
  [28.3554, -81.5461],  // Onto Osceola Pkwy / Victory Way area
];

export const busToMK = [
  ...centuryDriveExit,
  // North on Buena Vista Dr / World Dr toward MK
  [28.3561, -81.5473],
  [28.3570, -81.5467],
  [28.3588, -81.5463],
  [28.3601, -81.5461],
  [28.3627, -81.5461],
  [28.3636, -81.5465],
  [28.3646, -81.5472],
  // West on Epcot Center Dr / World Dr
  [28.3636, -81.5513],
  [28.3629, -81.5554],
  [28.3631, -81.5593],
  [28.3637, -81.5627],
  [28.3648, -81.5634],
  // North on World Drive
  [28.3689, -81.5636],
  [28.3723, -81.5638],
  [28.3752, -81.5649],
  [28.3823, -81.5672],
  [28.3867, -81.5687],
  [28.3929, -81.5715],
  [28.3965, -81.5726],
  [28.4019, -81.5746],
  [28.4068, -81.5767],
  // Approach Magic Kingdom
  [28.4083, -81.5765],
  [28.4115, -81.5755],
  [28.4148, -81.5767],
  [28.4178, -81.5768],
  [28.4195, -81.5777],
];

export const busToEP = [
  ...centuryDriveExit,
  // North toward EPCOT
  [28.3561, -81.5473],
  [28.3570, -81.5467],
  [28.3588, -81.5463],
  [28.3601, -81.5461],
  [28.3627, -81.5461],
  [28.3636, -81.5465],
  [28.3646, -81.5472],
  // East then north toward EPCOT entrance
  [28.3651, -81.5481],
  [28.3653, -81.5480],
  [28.3653, -81.5482],
  [28.3665, -81.5488],
  [28.3665, -81.5500],
  [28.3666, -81.5512],
  [28.3669, -81.5528],
  [28.3671, -81.5533],
  // EPCOT approach
  [28.3687, -81.5543],
  [28.3710, -81.5535],
  [28.3723, -81.5533],
  [28.3732, -81.5536],
  [28.3749, -81.5536],
  [28.3757, -81.5520],
  [28.3761, -81.5506],
  [28.3755, -81.5501],
];

export const busToHS = [
  ...centuryDriveExit,
  // South then west toward Hollywood Studios
  [28.3561, -81.5473],
  [28.3557, -81.5478],
  [28.3553, -81.5484],
  [28.3548, -81.5492],
  [28.3542, -81.5497],
  [28.3538, -81.5497],
  [28.3531, -81.5500],
  [28.3517, -81.5508],
  // Turn south on Buena Vista Dr
  [28.3507, -81.5514],
  [28.3509, -81.5518],
  [28.3513, -81.5525],
  [28.3519, -81.5529],
  [28.3527, -81.5531],
  [28.3530, -81.5531],
  [28.3535, -81.5530],
  [28.3546, -81.5527],
  [28.3555, -81.5524],
  [28.3564, -81.5521],
  // Hollywood Studios approach
  [28.3574, -81.5514],
  [28.3578, -81.5512],
  [28.3590, -81.5511],
  [28.3593, -81.5512],
  [28.3594, -81.5515],
  [28.3596, -81.5524],
  [28.3594, -81.5530],
  [28.3589, -81.5540],
  [28.3584, -81.5550],
  [28.3580, -81.5558],
  [28.3574, -81.5569],
  [28.3578, -81.5575],
];

export const busToDS = [
  ...centuryDriveExit,
  // Continue north then curve east
  [28.3561, -81.5473],
  [28.3570, -81.5467],
  [28.3588, -81.5463],
  [28.3601, -81.5461],
  [28.3627, -81.5461],
  [28.3636, -81.5465],
  [28.3646, -81.5472],
  // Northeast toward I-4 / Buena Vista Dr
  [28.3672, -81.5447],
  [28.3686, -81.5426],
  [28.3693, -81.5417],
  [28.3696, -81.5406],
  // East on Hotel Plaza Blvd area
  [28.3694, -81.5389],
  [28.3694, -81.5354],
  [28.3694, -81.5347],
  // Curve south toward Disney Springs
  [28.3692, -81.5331],
  [28.3690, -81.5321],
  [28.3690, -81.5310],
  [28.3693, -81.5299],
  [28.3695, -81.5285],
  [28.3695, -81.5270],
  [28.3695, -81.5253],
  // South into Disney Springs area
  [28.3692, -81.5253],
  [28.3681, -81.5223],
  [28.3674, -81.5201],
  [28.3674, -81.5193],
  [28.3680, -81.5182],
  [28.3691, -81.5172],   // Disney Springs Town Center bus drop-off
];

// Sassagoula River Cruise: Disney Springs Marketplace dock → Port Orleans French Quarter dock
// Coordinates from OpenStreetMap Sassagoula River waterway data + pier locations
// DS dock ≈ 28.3713, -81.5187 | PO FQ dock ≈ 28.3809, -81.5351
export const boatCoords = [
  [28.3713, -81.5187],   // Disney Springs Marketplace boat dock
  [28.3720, -81.5200],   // Heading north into Village Lake
  [28.3730, -81.5210],   // Village Lake
  [28.3739, -81.5221],   // Entering Sassagoula River from lake
  [28.3742, -81.5227],   // River heading NW
  [28.3744, -81.5230],
  [28.3748, -81.5234],
  [28.3753, -81.5238],
  [28.3755, -81.5240],
  [28.3757, -81.5243],
  [28.3759, -81.5247],
  [28.3761, -81.5251],   // River continues north
  [28.3761, -81.5256],
  [28.3760, -81.5266],
  [28.3759, -81.5270],
  [28.3758, -81.5276],   // River bends
  [28.3758, -81.5278],
  [28.3758, -81.5280],
  [28.3759, -81.5283],
  [28.3759, -81.5287],
  [28.3760, -81.5291],   // Past the marina area
  [28.3762, -81.5293],
  [28.3764, -81.5294],
  [28.3767, -81.5294],
  [28.3769, -81.5294],
  [28.3771, -81.5294],
  [28.3773, -81.5295],
  [28.3778, -81.5299],   // River curves west
  [28.3779, -81.5300],
  [28.3780, -81.5302],
  [28.3780, -81.5303],
  [28.3780, -81.5306],
  [28.3780, -81.5309],
  [28.3780, -81.5311],
  [28.3783, -81.5316],   // River heading NW
  [28.3785, -81.5319],
  [28.3787, -81.5321],
  [28.3789, -81.5322],
  [28.3792, -81.5324],
  [28.3794, -81.5325],
  [28.3796, -81.5326],
  [28.3796, -81.5329],   // River continues north
  [28.3796, -81.5333],
  [28.3796, -81.5337],
  [28.3796, -81.5339],
  [28.3797, -81.5340],
  [28.3802, -81.5344],   // Approaching FQ area
  [28.3808, -81.5349],
  [28.3809, -81.5351],   // Port Orleans French Quarter boat dock
];

// Disney Skyliner gondola routes (from OpenStreetMap way data)
// Pop Century/AoA station → Caribbean Beach hub
export const skylinerPopToCB = [
  [28.3506, -81.5457],   // Pop Century / Art of Animation station
  [28.3509, -81.5456],
  [28.3513, -81.5456],
  [28.3521, -81.5455],
  [28.3529, -81.5454],
  [28.3535, -81.5453],
  [28.3544, -81.5452],
  [28.3551, -81.5452],
  [28.3563, -81.5450],
  [28.3574, -81.5449],
  [28.3584, -81.5448],
  [28.3586, -81.5448],
  [28.3591, -81.5447],   // Caribbean Beach hub station
];

// Caribbean Beach hub → Riviera Resort → EPCOT International Gateway
export const skylinerCBtoEP = [
  [28.3591, -81.5447],   // Caribbean Beach hub
  [28.3597, -81.5446],
  [28.3613, -81.5445],
  [28.3624, -81.5444],
  [28.3636, -81.5442],
  [28.3647, -81.5441],
  [28.3652, -81.5440],
  [28.3655, -81.5440],   // Riviera Resort station
  [28.3655, -81.5444],
  [28.3651, -81.5462],
  [28.3648, -81.5476],
  [28.3644, -81.5499],
  [28.3641, -81.5510],
  [28.3638, -81.5523],
  [28.3635, -81.5536],
  [28.3634, -81.5541],
  [28.3633, -81.5543],   // Turn station
  [28.3636, -81.5545],   // After turn
  [28.3638, -81.5544],
  [28.3647, -81.5543],
  [28.3658, -81.5541],
  [28.3671, -81.5539],
  [28.3682, -81.5537],
  [28.3689, -81.5536],
  [28.3695, -81.5535],
  [28.3697, -81.5535],
  [28.3701, -81.5534],   // EPCOT International Gateway
];

// Caribbean Beach hub → Hollywood Studios
export const skylinerCBtoHS = [
  [28.3591, -81.5447],   // Caribbean Beach hub
  [28.3591, -81.5458],
  [28.3591, -81.5472],
  [28.3592, -81.5485],
  [28.3591, -81.5498],
  [28.3591, -81.5512],
  [28.3591, -81.5525],
  [28.3591, -81.5537],
  [28.3591, -81.5549],
  [28.3591, -81.5556],
  [28.3591, -81.5564],
  [28.3591, -81.5567],
  [28.3591, -81.5571],   // Hollywood Studios station
];

export const skylinerRoutes = [
  {
    coords: skylinerPopToCB,
    label: 'Skyliner: Pop Century → Caribbean Beach',
    time: '~5 min',
    color: '#FF6B35',
  },
  {
    coords: skylinerCBtoEP,
    label: 'Skyliner: Caribbean Beach → EPCOT',
    time: '~13 min (via Riviera)',
    color: '#9B59B6',
  },
  {
    coords: skylinerCBtoHS,
    label: 'Skyliner: Caribbean Beach → Hollywood Studios',
    time: '~7 min',
    color: '#2ECC71',
  },
];

export const busRoutes = [
  { coords: busToMK, label: 'Bus to Magic Kingdom', time: '~25\u201335 min', color: '#FF6B6B' },
  { coords: busToEP, label: 'Bus to EPCOT', time: '~15\u201320 min', color: '#FFD700' },
  { coords: busToHS, label: 'Bus to Hollywood Studios', time: '~15\u201320 min', color: '#4ECDC4' },
  { coords: busToDS, label: 'Bus to Disney Springs', time: '~15\u201320 min', color: '#A29BFE' },
];
