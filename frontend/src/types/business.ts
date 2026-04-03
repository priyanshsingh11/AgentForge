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
    market_index: string;
    market_sentiment: string;
    competitor_velocity: string;
    m_and_a_activity: string;
    top_competitors: string[];
    competitor_strengths: string[];
    competitor_weaknesses: string[];
    gap_analysis: { title: string; impact: string; description: string }[];
    opportunities: { title: string; description: string }[];
    actionable_steps: string[];
    priority_actions: string[];
    estimated_impact: string;
  };
  trends: {
    results: string[];
  };
}
