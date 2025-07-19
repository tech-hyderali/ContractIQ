-- Create contract_analyses table
CREATE TABLE IF NOT EXISTS contract_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_size INTEGER DEFAULT 0,
    contract_type TEXT,
    analysis_data JSONB NOT NULL,
    compliance_score INTEGER CHECK (compliance_score >= 0 AND compliance_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contract_templates table
CREATE TABLE IF NOT EXISTS contract_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    template_data JSONB NOT NULL,
    is_public BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contract_comparisons table
CREATE TABLE IF NOT EXISTS contract_comparisons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    contract_ids UUID[] NOT NULL,
    comparison_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contract_analyses_user_id ON contract_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_contract_analyses_created_at ON contract_analyses(created_at);
CREATE INDEX IF NOT EXISTS idx_contract_analyses_contract_type ON contract_analyses(contract_type);
CREATE INDEX IF NOT EXISTS idx_contract_templates_type ON contract_templates(type);
CREATE INDEX IF NOT EXISTS idx_contract_comparisons_user_id ON contract_comparisons(user_id);

-- Enable Row Level Security
ALTER TABLE contract_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_comparisons ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own contract analyses" ON contract_analyses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contract analyses" ON contract_analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contract analyses" ON contract_analyses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contract analyses" ON contract_analyses
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view public templates and their own" ON contract_templates
    FOR SELECT USING (is_public = true OR auth.uid() = created_by);

CREATE POLICY "Users can create their own templates" ON contract_templates
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can view their own comparisons" ON contract_comparisons
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own comparisons" ON contract_comparisons
    FOR INSERT WITH CHECK (auth.uid() = user_id);
