import { type NextRequest, NextResponse } from "next/server"
import { compareContracts } from "@/lib/contract-analyzer"

export async function POST(request: NextRequest) {
  try {
    const { contracts } = await request.json()

    if (!contracts || contracts.length < 2) {
      return NextResponse.json({ error: "At least 2 contracts required for comparison" }, { status: 400 })
    }

    const result = await compareContracts(contracts)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      comparison: result.comparison,
      processedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Comparison API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
