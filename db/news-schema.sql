-- Create news table for the CMS
CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  published_date TIMESTAMP WITH TIME ZONE NOT NULL,
  featured BOOLEAN DEFAULT false,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_news_published_date ON news(published_date);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_featured ON news(featured);
