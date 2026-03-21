/**
 * Example Ads Matching Algorithm
 * 
 * This function receives a user profile and a list of ads,
 * and returns the ads matched based on simple property matching.
 * Replace or extend this logic with your actual business requirements.
 */

export interface Ad {
  id: string;
  title: string;
  targetAge?: number;
  keywords?: string[];
}

export interface UserProfile {
  id: string;
  age?: number;
  interests?: string[];
}

export function matchAds(userProfile: UserProfile, adsList: Ad[]): Ad[] {
  // Example: match by age if specified
  let matched = adsList;
  if (userProfile.age !== undefined) {
    matched = matched.filter(ad => ad.targetAge === undefined || ad.targetAge === userProfile.age);
  }

  // Example: match by interests/keywords overlap if specified
  if (userProfile.interests && userProfile.interests.length) {
    matched = matched.filter(ad =>
      !ad.keywords || ad.keywords.some(kw => userProfile.interests?.includes(kw))
    );
  }

  return matched;
}