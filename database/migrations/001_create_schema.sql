-- Gen AI Home Interior Designer - Database Schema
-- Migration: 001_create_schema
-- Created: 2025-10-25

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 프로젝트 테이블
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  original_image_url TEXT,
  redesigned_image_url TEXT,
  design_type TEXT CHECK (design_type IN ('interior', 'exterior')),
  room_type TEXT,
  style TEXT,
  background_color TEXT,
  foreground_color TEXT,
  ai_description TEXT,
  cost_estimate TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 디자인 히스토리 테이블
CREATE TABLE IF NOT EXISTS design_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  iteration_number INT NOT NULL,
  image_url TEXT NOT NULL,
  prompt_used TEXT,
  ai_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_design_history_project_id ON design_history(project_id);

-- RLS (Row Level Security) 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_history ENABLE ROW LEVEL SECURITY;

-- RLS 정책 생성 (읽기 허용)
CREATE POLICY "Allow read access to all users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow read access to all projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow read access to all design history" ON design_history FOR SELECT USING (true);

-- 삽입 정책 (서비스 역할 허용)
CREATE POLICY "Allow insert for service role" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for service role on projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert for service role on design_history" ON design_history FOR INSERT WITH CHECK (true);

-- 업데이트 정책
CREATE POLICY "Allow update for service role" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow update for service role on projects" ON projects FOR UPDATE USING (true);

-- 샘플 데이터 삽입 (테스트용)
INSERT INTO users (email, name) VALUES
  ('test@example.com', 'Test User')
ON CONFLICT (email) DO NOTHING;
