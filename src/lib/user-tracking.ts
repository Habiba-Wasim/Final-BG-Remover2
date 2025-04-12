/**
 * Tracks user signup and login events
 */
export async function trackUserActivity(userId: string, action: "signup" | "login", location?: string) {
    try {
      const response = await fetch("/api/user-activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          action,
          location,
        }),
      })
  
      if (!response.ok) {
        throw new Error(`Failed to track user activity: ${response.statusText}`)
      }
  
      return await response.json()
    } catch (error) {
      console.error("Error tracking user activity:", error)
      // Don't throw error to prevent disrupting the user experience
      return { success: false, error: "Failed to track activity" }
    }
  }
  
  /**
   * Example usage in authentication flow:
   *
   * // In your login component:
   * import { trackUserActivity } from '@/lib/user-tracking';
   *
   * // After successful login:
   * await trackUserActivity(user.id, 'login');
   *
   * // After successful signup:
   * await trackUserActivity(user.id, 'signup');
   */
  
  