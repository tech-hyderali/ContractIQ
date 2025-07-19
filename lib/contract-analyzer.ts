import { generateObject, generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const ContractAnalysisSchema = z.object({
  summary: z.string(),
  contractType: z.string(),
  complianceScore: z.number().min(0).max(100),
  keyTerms: z.object({
    parties: z.array(z.string()),
    effectiveDate: z.string(),
    expirationDate: z.string(),
    paymentTerms: z.string(),
    terminationClause: z.string(),
    governingLaw: z.string(),
    contractValue: z.string(),
  }),
  clauses: z.array(
    z.object({
      type: z.string(),
      content: z.string(),
      importance: z.enum(["high", "medium", "low"]),
      risk: z.enum(["high", "medium", "low"]),
      suggestions: z.array(z.string()),
      complianceIssues: z.array(z.string()),
    }),
  ),
  obligations: z.array(
    z.object({
      party: z.string(),
      obligation: z.string(),
      deadline: z.string().optional(),
      status: z.enum(["pending", "completed", "overdue"]),
    }),
  ),
  risks: z.array(
    z.object({
      description: z.string(),
      severity: z.enum(["high", "medium", "low"]),
      mitigation: z.string(),
      probability: z.number().min(0).max(1),
    }),
  ),
  recommendations: z.array(
    z.object({
      type: z.enum(["improvement", "risk-mitigation", "compliance"]),
      title: z.string(),
      description: z.string(),
      priority: z.enum(["high", "medium", "low"]),
    }),
  ),
  negotiationInsights: z.object({
    favorability: z.number().min(0).max(100),
    keyNegotiationPoints: z.array(z.string()),
    marketComparison: z.string(),
  }),
})

export async function analyzeContract(contractText: string, contractType?: string) {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: ContractAnalysisSchema,
      prompt: `
        Analyze the following legal contract and provide a comprehensive analysis:

        Contract Text:
        ${contractText}

        ${contractType ? `Expected Contract Type: ${contractType}` : ""}

        Please provide:
        1. A detailed summary of the contract
        2. Identification of contract type
        3. Compliance score (0-100) based on legal best practices
        4. Key terms extraction
        5. Detailed clause analysis with suggestions and compliance issues
        6. Party obligations with deadlines and status
        7. Risk assessment with probability scoring
        8. Actionable recommendations for improvement
        9. Negotiation insights and market comparison

        Focus on:
        - Legal compliance and regulatory requirements
        - Risk identification and mitigation strategies
        - Negotiation leverage points
        - Practical business implications
        - Industry-specific considerations
      `,
    })

    return {
      success: true,
      data: {
        id: `analysis-${Date.now()}`,
        fileName: "contract.pdf",
        uploadDate: new Date().toISOString(),
        ...object,
      },
    }
  } catch (error) {
    console.error("Contract analysis error:", error)
    return {
      success: false,
      error: "Failed to analyze contract. Please try again.",
    }
  }
}

export async function compareContracts(contracts: string[]) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Compare the following contracts and provide a detailed comparison analysis:

        ${contracts.map((contract, index) => `Contract ${index + 1}:\n${contract}\n\n`).join("")}

        Please provide:
        1. Side-by-side comparison of key terms
        2. Differences in risk profiles
        3. Compliance variations
        4. Negotiation advantages/disadvantages
        5. Recommendations for harmonization
        6. Best practices from each contract
      `,
    })

    return {
      success: true,
      comparison: text,
    }
  } catch (error) {
    console.error("Contract comparison error:", error)
    return {
      success: false,
      error: "Failed to compare contracts. Please try again.",
    }
  }
}

export async function generateContractClause(clauseType: string, requirements: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Generate a professional ${clauseType} clause for a legal contract with the following requirements:

        Requirements: ${requirements}

        Please provide:
        1. The complete clause text
        2. Alternative variations
        3. Legal considerations
        4. Potential risks and mitigations
        5. Industry best practices

        Ensure the clause is legally sound and professionally drafted.
      `,
    })

    return {
      success: true,
      clause: text,
    }
  } catch (error) {
    console.error("Clause generation error:", error)
    return {
      success: false,
      error: "Failed to generate clause. Please try again.",
    }
  }
}
