import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { userId, action, location } = data

    // Validate the data
    if (!userId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Log user activity (signup, login, etc.)
    console.log("User activity:", {
      userId,
      action, // 'signup', 'login', etc.
      location, // User's location if available
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
    })

    // Here you would typically:
    // 1. Save the activity to your database
    // 2. Trigger notifications if needed

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error logging user activity:", error)
    return NextResponse.json({ error: "Failed to log user activity" }, { status: 500 })
  }
}

