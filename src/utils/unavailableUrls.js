export const invalidPatterns = [
    '.comwqwq',  
    '%D1%8D',
];

export const unavailableDomains = [
    'unsplash.com',
    'images.unsplash.com',
]

export  const slowOrUnreliableDomains = [
    'katarintravel.by',      
];

export const allProblematicDomains = [
    ...invalidPatterns,
    ...unavailableDomains,
    ...slowOrUnreliableDomains,
];