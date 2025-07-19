import { type NextRequest, NextResponse } from "next/server"
import { generateContractClause } from "@/lib/contract-analyzer"

export async function POST(request: NextRequest) {
  try {
    const { clauseType, requirements } = await request.json()

    if (!clauseType || !requirements) {
      return NextResponse.json({ error: "Clause type and requirements are required" }, { status: 400 })
    }

    const result = await generateContractClause(clauseType, requirements)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      clause: result.clause,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Clause generation API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
