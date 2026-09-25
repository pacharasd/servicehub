export const groups = [
  { id: 'cleaning', label: 'งานบริการรักษาความสะอาด', short: 'รักษาความสะอาด', icon: 'sparkles', tone: 'mint' },
  { id: 'waste', label: 'งานบริการมูลฝอย', short: 'บริการมูลฝอย', icon: 'recycle', tone: 'sky' },
  { id: 'sanitation', label: 'งานบริหารจัดการสิ่งปฏิกูล', short: 'จัดการสิ่งปฏิกูล', icon: 'droplet', tone: 'amber' },
  { id: 'projects', label: 'งานพัฒนาระบบจัดการมูลฝอย', short: 'พัฒนาระบบ', icon: 'chart', tone: 'violet' },
];

const date = { name: 'service_date', label: 'วันที่ดำเนินงาน', type: 'date', required: true };

export const modules = [
  { id: 'road-washings', group: 'cleaning', label: 'การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด', short: 'การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด', icon: 'road', titleField: 'location', fields: [date, { name: 'cleaning_zone', label: 'เขตรักษาความสะอาด', type: 'select', options: ['เขต 1', 'เขต 2', 'เขต 3', 'เขต 4', 'เขต 5', 'เขต 6', 'เขตตัวอย่าง 1', 'เขตตัวอย่าง 2'], required: true }, { name: 'location', label: 'สถานที่', type: 'text', required: true }, { name: 'distance_km', label: 'ระยะทาง', type: 'number', unit: 'กม.', required: true }] },
  { id: 'waterway-cleanings', group: 'cleaning', label: 'การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ', short: 'การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ', icon: 'waves', titleField: 'waterway_name', fields: [date, { name: 'waterway_name', label: 'ชื่อแหล่งน้ำ', type: 'text', required: true }, { name: 'distance_km', label: 'ระยะทางปฏิบัติงาน', type: 'number', unit: 'กม.', required: true }, { name: 'quantity', label: 'ปริมาณที่กำจัดได้', type: 'number', required: true }] },
  { id: 'road-sweepings', group: 'cleaning', label: 'การกวาดทำความสะอาดฝุ่นถนนสาธารณะ', short: 'การกวาดทำความสะอาดฝุ่นถนนสาธารณะ', icon: 'sparkles', titleField: 'road', fields: [date, { name: 'road', label: 'ถนน', type: 'text', required: true }, { name: 'storage_location', label: 'สถานที่จัดเก็บ', type: 'text', required: true }, { name: 'distance_km', label: 'ระยะทาง', type: 'number', unit: 'กม.', required: true }] },
  { id: 'outsourced-cleanings', group: 'cleaning', label: 'กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม', short: 'กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม', icon: 'users', titleField: 'location', fields: [date, { name: 'location', label: 'สถานที่', type: 'text', required: true }, { name: 'distance_km', label: 'ระยะทาง', type: 'number', unit: 'กม.', required: true }, { name: 'community', label: 'ชุมชน', type: 'text', required: true }] },
  { id: 'waste-collections', group: 'waste', label: 'ข้อมูลมูลฝอยทั่วไป', short: 'มูลฝอยทั่วไป', icon: 'recycle', titleField: 'waste_name', fields: [date, { name: 'source', label: 'แหล่งที่เก็บ', type: 'text', required: true }, { name: 'waste_type', label: 'ประเภทขยะมูลฝอย', type: 'select', options: ['ขยะทั่วไป', 'ขยะเปียก/อินทรีย์', 'ขยะรีไซเคิล', 'ขยะอันตราย', 'ขยะติดเชื้อ'], required: true }, { name: 'waste_name', label: 'ชื่อขยะมูลฝอย', type: 'text', required: true }, { name: 'weight', label: 'น้ำหนัก', type: 'number', required: true }, { name: 'unit', label: 'หน่วยน้ำหนัก', type: 'text', required: true }] },
  { id: 'drain-cleanings', group: 'sanitation', label: 'งานลอกท่อระบายน้ำ', short: 'ลอกท่อระบายน้ำ', icon: 'droplet', titleField: 'location', fields: [date, { name: 'location', label: 'สถานที่', type: 'text', required: true }, { name: 'distance_km', label: 'ระยะทาง', type: 'number', unit: 'กม.', required: true }, { name: 'sediment_quantity', label: 'ปริมาณตะกอน', type: 'number', required: true }] },
  { id: 'septic-pumpings', group: 'sanitation', label: 'งานสูบสิ่งปฏิกูล', short: 'สูบสิ่งปฏิกูล', icon: 'truck', titleField: 'location', fields: [date, { name: 'location', label: 'สถานที่', type: 'text', required: true }, { name: 'volume', label: 'ปริมาตรสิ่งปฏิกูล', type: 'number', required: true }, { name: 'fee_amount', label: 'ค่าธรรมเนียม', type: 'number', unit: 'บาท', required: true }] },
  { id: 'septic-treatments', group: 'sanitation', label: 'การบำบัดสิ่งปฏิกูล', short: 'บำบัดสิ่งปฏิกูล', icon: 'flask', titleField: 'service_date', fields: [date, { name: 'sludge_quantity', label: 'ปริมาณตะกอนสำหรับทำปุ๋ย', type: 'number', required: true }, { name: 'fertilizer_remaining', label: 'ปุ๋ยอินทรีย์สูตร 2 คงเหลือ', type: 'number', required: true }, { name: 'microbial_note', label: 'ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ', type: 'textarea', required: true }] },
  { id: 'waste-management-projects', group: 'projects', label: 'โครงการพัฒนาระบบจัดการมูลฝอย', short: 'โครงการพัฒนา', icon: 'chart', titleField: 'project_name', fields: [date, { name: 'project_name', label: 'ชื่อโครงการ', type: 'text', required: true }, { name: 'communities_count', label: 'จำนวนชุมชนที่เข้าร่วม', type: 'integer', unit: 'ชุมชน', required: true }, { name: 'participants_count', label: 'ผู้เข้าร่วมโครงการ', type: 'integer', unit: 'คน', required: true }] },
];

const samples = {
  location: ['พื้นที่ตัวอย่าง A', 'พื้นที่ตัวอย่าง B', 'พื้นที่ตัวอย่าง C', 'พื้นที่ตัวอย่าง D'],
  cleaning_zone: ['เขตตัวอย่าง 1', 'เขตตัวอย่าง 2'],
  waterway_name: ['คลองตัวอย่าง A', 'คลองตัวอย่าง B'],
  road: ['ถนนตัวอย่าง A', 'ถนนตัวอย่าง B'],
  storage_location: ['จุดจัดเก็บตัวอย่าง A', 'จุดจัดเก็บตัวอย่าง B'],
  community: ['ชุมชนตัวอย่าง A', 'ชุมชนตัวอย่าง B'],
  source: ['พื้นที่ตัวอย่าง A', 'พื้นที่ตัวอย่าง B'],
  waste_type: ['ขยะทั่วไป', 'ขยะรีไซเคิล'],
  waste_name: ['มูลฝอยจากพื้นที่ตัวอย่าง A', 'มูลฝอยจากพื้นที่ตัวอย่าง B'],
  unit: ['กิโลกรัม'],
  sludge_unit: ['หน่วยตัวอย่าง'],
  fertilizer_unit: ['หน่วยตัวอย่าง'],
  microbial_note: ['บันทึกการดำเนินงานตัวอย่าง'],
  project_name: ['โครงการต้นแบบชุมชนสะอาด', 'โครงการคัดแยกขยะต้นทาง'],
};

export function createDemoRecords() {
  return modules.flatMap((module, moduleIndex) => Array.from({ length: 8 }, (_, index) => {
    const record = {
      id: `${module.id}-${index + 1}`,
      module: module.id,
      service_date: `2026-09-${String(24 - index).padStart(2, '0')}`,
      created_by: 'ผู้ใช้งานตัวอย่าง',
      created_at: `2026-09-${String(24 - index).padStart(2, '0')}T09:30:00+07:00`,
      updated_by: 'ผู้ใช้งานตัวอย่าง',
      updated_at: `2026-09-${String(24 - index).padStart(2, '0')}T09:30:00+07:00`,
    };
    module.fields.slice(1).forEach((field, fieldIndex) => {
      if (field.type === 'number' || field.type === 'integer') record[field.name] = field.type === 'integer' ? (index + 2) * (fieldIndex + 1) : ((index + 1) * (moduleIndex + 2) * .75).toFixed(2);
      else if (field.name === 'unit' && module.id !== 'waste-collections') record[field.name] = 'หน่วยตัวอย่าง';
      else record[field.name] = (samples[field.name] || ['ข้อมูลตัวอย่าง'])[index % (samples[field.name]?.length || 1)];
    });
    return record;
  }));
}
