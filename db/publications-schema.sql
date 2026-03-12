-- Publications Table
CREATE TABLE IF NOT EXISTS publications (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    journal_info TEXT NOT NULL,
    year INTEGER NOT NULL,
    url TEXT,
    citation_count INTEGER DEFAULT 0,
    category TEXT NOT NULL,
    abstract TEXT,
    youtube_link TEXT,
    keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Publication Authors Junction Table
CREATE TABLE IF NOT EXISTS publication_authors (
    id SERIAL PRIMARY KEY,
    publication_id INTEGER REFERENCES publications(id) ON DELETE CASCADE,
    team_member_id INTEGER REFERENCES team_members(id) ON DELETE CASCADE,
    is_primary_author BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(publication_id, team_member_id)
);

-- Add indexes for better search performance
CREATE INDEX IF NOT EXISTS publications_title_idx ON publications USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS publications_abstract_idx ON publications USING gin(to_tsvector('english', abstract));
CREATE INDEX IF NOT EXISTS publications_keywords_idx ON publications USING gin(to_tsvector('english', keywords));
CREATE INDEX IF NOT EXISTS publications_category_idx ON publications(category);
CREATE INDEX IF NOT EXISTS publications_year_idx ON publications(year);
CREATE INDEX IF NOT EXISTS publications_citation_count_idx ON publications(citation_count);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year);
CREATE INDEX IF NOT EXISTS idx_publications_category ON publications(category);
CREATE INDEX IF NOT EXISTS idx_publication_authors_publication_id ON publication_authors(publication_id);
CREATE INDEX IF NOT EXISTS idx_publication_authors_team_member_id ON publication_authors(team_member_id);

-- Enable Row Level Security
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE publication_authors ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY publications_select_policy ON publications
  FOR SELECT USING (true);

CREATE POLICY publication_authors_select_policy ON publication_authors
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO publications (title, authors, journal_info, citation_count, year, url, category)
VALUES
  ('A novel application with explainable machine learning (SHAP and LIME) to predict soil N, P, and K nutrient content in cabbage cultivation', 
   'T Abekoon, H Sajindra, N Rathnayake, IU Ekanayake, A Jayakody, …', 
   'Smart Agricultural Technology 11, 100879', 
   0, 2025, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:Wp0gIr-vW9MC',
   'Environment'),
  
  ('Prediction of alkali-silica reaction expansion of concrete using explainable machine learning methods', 
   'Y Alahakoon, H Sajindra, A Krishantha, J Alawatugoda, IU Ekanayake, …', 
   'Discover Applied Sciences 7 (5), 1-20', 
   0, 2025, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:QIV2ME_5wuYC',
   'Environment'),
  
  ('Prediction of Dengue Outbreaks in Sri Lanka Using Machine Learning Techniques', 
   'HUUKMSLKGDRMSNKFNI Ekanayake', 
   'Sri Lanka Journal of Medicine 34 (1), 15-26', 
   0, 2025, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:9ZlFYXVOiuMC',
   'Education'),
  
  ('Modeling streamflow in non-gauged watersheds with sparse data considering physiographic, dynamic climate, and anthropogenic factors using explainable soft computing techniques', 
   'C Madhushani, K Dananjaya, IU Ekanayake, DPP Meddage, …', 
   'Journal of Hydrology 631, 130846', 
   33, 2024, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:UebtZRa9Y70C',
   'Environment'),
  
  ('Eco-friendly mix design of slag-ash-based geopolymer concrete using explainable deep learning', 
   'RSS Ranasinghe, W Kulasooriya, US Perera, IU Ekanayake, …', 
   'Results in Engineering 23, 102503', 
   29, 2024, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:_kc_bZDykSQC',
   'Environment'),
  
  ('A new frontier in streamflow modeling in ungauged basins with sparse data: A modified generative adversarial network with explainable AI', 
   'U Perera, DTS Coralage, IU Ekanayake, J Alawatugoda, DPP Meddage', 
   'Results in Engineering 21, 101920', 
   22, 2024, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:KlAtU1dfN6UC',
   'Environment'),
  
  ('Effect of endogenous and anthropogenic factors on the alkalinisation and salinisation of freshwater in United States by using explainable machine learning', 
   'ND Wimalagunarathna, G Dharmarathne, IU Ekanayake, U Rathanayake, …', 
   'Case Studies in Chemical and Environmental Engineering 10, 100919', 
   5, 2024, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:4TOpqqG69KYC',
   'Environment'),
  
  ('Navigating the Ethical Landscape of ChatGPT Integration in Scientific Research: Review of Challenges and Recommendations', 
   'AO Waduge, WKVJB Kulasooriya, RSS Ranasinghe, I Ekanayake, …', 
   'Journal of Computational and Cognitive Engineering 3 (4), 360-372', 
   1, 2024, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:aqlVkmm33-oC',
   'Ethical AI'),
  
  ('A novel explainable AI-based approach to estimate the natural period of vibration of masonry infill reinforced concrete frame structures using different machine learning techniques', 
   'P Thisovithan, H Aththanayake, DPP Meddage, IU Ekanayake, …', 
   'Results in Engineering 19, 101388', 
   55, 2023, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:LkGwnXOMwfcC',
   'Environment'),
  
  ('Modeling strength characteristics of basalt fiber reinforced concrete using multiple explainable machine learning with a graphical user interface', 
   'W Kulasooriya, RSS Ranasinghe, US Perera, P Thisovithan, …', 
   'Scientific Reports 13 (1), 13138', 
   39, 2023, 
   'https://scholar.google.com/citations?view_op  …', 
   'Scientific Reports 13 (1), 13138', 
   39, 2023, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:_FxGoFyzp5QC',
   'Environment'),
  
  ('Predicting adhesion strength of micropatterned surfaces using gradient boosting models and explainable artificial intelligence visualizations', 
   'IU Ekanayake, S Palitha, S Gamage, DPP Meddage, K Wijesooriya, …', 
   'Materials Today Communications 36, 106545', 
   33, 2023, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:ufrVoPGSRksC',
   'Education'),
  
  ('A novel approach to explain the black-box nature of machine learning in compressive strength predictions of concrete using Shapley additive explanations (SHAP)', 
   'IU Ekanayake, DPP Meddage, U Rathnayake', 
   'Case Studies in Construction Materials, e01059', 
   313, 2022, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:zYLM7Y9cAGgC',
   'Environment'),
  
  ('Explainable Machine Learning (XML) to predict external wind pressure of a low-rise building in urban-like settings', 
   'DPP Meddage, IU Ekanayake, AU Weerasuriya, CS Lewangamage, …', 
   'Journal of Wind Engineering and Industrial Aerodynamics 226, 105027', 
   64, 2022, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:Y0pCki6q_DkC',
   'Environment'),
  
  ('Interpretation of machine-learning-based (black-box) wind pressure predictions for low-rise gable-roofed buildings using Shapley additive explanations (SHAP)', 
   'P Meddage, I Ekanayake, US Perera, HM Azamathulla, MA Md Said, …', 
   'Buildings 12 (6), 734', 
   42, 2022, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:W7OEmFMy1HYC',
   'Environment'),
  
  ('Tree-based Regression Models for Predicting External Wind Pressure of a Building with an Unconventional Configuration', 
   'DPP Meddage, IU Ekanayake, CS Lewangamage, AU Weerasuriya', 
   'Sensors 22 (12), 4398', 
   33, 2022, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:IjCSPb-OGe4C',
   'Environment'),
  
  ('Segmentation and significance of herniation measurement using Lumbar Intervertebral Discs from the Axial View', 
   'Y Siriwardhana, D Karunarathna, IU Ekanayake', 
   '', 
   1, 2022, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:eQOLeE2rZwMC',
   'Education'),
  
  ('Tree-based Regression Models for Predicting External Wind Pressure of a Building with an Unconventional Configuration', 
   'DPP Meddage, IU Ekanayake, CS Lewangamage, AU Weerasuriya', 
   '2021 Moratuwa Engineering Research Conference (MERCon)', 
   29, 2021, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:IjCSPb-OGe4C',
   'Environment'),
  
  ('Chronic kidney disease prediction using machine learning methods', 
   'IU Ekanayake, D Herath', 
   '2020 Moratuwa Engineering Research Conference (MERCon), 260–265', 
   98, 2020, 
   'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=PUWme24AAAAJ&citation_for_view=PUWme24AAAAJ:UeHWp8X0CEIC',
   'Education'),
   
  ('Privacy-Preserving Machine Learning for Healthcare Data', 
   'A Silva, R Patel, N Perera', 
   'Journal of AI Privacy 5(2), 112-128', 
   45, 2023, 
   'https://example.com/privacy-ml-healthcare',
   'AI Privacy'),
   
  ('Ethical Considerations in Deploying AI Systems in Developing Nations', 
   'P Jayawardena, M Fernando, A Silva', 
   'Ethics in Artificial Intelligence 8(3), 201-215', 
   37, 2022, 
   'https://example.com/ethical-ai-developing-nations',
   'Ethical AI'),
   
  ('Differential Privacy Techniques for Natural Language Processing in Low-Resource Languages', 
   'N Perera, T Gunawardena', 
   'Transactions on Privacy-Preserving Technology 4(1), 78-92', 
   28, 2024, 
   'https://example.com/differential-privacy-nlp',
   'AI Privacy');

-- Link publications to team members
INSERT INTO publication_authors (publication_id, team_member_id, is_primary_author)
VALUES
  (1, 3, false),  -- Nimal Perera as non-primary author
  (2, 3, false),
  (3, 1, true),   -- Dr. Amara Silva as primary author
  (4, 5, true),   -- Malik Fernando as primary author
  (5, 2, false),  -- Dr. Raj Patel as non-primary author
  (6, 3, false),
  (7, 4, true),   -- Priya Jayawardena as primary author
  (8, 4, false),
  (9, 1, true),
  (10, 2, false),
  (11, 5, true),
  (12, 3, false),
  (13, 4, true),
  (14, 5, false),
  (15, 1, true),
  (16, 2, true),
  (17, 1, true),
  (18, 4, true),
  (19, 3, true),
  (20, 4, false),
  (20, 5, false);
