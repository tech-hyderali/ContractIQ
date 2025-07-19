"use client"

import type React from "react"

import { useState } from "react"
import {
  Upload,
  FileText,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  DollarSign,
  Scale,
  GitCompare,
  Lightbulb,
  Shield,
  Search,
  History,
  Plus,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ContractAnalysis {
  id: string
  fileName: string
  uploadDate: string
  summary: string
  contractType: string
  complianceScore: number
  keyTerms: {
    parties: string[]
    effectiveDate: string
    expirationDate: string
    paymentTerms: string
    terminationClause: string
    governingLaw: string
    contractValue: string
  }
  clauses: {
    id: string
    type: string
    content: string
    importance: "high" | "medium" | "low"
    risk: "high" | "medium" | "low"
    suggestions: string[]
    complianceIssues: string[]
  }[]
  obligations: {
    party: string
    obligation: string
    deadline?: string
    status: "pending" | "completed" | "overdue"
  }[]
  risks: {
    description: string
    severity: "high" | "medium" | "low"
    mitigation: string
    probability: number
  }[]
  recommendations: {
    type: "improvement" | "risk-mitigation" | "compliance"
    title: string
    description: string
    priority: "high" | "medium" | "low"
  }[]
  negotiationInsights: {
    favorability: number
    keyNegotiationPoints: string[]
    marketComparison: string
  }
}

interface ContractTemplate {
  id: string
  name: string
  type: string
  description: string
  clauses: string[]
}

export default function LegalContractAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null)
  const [progress, setProgress] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContractType, setSelectedContractType] = useState<string>("")
  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedContracts, setSelectedContracts] = useState<string[]>([])
  const [showTemplates, setShowTemplates] = useState(false)
  const [analysisHistory, setAnalysisHistory] = useState<ContractAnalysis[]>([])
  const [aiInsightsEnabled, setAiInsightsEnabled] = useState(true)
  const [complianceChecking, setComplianceChecking] = useState(true)

  const contractTemplates: ContractTemplate[] = [
    {
      id: "1",
      name: "Service Agreement",
      type: "service",
      description: "Standard service agreement template with customizable terms",
      clauses: ["Payment Terms", "Scope of Work", "Termination", "Intellectual Property"],
    },
    {
      id: "2",
      name: "Employment Contract",
      type: "employment",
      description: "Comprehensive employment contract with benefits and obligations",
      clauses: ["Compensation", "Benefits", "Confidentiality", "Non-Compete"],
    },
    {
      id: "3",
      name: "NDA Template",
      type: "confidentiality",
      description: "Non-disclosure agreement for protecting confidential information",
      clauses: ["Definition of Confidential Information", "Obligations", "Duration", "Remedies"],
    },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setAnalysis(null)
    }
  }

  const analyzeContract = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setProgress(0)

    // Simulate advanced analysis with multiple stages
    const stages = [
      "Extracting text from document...",
      "Analyzing contract structure...",
      "Identifying key clauses...",
      "Checking compliance requirements...",
      "Generating AI insights...",
      "Calculating risk assessment...",
      "Finalizing analysis...",
    ]

    let currentStage = 0
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = ((currentStage + 1) / stages.length) * 100
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        if (prev >= (currentStage / stages.length) * 100) {
          currentStage++
        }
        return newProgress
      })
    }, 800)

    // Simulate API call with enhanced mock data
    setTimeout(() => {
      clearInterval(progressInterval)
      setProgress(100)

      const mockAnalysis: ContractAnalysis = {
        id: `analysis-${Date.now()}`,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        contractType: "Service Agreement",
        complianceScore: 85,
        summary:
          "This comprehensive service agreement between TechCorp Inc. and Digital Solutions LLC establishes a 12-month software development engagement. The contract demonstrates strong legal structure with well-defined deliverables, payment terms, and intellectual property provisions. Key strengths include clear milestone definitions and robust confidentiality clauses. Areas for improvement include liability limitations and dispute resolution mechanisms.",
        keyTerms: {
          parties: ["TechCorp Inc. (Client)", "Digital Solutions LLC (Service Provider)"],
          effectiveDate: "January 1, 2024",
          expirationDate: "December 31, 2024",
          paymentTerms: "Net 30 days, monthly invoicing",
          terminationClause: "Either party may terminate with 30 days written notice",
          governingLaw: "State of California",
          contractValue: "$600,000",
        },
        clauses: [
          {
            id: "clause-1",
            type: "Payment Terms",
            content: "Client agrees to pay Service Provider monthly fees of $50,000 within 30 days of invoice receipt.",
            importance: "high",
            risk: "medium",
            suggestions: [
              "Consider adding late payment penalties",
              "Include currency specification for international contracts",
              "Add payment method specifications",
            ],
            complianceIssues: ["Missing dispute resolution for payment delays"],
          },
          {
            id: "clause-2",
            type: "Intellectual Property",
            content: "All work product and deliverables shall be owned by Client upon full payment.",
            importance: "high",
            risk: "low",
            suggestions: [
              "Clarify pre-existing IP ownership",
              "Add provisions for derivative works",
              "Include IP indemnification clauses",
            ],
            complianceIssues: [],
          },
          {
            id: "clause-3",
            type: "Confidentiality",
            content:
              "Both parties agree to maintain confidentiality of proprietary information for 5 years post-termination.",
            importance: "high",
            risk: "low",
            suggestions: ["Define what constitutes confidential information", "Add return of materials clause"],
            complianceIssues: [],
          },
          {
            id: "clause-4",
            type: "Limitation of Liability",
            content: "Service Provider's liability shall not exceed the total contract value.",
            importance: "medium",
            risk: "high",
            suggestions: [
              "Consider mutual liability limitations",
              "Add exceptions for willful misconduct",
              "Include insurance requirements",
            ],
            complianceIssues: ["May not comply with consumer protection laws in some jurisdictions"],
          },
        ],
        obligations: [
          {
            party: "TechCorp Inc.",
            obligation: "Provide project requirements and specifications",
            deadline: "Within 5 business days of contract execution",
            status: "pending",
          },
          {
            party: "TechCorp Inc.",
            obligation: "Make monthly payments within 30 days of invoice",
            deadline: "Monthly",
            status: "pending",
          },
          {
            party: "Digital Solutions LLC",
            obligation: "Deliver monthly progress reports",
            deadline: "Last business day of each month",
            status: "pending",
          },
          {
            party: "Digital Solutions LLC",
            obligation: "Complete project deliverables according to specifications",
            deadline: "December 31, 2024",
            status: "pending",
          },
        ],
        risks: [
          {
            description: "Payment delays could impact project timeline and cash flow",
            severity: "medium",
            mitigation: "Implement milestone-based payments with clear deadlines and late fees",
            probability: 0.3,
          },
          {
            description: "Scope creep not adequately addressed in current terms",
            severity: "high",
            mitigation: "Define detailed change request process with cost implications",
            probability: 0.6,
          },
          {
            description: "Limited liability cap may not cover all potential damages",
            severity: "low",
            mitigation: "Consider professional liability insurance and mutual caps",
            probability: 0.1,
          },
          {
            description: "Termination clause may be too restrictive for business needs",
            severity: "medium",
            mitigation: "Add provisions for termination for cause with shorter notice periods",
            probability: 0.25,
          },
        ],
        recommendations: [
          {
            type: "improvement",
            title: "Add Force Majeure Clause",
            description:
              "Include comprehensive force majeure provisions to protect both parties from unforeseeable circumstances",
            priority: "medium",
          },
          {
            type: "risk-mitigation",
            title: "Implement Dispute Resolution Mechanism",
            description: "Add mediation and arbitration clauses to avoid costly litigation",
            priority: "high",
          },
          {
            type: "compliance",
            title: "Review Data Protection Requirements",
            description: "Ensure compliance with GDPR, CCPA, and other data protection regulations",
            priority: "high",
          },
          {
            type: "improvement",
            title: "Strengthen Indemnification Clauses",
            description: "Add mutual indemnification provisions for third-party claims",
            priority: "medium",
          },
        ],
        negotiationInsights: {
          favorability: 72,
          keyNegotiationPoints: [
            "Payment terms favor the client with 30-day payment window",
            "IP ownership heavily favors client",
            "Liability limitations protect service provider",
            "Termination notice period is standard but could be negotiated",
          ],
          marketComparison:
            "This contract terms are generally favorable compared to industry standards, with competitive payment terms and reasonable liability protections.",
        },
      }

      setAnalysis(mockAnalysis)
      setAnalysisHistory((prev) => [mockAnalysis, ...prev])
      setIsAnalyzing(false)
      setProgress(0)
    }, 6000)
  }

  const exportAnalysis = () => {
    if (!analysis) return

    const exportData = {
      ...analysis,
      exportDate: new Date().toISOString(),
      exportVersion: "2.0",
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contract-analysis-${analysis.fileName}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "secondary"
      case "overdue":
        return "destructive"
      case "pending":
        return "default"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scale className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Advanced Legal Contract Analyzer</h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            AI-powered contract analysis with compliance checking, risk assessment, negotiation insights, and template
            generation. Upload contracts to get comprehensive analysis and actionable recommendations.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => setShowTemplates(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <Button variant="outline" size="sm" onClick={() => setComparisonMode(!comparisonMode)}>
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Contracts
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <History className="w-4 h-4 mr-2" />
                  History ({analysisHistory.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Analysis History</DialogTitle>
                  <DialogDescription>View and manage your previous contract analyses</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {analysisHistory.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{item.fileName}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(item.uploadDate).toLocaleDateString()} • {item.contractType}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Score: {item.complianceScore}%</Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Settings Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analysis Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contract-type">Contract Type</Label>
                <Select value={selectedContractType} onValueChange={setSelectedContractType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Auto-detect" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Service Agreement</SelectItem>
                    <SelectItem value="employment">Employment Contract</SelectItem>
                    <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                    <SelectItem value="lease">Lease Agreement</SelectItem>
                    <SelectItem value="purchase">Purchase Agreement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="ai-insights" checked={aiInsightsEnabled} onCheckedChange={setAiInsightsEnabled} />
                <Label htmlFor="ai-insights">AI Insights</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="compliance" checked={complianceChecking} onCheckedChange={setComplianceChecking} />
                <Label htmlFor="compliance">Compliance Checking</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Contract
            </CardTitle>
            <CardDescription>
              Upload PDF, DOC, DOCX, or TXT files. Maximum file size: 25MB. Supports batch processing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  multiple={comparisonMode}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    {comparisonMode ? "Upload multiple contracts to compare" : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF, DOC, DOCX, or TXT files • Advanced OCR support • Batch processing available
                  </p>
                </label>
              </div>

              {file && (
                <Alert>
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription>
                    File selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    {selectedContractType && ` • Type: ${selectedContractType}`}
                  </AlertDescription>
                </Alert>
              )}

              {isAnalyzing && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span className="text-sm font-medium">
                      Advanced AI analysis in progress... ({Math.round(progress)}%)
                    </span>
                  </div>
                  <Progress value={progress} className="w-full" />
                  <div className="text-xs text-gray-500 text-center">
                    Processing with GPT-4, compliance checking, and risk assessment
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={analyzeContract} disabled={!file || isAnalyzing} className="flex-1">
                  {isAnalyzing ? "Analyzing..." : "Analyze Contract"}
                </Button>
                {analysis && (
                  <>
                    <Button variant="outline" onClick={exportAnalysis}>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline">
                      <GitCompare className="w-4 h-4 mr-2" />
                      Compare
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{analysis.complianceScore}%</div>
                  <div className="text-sm text-gray-600">Compliance Score</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{analysis.negotiationInsights.favorability}%</div>
                  <div className="text-sm text-gray-600">Favorability</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {analysis.risks.filter((r) => r.severity === "high").length}
                  </div>
                  <div className="text-sm text-gray-600">High Risks</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{analysis.recommendations.length}</div>
                  <div className="text-sm text-gray-600">Recommendations</div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="summary" className="space-y-4">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="terms">Key Terms</TabsTrigger>
                <TabsTrigger value="clauses">Clauses</TabsTrigger>
                <TabsTrigger value="obligations">Obligations</TabsTrigger>
                <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
                <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
                <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
              </TabsList>

              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle>Contract Summary</CardTitle>
                    <CardDescription>
                      AI-generated comprehensive overview • Contract Type: {analysis.contractType}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
                      <Separator />
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Contract Highlights</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Total Value: {analysis.keyTerms.contractValue}</li>
                            <li>• Duration: 12 months</li>
                            <li>• Payment Terms: {analysis.keyTerms.paymentTerms}</li>
                            <li>• Governing Law: {analysis.keyTerms.governingLaw}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Key Strengths</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Well-defined deliverables</li>
                            <li>• Strong IP protection</li>
                            <li>• Clear payment structure</li>
                            <li>• Comprehensive confidentiality</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="terms">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Key Terms & Conditions
                    </CardTitle>
                    <CardDescription>Essential contract information extracted and verified</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-600" />
                            <span className="font-medium">Contracting Parties</span>
                          </div>
                          <ul className="list-disc list-inside text-sm text-gray-600 ml-6 space-y-1">
                            {analysis.keyTerms.parties.map((party, index) => (
                              <li key={index}>{party}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-green-600" />
                            <span className="font-medium">Contract Duration</span>
                          </div>
                          <div className="text-sm text-gray-600 ml-6">
                            <p>Effective: {analysis.keyTerms.effectiveDate}</p>
                            <p>Expires: {analysis.keyTerms.expirationDate}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-yellow-600" />
                            <span className="font-medium">Financial Terms</span>
                          </div>
                          <div className="text-sm text-gray-600 ml-6">
                            <p>Total Value: {analysis.keyTerms.contractValue}</p>
                            <p>Payment: {analysis.keyTerms.paymentTerms}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            <span className="font-medium">Termination Provisions</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{analysis.keyTerms.terminationClause}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Scale className="w-4 h-4 text-purple-600" />
                            <span className="font-medium">Legal Framework</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">Governed by: {analysis.keyTerms.governingLaw}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clauses">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Contract Clauses Analysis</h3>
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      <Input
                        placeholder="Search clauses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {analysis.clauses
                      .filter((clause) => clause.type.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((clause) => (
                        <Card key={clause.id}>
                          <CardContent className="p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{clause.type}</h4>
                              <div className="flex gap-2">
                                <Badge variant={getImportanceColor(clause.importance)}>
                                  {clause.importance} importance
                                </Badge>
                                <Badge variant={getRiskColor(clause.risk)}>{clause.risk} risk</Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{clause.content}</p>

                            {clause.suggestions.length > 0 && (
                              <div className="bg-blue-50 p-3 rounded-md">
                                <div className="flex items-center gap-2 mb-2">
                                  <Lightbulb className="w-4 h-4 text-blue-600" />
                                  <span className="text-sm font-medium text-blue-800">AI Suggestions</span>
                                </div>
                                <ul className="text-sm text-blue-700 space-y-1">
                                  {clause.suggestions.map((suggestion, index) => (
                                    <li key={index}>• {suggestion}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {clause.complianceIssues.length > 0 && (
                              <div className="bg-red-50 p-3 rounded-md">
                                <div className="flex items-center gap-2 mb-2">
                                  <Shield className="w-4 h-4 text-red-600" />
                                  <span className="text-sm font-medium text-red-800">Compliance Issues</span>
                                </div>
                                <ul className="text-sm text-red-700 space-y-1">
                                  {clause.complianceIssues.map((issue, index) => (
                                    <li key={index}>• {issue}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="obligations">
                <Card>
                  <CardHeader>
                    <CardTitle>Party Obligations & Deadlines</CardTitle>
                    <CardDescription>Tracked responsibilities with status monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.obligations.map((obligation, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{obligation.party}</Badge>
                              <Badge variant={getStatusColor(obligation.status)}>{obligation.status}</Badge>
                            </div>
                            {obligation.deadline && (
                              <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {obligation.deadline}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">{obligation.obligation}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risks">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      Comprehensive Risk Analysis
                    </CardTitle>
                    <CardDescription>AI-powered risk assessment with probability scoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.risks.map((risk, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{risk.description}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant={getRiskColor(risk.severity)}>{risk.severity} severity</Badge>
                              <Badge variant="outline">{Math.round(risk.probability * 100)}% probability</Badge>
                            </div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-md">
                            <p className="text-sm text-blue-800">
                              <span className="font-medium">Mitigation Strategy: </span>
                              {risk.mitigation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      AI-Powered Recommendations
                    </CardTitle>
                    <CardDescription>Actionable insights to improve your contract</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analysis.recommendations.map((rec, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{rec.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant={getPriorityColor(rec.priority)}>{rec.priority} priority</Badge>
                              <Badge variant="outline">{rec.type}</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="negotiation">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GitCompare className="w-5 h-5 text-green-600" />
                      Negotiation Intelligence
                    </CardTitle>
                    <CardDescription>Strategic insights for contract negotiations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Contract Favorability</h4>
                        <div className="flex items-center gap-3">
                          <Progress value={analysis.negotiationInsights.favorability} className="flex-1" />
                          <span className="text-sm font-medium">{analysis.negotiationInsights.favorability}%</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{analysis.negotiationInsights.marketComparison}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Key Negotiation Points</h4>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {analysis.negotiationInsights.keyNegotiationPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Contract Templates Dialog */}
        <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Contract Templates</DialogTitle>
              <DialogDescription>Choose from pre-built templates or create custom contracts</DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4">
              {contractTemplates.map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline">{template.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.clauses.map((clause, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {clause}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
