import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
  }

  try {
    // Validate URL
    new URL(url)

    // Fetch the image
    const response = await fetch(url)

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch image: ${response.statusText}` }, { status: response.status })
    }

    // Get the image data
    const imageData = await response.arrayBuffer()
    const contentType = response.headers.get("content-type") || "image/jpeg"

    // Return the image with appropriate headers
    return new NextResponse(imageData, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch (error) {
    console.error("Error proxying image:", error)
    return NextResponse.json({ error: "Failed to fetch or process the image" }, { status: 500 })
  }
}

