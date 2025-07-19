import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface ContractRecord {
  id: string
  user_id: string
  file_name: string
  file_size: number
  contract_type: string
  analysis_data: any
  compliance_score: number
  created_at: string
  updated_at: string
}

export async function saveContractAnalysis(analysis: any, userId: string) {
  const { data, error } = await supabase.from("contract_analyses").insert({
    user_id: userId,
    file_name: analysis.fileName,
    file_size: analysis.fileSize || 0,
    contract_type: analysis.contractType,
    analysis_data: analysis,
    compliance_score: analysis.complianceScore,
  })

  if (error) {
    console.error("Error saving analysis:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function getContractHistory(userId: string) {
  const { data, error } = await supabase
    .from("contract_analyses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching history:", error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
