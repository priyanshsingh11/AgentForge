export interface Business {
  name: string;
  rating: number | null;
  address: string;
}

export interface AnalysisResult {
  businesses: Business[];
  analysis: {
    average_rating: number | null;
    top_competitors: Business[];
    weak_competitors: Business[];
  };
  sentiments: {
    positives: string[];
    negatives: string[];
    summary: string;
  };
  strategies: {
    market_summary: string;
    top_competitors: string[];
    competitor_strengths: string[];
    competitor_weaknesses: string[];
    gap_analysis: string[];
    opportunities: string[];
    actionable_steps: string[];
    priority_actions: string[];
    estimated_impact: string;
  };
  trends: {
    results: string[];
  };
}
