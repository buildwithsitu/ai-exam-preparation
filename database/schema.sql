-- Enable pgvector and UUID extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
    full_name VARCHAR(255),
    target_exam VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Syllabus Hierarchy Table
CREATE TABLE IF NOT EXISTS syllabus_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES syllabus_nodes(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    level INTEGER NOT NULL DEFAULT 1, -- 1: Subject, 2: Topic, 3: Subtopic
    sequence_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Document Knowledge Base & Embeddings (RAG)
CREATE TABLE IF NOT EXISTS document_chunks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    syllabus_node_id UUID REFERENCES syllabus_nodes(id) ON DELETE SET NULL,
    source_title VARCHAR(255) NOT NULL,
    page_number INTEGER,
    chunk_text TEXT NOT NULL,
    embedding vector(1536), -- Dimension for OpenAI / Gemini text embeddings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Question Bank Table
CREATE TABLE IF NOT EXISTS questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    syllabus_node_id UUID REFERENCES syllabus_nodes(id) ON DELETE SET NULL,
    question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('MCQ', 'MSQ', 'NAT', 'SUBJECTIVE')),
    difficulty VARCHAR(20) DEFAULT 'MEDIUM' CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD', 'ADVANCED')),
    content TEXT NOT NULL,
    options JSONB, -- array of options for MCQ/MSQ
    correct_answer JSONB NOT NULL, -- answer keys or numerical range
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Mock Tests
CREATE TABLE IF NOT EXISTS tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    test_type VARCHAR(50) DEFAULT 'FULL_MOCK' CHECK (test_type IN ('FULL_MOCK', 'SUBJECT_TEST', 'TOPIC_TEST', 'CUSTOM')),
    duration_minutes INTEGER NOT NULL DEFAULT 180,
    total_marks DECIMAL(6, 2) NOT NULL DEFAULT 100.00,
    negative_marking_ratio DECIMAL(4, 2) DEFAULT 0.33,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Test Questions Mapping
CREATE TABLE IF NOT EXISTS test_questions (
    test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    marks DECIMAL(4, 2) NOT NULL DEFAULT 1.00,
    section_order INTEGER DEFAULT 0,
    PRIMARY KEY (test_id, question_id)
);

-- 7. Test Attempts
CREATE TABLE IF NOT EXISTS test_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
    score_obtained DECIMAL(6, 2) DEFAULT 0.00,
    time_spent_seconds INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'IN_PROGRESS' CHECK (status IN ('IN_PROGRESS', 'COMPLETED', 'ABANDONED')),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 8. Mistake Log & Spaced Repetition (SM-2)
CREATE TABLE IF NOT EXISTS mistake_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    error_type VARCHAR(50) CHECK (error_type IN ('CONCEPTUAL', 'CALCULATION', 'MISREAD', 'TIME_PRESSURE')),
    repetition_interval INTEGER DEFAULT 1,
    ease_factor DECIMAL(4, 2) DEFAULT 2.50,
    next_review_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 day',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_syllabus_parent ON syllabus_nodes(parent_id);
CREATE INDEX IF NOT EXISTS idx_questions_syllabus ON questions(syllabus_node_id);
CREATE INDEX IF NOT EXISTS idx_test_attempts_user ON test_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_mistake_review_date ON mistake_logs(user_id, next_review_date);

