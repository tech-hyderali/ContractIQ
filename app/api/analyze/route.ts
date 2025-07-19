import { type NextRequest, NextResponse } from "next/server"
import { analyzeContract } from "@/lib/contract-analyzer"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const contractType = formData.get("contractType") as string
    const aiInsights = formData.get("aiInsights") === "true"
    const complianceChecking = formData.get("complianceChecking") === "true"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Extract text from file (simplified - in production, use proper PDF/DOC parsing)
    const text = await file.text()

    // Analyze contract with AI
    const result = await analyzeContract(text, contractType)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      analysis: result.data,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        processedAt: new Date().toISOString(),
        aiInsights,
        complianceChecking,
      },
    })
  } catch (error) {
    console.error("Analysis API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
