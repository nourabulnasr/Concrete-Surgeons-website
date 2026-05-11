export type Service = {
  slug: string
  icon: string
  nameEn: string
  nameAr: string
  taglineEn: string
  taglineAr: string
  descriptionEn: string
  descriptionAr: string
  useCasesEn: string[]
  useCasesAr: string[]
  processEn: string[]
  processAr: string[]
  keywordsEn: string[]
  keywordsAr: string[]
}

export const services: Service[] = [
  {
    slug: 'diamond-sawing',
    icon: 'Gem',
    nameEn: 'Diamond Sawing',
    nameAr: 'القطع الماسي',
    taglineEn: 'Surgical-grade cuts through any concrete thickness',
    taglineAr: 'قطع بدقة جراحية عبر أي سماكة خرسانية',
    descriptionEn: `Diamond sawing is our flagship precision cutting service — a controlled, dust-minimal method for making straight, clean cuts through reinforced concrete, masonry, asphalt, and composite slabs. Using diamond-tipped circular blades mounted on track-guided saws, our team executes cuts with millimeter-level accuracy. This is the method chosen when there is zero tolerance for structural deviation, vibration damage to adjacent elements, or excessive downtime.

We have deployed diamond sawing across Egypt and the Gulf on projects ranging from metro infrastructure to high-rise residential retrofitting. Whether you need a clean penetration for an MEP sleeve, a structural opening for a new staircase, or a precise flush cut at a column base, our diamond saws deliver.`,
    descriptionAr: `القطع الماسي هو خدمتنا الرائدة في القطع الدقيق — أسلوب متحكم بأدنى قدر من الغبار لإجراء قطعات نظيفة ومستقيمة عبر الخرسانة المسلحة والبناء والإسفلت والألواح المركبة. باستخدام شفرات دائرية مرصعة بالماس مثبتة على مناشير موجهة بمسارات، ينفذ فريقنا القطعات بدقة على مستوى المليمتر. هذه هي الطريقة المختارة عندما لا يكون هناك مجال لأي انحراف هيكلي أو ضرر اهتزازي للعناصر المجاورة أو توقف مفرط.

نشرنا القطع الماسي في جميع أنحاء مصر والخليج في مشاريع تتراوح بين البنية التحتية للمترو وتجديد المباني الشاهقة السكنية.`,
    useCasesEn: [
      'MEP penetrations in structural slabs',
      'Door and window openings in load-bearing walls',
      'Staircase and elevator shaft creation',
      'Utility trenching in concrete floors',
      'Bridge deck cutting',
      'Industrial floor modifications',
    ],
    useCasesAr: [
      'فتحات الميكانيكا والكهرباء والسباكة في الألواح الإنشائية',
      'فتحات الأبواب والنوافذ في الجدران الحاملة',
      'إنشاء بيارات الدرج والمصعد',
      'حفر القنوات المرافق في أرضيات الخرسانة',
      'قطع أسطح الجسور',
      'تعديلات الأرضيات الصناعية',
    ],
    processEn: [
      'Site survey and structural assessment',
      'Blade selection based on material and depth',
      'Track mounting and alignment',
      'Water-cooled diamond sawing',
      'Core removal and debris clearance',
      'Edge finishing and structural verification',
    ],
    processAr: [
      'مسح الموقع والتقييم الإنشائي',
      'اختيار الشفرة بناءً على المادة والعمق',
      'تركيب المسار والمحاذاة',
      'القطع الماسي بتبريد مائي',
      'إزالة القلب ومخلفات الحطام',
      'تشطيب الحواف والتحقق الإنشائي',
    ],
    keywordsEn: ['diamond sawing Egypt', 'concrete cutting Cairo', 'wall sawing Egypt', 'slab sawing Middle East'],
    keywordsAr: ['قطع ماسي مصر', 'قطع خرسانة القاهرة', 'قطع جدار مصر'],
  },
  {
    slug: 'controlled-demolition',
    icon: 'Hammer',
    nameEn: 'Controlled Demolition',
    nameAr: 'الهدم المتحكم',
    taglineEn: 'Precision demolition — what comes down is chosen, what stands is protected',
    taglineAr: 'هدم دقيق — ما يُهدم مختار، وما يبقى محمي',
    descriptionEn: `Not all demolition is the same. Uncontrolled teardown damages surrounding structure, exposes workers to unpredictable collapse sequences, and creates enormous waste and litigation risk. Our controlled demolition methodology is the opposite: pre-engineered, sequenced, and executed with complete awareness of the structural response at each stage.

We specialize in high-reach demolition using our UHD (Ultra-High-Demolition) excavator fleet, selective interior strip-outs, floor-by-floor progressive demolition, and facade-preserving structural removal. Our work has included demolition on active construction sites in Dubai, alongside operational facilities in Cairo, and in confined urban environments where noise and vibration impact neighboring properties.`,
    descriptionAr: `ليس كل هدم متشابهاً. الهدم غير المتحكم يضر بالهيكل المحيط، ويعرض العمال لتسلسل انهيار غير متوقع، ويخلق نفايات هائلة ومخاطر قانونية. منهجية الهدم المتحكم لدينا هي عكس ذلك تماماً: مهندسة مسبقاً، ومتسلسلة، ومنفذة مع وعي كامل بالاستجابة الإنشائية في كل مرحلة.

نتخصص في الهدم العالي المدى باستخدام أسطولنا من حفارات UHD (الهدم الفائق الارتفاع)، والهدم الداخلي الانتقائي، والهدم التدريجي طابقاً بطابق، وإزالة الهياكل مع الحفاظ على الواجهات.`,
    useCasesEn: [
      'High-rise floor removal and partial demolition',
      'Industrial facility decommissioning',
      'Bridge and infrastructure demolition',
      'Interior strip-out for retrofit projects',
      'Confined site demolition in urban areas',
      'Foundation and basement removal',
    ],
    useCasesAr: [
      'إزالة طوابق المباني الشاهقة والهدم الجزئي',
      'تفكيك المنشآت الصناعية',
      'هدم الجسور والبنية التحتية',
      'الهدم الداخلي لمشاريع التجديد',
      'الهدم في المواقع المحصورة في المناطق الحضرية',
      'إزالة الأساسات والأقبية',
    ],
    processEn: [
      'Structural engineering review and demolition plan',
      'Risk assessment and neighboring structure survey',
      'Shoring and protection installation',
      'Sequential controlled demolition',
      'Debris sorting and waste management',
      'Site handover inspection',
    ],
    processAr: [
      'مراجعة هندسة الهياكل وخطة الهدم',
      'تقييم المخاطر ومسح الهياكل المجاورة',
      'تركيب الدعامات والحماية',
      'الهدم المتحكم المتسلسل',
      'فرز الحطام وإدارة النفايات',
      'تفتيش تسليم الموقع',
    ],
    keywordsEn: ['controlled demolition Egypt', 'selective demolition Cairo', 'high reach demolition Middle East', 'building demolition Egypt'],
    keywordsAr: ['هدم متحكم مصر', 'هدم انتقائي القاهرة', 'هدم المباني مصر'],
  },
  {
    slug: 'drilling-anchoring',
    icon: 'Drill',
    nameEn: 'Drilling & Anchoring',
    nameAr: 'الحفر والتثبيت',
    taglineEn: 'Core drilling and adhesive anchoring for structural connections that last',
    taglineAr: 'حفر القلب والتثبيت اللاصق للوصلات الإنشائية الدائمة',
    descriptionEn: `Precise concrete coring and adhesive anchoring are the invisible infrastructure of structural retrofit. When a new structural element must connect to existing concrete — a steel column base plate, a post-installed rebar dowel, a façade anchor, or a mechanical equipment anchor — the drilling diameter, depth, angle, and adhesive system used determine whether the connection performs over its design life.

We use diamond-core drilling rigs for holes from 10mm to 600mm diameter. Our adhesive anchoring systems are sourced from certified manufacturers and installed to EN and ACI standards. Every critical anchor installation includes pull-out testing and documentation.`,
    descriptionAr: `يعد حفر الخرسانة الدقيق والتثبيت اللاصق البنية التحتية غير المرئية لتجديد الهياكل. عندما يجب أن يتصل عنصر هيكلي جديد بخرسانة موجودة، فإن قطر الحفر والعمق والزاوية ونظام اللاصق المستخدم يحددون ما إذا كانت الوصلة ستؤدي أداءها على مدى عمرها التصميمي.

نستخدم منصات حفر بقلب ماسي لثقوب من 10 ملم إلى 600 ملم قطراً. أنظمة التثبيت اللاصق لدينا مصدرها من مصنعين معتمدين ومركبة وفق معايير EN وACI.`,
    useCasesEn: [
      'Post-installed rebar for structural connections',
      'Mechanical equipment foundation anchoring',
      'Façade and cladding anchor installation',
      'Cable and conduit penetrations',
      'Staircase and handrail anchoring',
      'New column base plate installation',
    ],
    useCasesAr: [
      'حديد تسليح مثبت لاحقاً للوصلات الإنشائية',
      'تثبيت أساسات المعدات الميكانيكية',
      'تركيب مثبتات الواجهات والكسوة',
      'فتحات الكابلات والقنوات',
      'تثبيت الدرج والدرابزين',
      'تركيت قواعد الأعمدة الجديدة',
    ],
    processEn: [
      'Structural drawing review and rebar scan',
      'Drill specification per load requirements',
      'Diamond core drilling',
      'Hole cleaning and preparation',
      'Adhesive injection and anchor setting',
      'Cure time management and pull-out testing',
    ],
    processAr: [
      'مراجعة رسومات الهياكل ومسح الحديد',
      'مواصفات الحفر حسب متطلبات الحمل',
      'الحفر بالقلب الماسي',
      'تنظيف الثقوب وتحضيرها',
      'حقن اللاصق وضبط المثبت',
      'إدارة وقت المعالجة واختبار السحب',
    ],
    keywordsEn: ['concrete drilling Egypt', 'anchor installation Cairo', 'rebar anchoring Middle East', 'core drilling Egypt'],
    keywordsAr: ['حفر خرسانة مصر', 'تثبيت مراسي القاهرة', 'حفر قلب مصر'],
  },
  {
    slug: 'structural-retrofitting',
    icon: 'Shield',
    nameEn: 'Structural Retrofitting',
    nameAr: 'التدعيم الإنشائي',
    taglineEn: 'Extend structure life with CFRP — stronger than steel at a fraction of the weight',
    taglineAr: 'مد عمر الهيكل بتقنية CFRP — أقوى من الفولاذ بجزء من الوزن',
    descriptionEn: `Structural retrofitting addresses what age, overloading, design changes, or seismic activity have done to a reinforced concrete structure. Our core retrofitting technique is Carbon Fiber Reinforced Polymer (CFRP) application — a proven method for restoring and enhancing the flexural, shear, and axial capacity of beams, columns, slabs, and walls without adding significant dead load.

CFRP laminate systems are lighter than steel, faster to install than conventional jacketing, and achieve full design strength within days. We have applied CFRP strengthening systems to commercial towers, bridges, industrial facilities, and residential buildings across Egypt and the Gulf. Every project begins with a structural assessment and ends with third-party load verification testing.`,
    descriptionAr: `يعالج التدعيم الإنشائي ما فعله الزمن والحمل الزائد أو تغييرات التصميم أو النشاط الزلزالي بهيكل الخرسانة المسلحة. تقنيتنا الأساسية في التدعيم هي تطبيق البوليمر المقوى بألياف الكربون (CFRP) — أسلوب مثبت لاستعادة وتعزيز قدرة الانحناء والقص والمحوري للكمرات والأعمدة والألواح والجدران دون إضافة حمل ذاتي كبير.`,
    useCasesEn: [
      'Beam and slab flexural strengthening',
      'Column confinement and axial capacity increase',
      'Shear wall reinforcement',
      'Bridge deck and girder strengthening',
      'Seismic retrofit programs',
      'Change of use requiring increased load capacity',
    ],
    useCasesAr: [
      'تقوية الانحناء للكمرات والألواح',
      'تقييد الأعمدة وزيادة القدرة المحورية',
      'تقوية جدران القص',
      'تقوية بلاطات الجسور والكمرات',
      'برامج التدعيم الزلزالي',
      'تغيير الاستخدام الذي يتطلب زيادة قدرة الحمل',
    ],
    processEn: [
      'Structural assessment and load analysis',
      'CFRP system design and engineering sign-off',
      'Concrete surface preparation (grinding, repair)',
      'Primer application and CFRP laminate installation',
      'Quality control and adhesion testing',
      'Third-party structural verification',
    ],
    processAr: [
      'التقييم الإنشائي وتحليل الحمل',
      'تصميم نظام CFRP والموافقة الهندسية',
      'تحضير سطح الخرسانة (طحن وإصلاح)',
      'تطبيق الطلاء الأساسي وتركيب لاميناتCFRP',
      'ضبط الجودة واختبار الالتصاق',
      'التحقق الإنشائي من طرف ثالث',
    ],
    keywordsEn: ['CFRP strengthening Egypt', 'structural retrofitting Cairo', 'concrete strengthening Middle East', 'carbon fiber reinforced polymer Egypt'],
    keywordsAr: ['تدعيم CFRP مصر', 'تقوية إنشائية القاهرة', 'ألياف كربون مصر'],
  },
  {
    slug: 'firestop',
    icon: 'Flame',
    nameEn: 'Firestop',
    nameAr: 'العزل الناري',
    taglineEn: 'Passive fire protection — code-compliant sealing of every penetration',
    taglineAr: 'حماية من الحريق السلبية — ختم متوافق مع الكود لكل فتحة',
    descriptionEn: `Every pipe, conduit, cable tray, and duct that penetrates a fire-rated wall or floor assembly creates a potential fire path that bypass hours of protection. Firestop is the passive fire protection system that restores the fire rating at each penetration point, expansion joint, and construction gap.

We install intumescent collars, pillows, mortars, and spray systems from certified firestop manufacturers. Our installers are trained on ASTM E814 and UL 1479 tested assemblies. We maintain documentation packages for each installation — critical for building authority inspections and insurance compliance.`,
    descriptionAr: `كل أنبوب وقناة وصينية كابلات وقناة هواء تخترق جداراً أو أرضية مصنفة للحريق تخلق مساراً محتملاً للنار يتجاوز ساعات من الحماية. العزل الناري هو نظام الحماية السلبية من الحريق الذي يستعيد تصنيف الحريق عند كل نقطة اختراق ووصلة تمدد وفجوة إنشائية.`,
    useCasesEn: [
      'MEP penetration sealing in fire-rated slabs',
      'Fire wall penetration treatment',
      'Expansion joint fire protection',
      'Cable tray and conduit firestopping',
      'Construction gap sealing',
      'Retrofit firestop for existing buildings',
    ],
    useCasesAr: [
      'ختم فتحات الميكانيكا والكهرباء والسباكة في الألواح المصنفة للحريق',
      'معالجة فتحات جدران الحريق',
      'حماية وصلات التمدد من الحريق',
      'عزل صواني الكابلات والقنوات',
      'ختم الفجوات الإنشائية',
      'العزل الناري التجديدي للمباني القائمة',
    ],
    processEn: [
      'Penetration survey and documentation',
      'System selection per tested assembly',
      'Surface preparation',
      'Firestop product installation',
      'Inspection and photographic documentation',
      'Certificate issuance per penetration',
    ],
    processAr: [
      'مسح الفتحات والتوثيق',
      'اختيار النظام حسب التجميع المختبر',
      'تحضير السطح',
      'تركيب منتج العزل الناري',
      'التفتيش والتوثيق الفوتوغرافي',
      'إصدار شهادة لكل فتحة',
    ],
    keywordsEn: ['firestop Egypt', 'passive fire protection Cairo', 'fire rated penetration sealing Egypt', 'intumescent sealant Middle East'],
    keywordsAr: ['عزل ناري مصر', 'حماية حريق سلبية القاهرة', 'مواد عزل حريق مصر'],
  },
  {
    slug: 'concrete-polishing',
    icon: 'Sparkles',
    nameEn: 'Concrete Polishing',
    nameAr: 'تلميع الخرسانة',
    taglineEn: 'Industrial floor rehabilitation — from rough to showroom-ready',
    taglineAr: 'تأهيل الأرضيات الصناعية — من الخشن إلى مستوى صالة العرض',
    descriptionEn: `Concrete polishing transforms rough, dusty, or damaged industrial and commercial floors into durable, reflective, low-maintenance surfaces. The process is mechanical — diamond abrasive tooling progressively refines the concrete surface through a series of grits, from aggressive material removal to ultra-fine finishing. No coatings are required; the result is the concrete itself, hardened and polished.

Polished concrete outperforms epoxy coatings for durability and longevity. It eliminates the delamination, peeling, and VOC concerns of surface coatings while creating a surface that improves with cleaning. Applications range from warehouses and factories to retail showrooms and commercial lobbies.`,
    descriptionAr: `يحول تلميع الخرسانة الأرضيات الصناعية والتجارية الخشنة أو المتربة أو التالفة إلى أسطح متينة وعاكسة منخفضة الصيانة. العملية ميكانيكية — أدوات كاشطة ماسية تصقل سطح الخرسانة تدريجياً من خلال سلسلة من الخشونات، من إزالة المواد العدوانية إلى التشطيب الدقيق للغاية.`,
    useCasesEn: [
      'Warehouse and logistics center floors',
      'Manufacturing facility floors',
      'Retail showroom and commercial lobby finishing',
      'Car park floor treatment',
      'Food and pharmaceutical facility floors',
      'Residential and hospitality polished concrete',
    ],
    useCasesAr: [
      'أرضيات المستودعات ومراكز الخدمات اللوجستية',
      'أرضيات منشآت التصنيع',
      'تشطيب صالات عرض التجزئة والردهات التجارية',
      'معالجة أرضيات المواقف',
      'أرضيات منشآت الأغذية والصناعات الدوائية',
      'خرسانة مصقولة للمجمعات السكنية والضيافة',
    ],
    processEn: [
      'Floor condition assessment and crack repair',
      'Coarse grinding to remove surface defects',
      'Progressive grit sequence grinding',
      'Densifier application for hardening',
      'Fine polishing to target sheen level',
      'Guard application and maintenance training',
    ],
    processAr: [
      'تقييم حالة الأرضية وإصلاح الشقوق',
      'الطحن الخشن لإزالة عيوب السطح',
      'تسلسل الطحن بدرجات خشونة متدرجة',
      'تطبيق المكثف للتصليب',
      'التلميع الدقيق لمستوى اللمعان المستهدف',
      'تطبيق الحارس والتدريب على الصيانة',
    ],
    keywordsEn: ['concrete polishing Egypt', 'polished concrete Cairo', 'industrial floor finishing Egypt', 'floor grinding Middle East'],
    keywordsAr: ['تلميع خرسانة مصر', 'خرسانة مصقولة القاهرة', 'تشطيب أرضيات صناعية مصر'],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getServiceByLang(service: Service, lang: 'en' | 'ar') {
  return {
    name: lang === 'ar' ? service.nameAr : service.nameEn,
    tagline: lang === 'ar' ? service.taglineAr : service.taglineEn,
    description: lang === 'ar' ? service.descriptionAr : service.descriptionEn,
    useCases: lang === 'ar' ? service.useCasesAr : service.useCasesEn,
    process: lang === 'ar' ? service.processAr : service.processEn,
  }
}
