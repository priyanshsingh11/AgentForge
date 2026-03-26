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
    strengths: string[];
    gaps: string[];
    strategies: string[];
  };
  trends: {
    results: string[];
  };
}
