export const WA = '601160860118'
export const PHONE = '+60 11-6086 0118'
export const MAPS = 'https://www.google.com/maps/place/1111+Studio+Design+%26+Build/@3.1167049,101.6801378,17z'
export const PITCH_WA = 'https://wa.me/601151198497'

export type Room = 'kitchen' | 'wardrobe' | 'tv' | 'storage'
export const doors: { img: string; room: Room }[] = [
  { img: 'd-kitchen', room: 'kitchen' },
  { img: 'd-wardrobe', room: 'wardrobe' },
  { img: 'd-storage', room: 'storage' },
  { img: 'd-tv', room: 'tv' },
]
export const finishes = [
  { key: 'oak', hex: '#C89B6D', line: '#8E6640' },
  { key: 'walnut', hex: '#6B4A33', line: '#3E2A1C' },
  { key: 'white', hex: '#EEEBE5', line: '#A9A39A' },
  { key: 'charcoal', hex: '#2E2E2E', line: '#000000' },
] as const
export type FinishKey = (typeof finishes)[number]['key']
export const gallery = [
  { img: 'g-kitchen2', w: 1400, h: 933 },
  { img: 'g-dark', w: 1400, h: 1867 },
  { img: 'g-timber', w: 1400, h: 952 },
  { img: 'g-study', w: 1400, h: 1867 },
  { img: 'g-white', w: 1400, h: 839 },
  { img: 'g-vanity', w: 1400, h: 928 },
]

const en = {
  nav: { make: 'What we make', planner: 'Cabinet planner', process: 'Process', gallery: 'Gallery', contact: 'Contact' },
  langLabel: 'BM', langAria: 'Tukar ke Bahasa Melayu', menu: 'Menu', close: 'Close',
  hero: {
    tag: 'Interior design & build · Custom cabinets · Taman Seputeh, KL',
    t1: 'Made to measure.', t2: 'Built to last.',
    lead: '1111 Studio designs and builds interiors around custom cabinetry — kitchens, wardrobes, feature walls and storage made for your exact space, not the nearest catalogue size.',
    cta: 'WhatsApp for a site visit', cta2: 'Plan a cabinet',
    tap: 'Tap a door',
    rating: '5.0 on Google',
    caption: 'Illustrative interiors',
  },
  rooms: { kitchen: 'Kitchen', wardrobe: 'Wardrobe', tv: 'TV wall', storage: 'Storage' } as Record<Room, string>,
  make: {
    kicker: 'What we make', title: 'Two crafts, one studio.',
    a: { t: 'Interior design & build', d: 'Layouts, finishes and lighting planned as one, then built by the same team — so your home comes together without the hand-offs.' },
    b: { t: 'Custom cabinets', d: 'Cabinetry measured on site and designed to the millimetre: every gap used, every door aligned, every handle where your hand expects it.' },
    list: ['Kitchen cabinets', 'Wardrobes', 'TV feature walls', 'Study & storage', 'Shoe & entry cabinets', 'Vanity units'],
    listLabel: 'Cabinetry for every room, for example',
  },
  planner: {
    kicker: 'Cabinet planner', title: 'Sketch it. Send it. We measure.',
    lead: 'Pick a cabinet type, set the rough width and choose a finish. We will send your sketch to 1111 Studio on WhatsApp as a starting point.',
    type: 'Cabinet type', width: 'Approximate width', finish: 'Finish',
    finishes: { oak: 'Natural oak', walnut: 'Walnut', white: 'Matte white', charcoal: 'Charcoal' } as Record<FinishKey, string>,
    doors: 'doors', modules: 'modules',
    send: 'Send this sketch',
    msg: 'Hi 1111 Studio, I am planning a {room} cabinet about {w} cm wide in {f} (around {d} doors). Could we arrange a site measurement?',
    note: 'Indicative sketch only — final design and pricing after site measurement.',
  },
  process: {
    kicker: 'Process', title: 'Four steps. Each one counts.',
    steps: [
      ['Measure', 'We visit and measure your space properly — walls are rarely as straight as the plan says.'],
      ['Design', 'Layout, materials and finishes agreed with you before anything is made.'],
      ['Build', 'Cabinets and interior works made to your measurements.'],
      ['Install', 'Fitted, aligned and checked with you at handover.'],
    ],
  },
  gallery: {
    kicker: 'Gallery', title: 'Illustrative interiors',
    note: 'Stock photos for mood and reference only — not 1111 Studio projects.',
    open: 'Open image', close: 'Close', prev: 'Previous', next: 'Next',
  },
  faq: {
    kicker: 'FAQ', title: 'Quick answers.',
    items: [
      ['Do you only make cabinets?', 'No. We handle interior design & build as well as custom cabinets, so a whole room can be done by one team.'],
      ['Is the cabinet planner a quotation?', 'No — it is a quick sketch to start the conversation. We confirm design and pricing after measuring your space.'],
      ['Can I visit the studio?', 'Yes. We are at 68, Jalan Taman Seputeh 1, Taman Seputeh, Kuala Lumpur. Please WhatsApp or call first so we can be ready for you.'],
      ['When are you open?', 'We are open on Mondays from 10:00 AM to 6:00 PM. For other days, please message ahead to arrange a time.'],
    ],
  },
  contact: {
    kicker: 'Contact', title: 'Got a wall that needs a cabinet?',
    lead: 'Send a photo and rough measurements on WhatsApp. We will take it from there.',
    wa: 'WhatsApp 1111 Studio', waText: 'Hi 1111 Studio, I would like to discuss an interior / custom cabinet project.',
    call: 'Call', visit: 'Studio', hours: 'Hours', directions: 'Open in Google Maps',
    address: '68, Jalan Taman Seputeh 1, Taman Seputeh, 58000 Kuala Lumpur',
    hoursText: 'Monday · 10:00 AM – 6:00 PM', hoursNote: 'Other days: please message ahead',
  },
  footer: {
    pitch: 'Website concept prepared for this studio. Not an official site yet — open to making it yours.',
    pitchLink: 'Talk to the designer',
    credit: 'Interior photos: Unsplash (illustrative).',
  },
}
export type Content = typeof en

const ms: Content = {
  nav: { make: 'Apa kami buat', planner: 'Perancang kabinet', process: 'Proses', gallery: 'Galeri', contact: 'Hubungi' },
  langLabel: 'EN', langAria: 'Switch to English', menu: 'Menu', close: 'Tutup',
  hero: {
    tag: 'Reka & bina dalaman · Kabinet khas · Taman Seputeh, KL',
    t1: 'Ikut ukuran anda.', t2: 'Tahan bertahun.',
    lead: '1111 Studio mereka dan membina ruang dalaman berasaskan kabinet khas — dapur, almari pakaian, dinding hiasan dan storan dibuat tepat untuk ruang anda, bukan saiz katalog yang paling hampir.',
    cta: 'WhatsApp untuk lawatan tapak', cta2: 'Rancang kabinet',
    tap: 'Ketik pintu',
    rating: '5.0 di Google',
    caption: 'Contoh visual dalaman',
  },
  rooms: { kitchen: 'Dapur', wardrobe: 'Almari pakaian', tv: 'Dinding TV', storage: 'Storan' },
  make: {
    kicker: 'Apa kami buat', title: 'Dua kemahiran, satu studio.',
    a: { t: 'Reka & bina dalaman', d: 'Susun atur, kemasan dan pencahayaan dirancang sekali, kemudian dibina oleh pasukan yang sama — rumah anda siap tanpa perlu bertukar tangan.' },
    b: { t: 'Kabinet khas', d: 'Kabinet diukur di tapak dan direka hingga ke milimeter: setiap ruang digunakan, setiap pintu sejajar, setiap pemegang di tempat tangan anda menjangkanya.' },
    list: ['Kabinet dapur', 'Almari pakaian', 'Dinding TV', 'Bilik bacaan & storan', 'Kabinet kasut & pintu masuk', 'Kabinet sinki bilik air'],
    listLabel: 'Kabinet untuk setiap ruang, contohnya',
  },
  planner: {
    kicker: 'Perancang kabinet', title: 'Lakar. Hantar. Kami ukur.',
    lead: 'Pilih jenis kabinet, tetapkan anggaran lebar dan pilih kemasan. Kami akan menghantar lakaran anda kepada 1111 Studio melalui WhatsApp sebagai permulaan.',
    type: 'Jenis kabinet', width: 'Anggaran lebar', finish: 'Kemasan',
    finishes: { oak: 'Oak asli', walnut: 'Walnut', white: 'Putih matte', charcoal: 'Arang' },
    doors: 'pintu', modules: 'modul',
    send: 'Hantar lakaran ini',
    msg: 'Hai 1111 Studio, saya merancang kabinet {room} selebar kira-kira {w} cm dalam kemasan {f} (sekitar {d} pintu). Boleh kita aturkan pengukuran tapak?',
    note: 'Lakaran anggaran sahaja — reka bentuk dan harga muktamad selepas pengukuran tapak.',
  },
  process: {
    kicker: 'Proses', title: 'Empat langkah. Setiap satu penting.',
    steps: [
      ['Ukur', 'Kami melawat dan mengukur ruang anda dengan teliti — dinding jarang selurus pelan.'],
      ['Reka', 'Susun atur, bahan dan kemasan dipersetujui bersama sebelum apa-apa dibuat.'],
      ['Bina', 'Kabinet dan kerja dalaman dibuat mengikut ukuran anda.'],
      ['Pasang', 'Dipasang, diselaraskan dan disemak bersama anda semasa serahan.'],
    ],
  },
  gallery: {
    kicker: 'Galeri', title: 'Contoh visual dalaman',
    note: 'Foto stok untuk suasana dan rujukan sahaja — bukan projek 1111 Studio.',
    open: 'Buka imej', close: 'Tutup', prev: 'Sebelum', next: 'Seterusnya',
  },
  faq: {
    kicker: 'Soalan lazim', title: 'Jawapan pantas.',
    items: [
      ['Adakah anda hanya membuat kabinet?', 'Tidak. Kami mengendalikan reka & bina dalaman serta kabinet khas, jadi satu ruang lengkap boleh disiapkan oleh satu pasukan.'],
      ['Adakah perancang kabinet ini satu sebut harga?', 'Tidak — ia lakaran ringkas untuk memulakan perbincangan. Reka bentuk dan harga disahkan selepas kami mengukur ruang anda.'],
      ['Bolehkah saya melawat studio?', 'Boleh. Kami di 68, Jalan Taman Seputeh 1, Taman Seputeh, Kuala Lumpur. Sila WhatsApp atau telefon dahulu supaya kami bersedia.'],
      ['Bilakah anda dibuka?', 'Kami dibuka pada hari Isnin dari 10:00 pagi hingga 6:00 petang. Untuk hari lain, sila hubungi dahulu untuk mengatur masa.'],
    ],
  },
  contact: {
    kicker: 'Hubungi', title: 'Ada dinding yang perlukan kabinet?',
    lead: 'Hantar foto dan anggaran ukuran melalui WhatsApp. Selebihnya serahkan kepada kami.',
    wa: 'WhatsApp 1111 Studio', waText: 'Hai 1111 Studio, saya ingin berbincang tentang projek dalaman / kabinet khas.',
    call: 'Telefon', visit: 'Studio', hours: 'Waktu', directions: 'Buka di Google Maps',
    address: '68, Jalan Taman Seputeh 1, Taman Seputeh, 58000 Kuala Lumpur',
    hoursText: 'Isnin · 10:00 pagi – 6:00 petang', hoursNote: 'Hari lain: sila hubungi dahulu',
  },
  footer: {
    pitch: 'Konsep laman web disediakan untuk studio ini. Bukan laman rasmi lagi — sedia dijadikan milik anda.',
    pitchLink: 'Hubungi pereka',
    credit: 'Foto dalaman: Unsplash (contoh visual).',
  },
}
export const content = { en, ms }
