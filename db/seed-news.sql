-- Insert dummy news items
INSERT INTO news (title, description, content, image_url, published_date, featured, slug) VALUES
(
  'New AI Research Center Launched',
  'CIAIR announces the opening of a state-of-the-art AI research facility focused on ethical AI development.',
  'Ceylon Institute for Artificial Intelligence and Research (CIAIR) is proud to announce the grand opening of our new research facility. This cutting-edge center will house over 50 researchers dedicated to advancing the field of ethical AI development. The facility includes specialized labs for machine learning, natural language processing, and computer vision research. This expansion represents a significant milestone in our mission to develop AI technologies that benefit society while adhering to strict ethical guidelines.',
  '/placeholder.svg?height=400&width=600&query=AI%20research%20center',
  NOW() - INTERVAL '2 days',
  true,
  'new-ai-research-center-launched'
),
(
  'Breakthrough in Natural Language Processing',
  'CIAIR researchers develop new algorithm that improves language understanding in AI systems by 35%.',
  'A team of CIAIR researchers has developed a groundbreaking algorithm that significantly improves how AI systems understand and process natural language. The new approach, which combines advanced neural network architectures with novel training methodologies, has demonstrated a 35% improvement in comprehension accuracy compared to current state-of-the-art systems. This breakthrough has important implications for applications ranging from virtual assistants to automated customer service systems, potentially revolutionizing how humans interact with AI in everyday scenarios.',
  '/placeholder.svg?height=400&width=600&query=natural%20language%20processing',
  NOW() - INTERVAL '7 days',
  true,
  'breakthrough-in-natural-language-processing'
),
(
  'CIAIR Partners with Leading Universities',
  'New collaborative program connects our researchers with academic institutions worldwide to accelerate AI innovation.',
  'CIAIR has established a new collaborative program that connects our research teams with leading academic institutions around the world. This initiative aims to accelerate AI innovation through knowledge sharing and joint research projects. Partner universities include MIT, Stanford, Oxford, and Tokyo Institute of Technology. The program will facilitate researcher exchanges, shared access to resources, and co-authored publications. This global collaboration represents an important step in our commitment to advancing AI research through open science and international cooperation.',
  '/placeholder.svg?height=400&width=600&query=university%20partnership',
  NOW() - INTERVAL '14 days',
  false,
  'ciair-partners-with-leading-universities'
),
(
  'Annual AI Ethics Symposium Announced',
  'Registration now open for CIAIR's flagship event focusing on responsible AI development and governance.',
  'CIAIR is pleased to announce our Annual AI Ethics Symposium, scheduled for next month. This flagship event brings together experts from academia, industry, and government to discuss critical issues in responsible AI development and governance. This year's theme, "Building Trust in Autonomous Systems," will explore approaches to creating AI systems that are not only powerful but also transparent, fair, and accountable. Keynote speakers include renowned ethicists and AI researchers from around the world. Registration is now open, with early bird discounts available until the end of the week.',
  '/placeholder.svg?height=400&width=600&query=AI%20ethics%20symposium',
  NOW() - INTERVAL '21 days',
  false,
  'annual-ai-ethics-symposium-announced'
),
(
  'New Grant Funds Environmental AI Research',
  'CIAIR receives $3.5 million to develop AI solutions for climate change monitoring and mitigation.',
  'CIAIR has been awarded a $3.5 million grant to develop advanced AI solutions for climate change monitoring and mitigation. The funding will support a three-year research program focused on creating machine learning models that can analyze environmental data with unprecedented accuracy. Applications will include predicting extreme weather events, optimizing renewable energy systems, and monitoring deforestation and biodiversity loss. This project represents a significant expansion of our environmental AI research portfolio and underscores our commitment to addressing urgent global challenges through innovative technology.',
  '/placeholder.svg?height=400&width=600&query=environmental%20AI%20research',
  NOW() - INTERVAL '30 days',
  false,
  'new-grant-funds-environmental-ai-research'
),
(
  'CIAIR Researchers Present at Global AI Conference',
  'Our team showcased latest findings in reinforcement learning and computer vision at international event.',
  'A delegation of CIAIR researchers recently presented their latest findings at the Global AI Conference in Singapore. The team showcased groundbreaking work in reinforcement learning algorithms and computer vision systems. Their presentation on "Self-Correcting Neural Networks" generated significant interest from the international research community, with several potential collaboration opportunities emerging from the event. This conference participation highlights CIAIR's growing influence in the global AI research landscape and our commitment to sharing knowledge with the broader scientific community.',
  '/placeholder.svg?height=400&width=600&query=AI%20conference%20presentation',
  NOW() - INTERVAL '45 days',
  false,
  'ciair-researchers-present-at-global-ai-conference'
);
