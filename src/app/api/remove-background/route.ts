// import { type NextRequest, NextResponse } from "next/server"

// export async function POST(request: NextRequest) {
//   try {
//     const formData = await request.formData()
//     const imageFile = formData.get("image_file") as File

//     if (!imageFile) {
//       return NextResponse.json({ error: "No image provided" }, { status: 400 })
//     }

//     // Since we don't have actual API keys, we'll use a free public API
//     // that doesn't require authentication
//     const apiFormData = new FormData()
//     apiFormData.append("image_file", imageFile)

//     // Use the free background removal API from remove.bg
//     // Note: This is using a temporary API key with limited usage
//     const response = await fetch("https://api.remove.bg/v1.0/removebg", {
//       method: "POST",
//       headers: {
//         "X-Api-Key": "LLceb33NyNx7oRzibq7ZTHLH", // This is a temporary key with limited usage
//       },
//       body: apiFormData,
//     })

//     if (!response.ok) {
//       console.error("API error:", await response.text())
//       throw new Error("Failed to remove background")
//     }

//     // Get the processed image
//     const imageBlob = await response.blob()

//     // Convert to base64
//     const base64 = await blobToBase64(imageBlob)

//     return NextResponse.json({ imageUrl: base64 })
//   } catch (error) {
//     console.error("Error processing image:", error)

//     // If the API fails, return a fallback solution
//     try {
//       const formData = await request.formData()
//       const imageFile = formData.get("image_file") as File
//       if (imageFile) {
//         const imageArrayBuffer = await imageFile.arrayBuffer()
//         const originalBase64 = await blobToBase64(new Blob([imageArrayBuffer]))

//         // Return the original image with a message
//         return NextResponse.json({
//           imageUrl: originalBase64,
//           error: "API limit reached. Please try again later or use a different service.",
//         })
//       }
//     } catch (fallbackError) {
//       // Ignore fallback errors
//     }

//     return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
//   }
// }

// // Helper function to convert blob to base64
// async function blobToBase64(blob: Blob): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = () => resolve(reader.result as string)
//     reader.onerror = reject
//     reader.readAsDataURL(blob)
//   })
// }

















// import { type NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   try {
//     // FormData Extract karo
//     const formData = await request.formData();
//     const imageFile = formData.get("image_file");

//     // Check if file exists and is valid
//     if (!(imageFile instanceof File)) {
//       return NextResponse.json({ error: "No image provided" }, { status: 400 });
//     }

//     // Get API Key securely from environment variables
//     const apiKey = process.env.REMOVE_BG_API_KEY;
//     if (!apiKey) {
//       console.error("API Key missing in environment variables");
//       return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
//     }

//     // Prepare FormData for API
//     const apiFormData = new FormData();
//     apiFormData.append("image_file", imageFile);

//     // Call Remove.bg API
//     const response = await fetch("https://api.remove.bg/v1.0/removebg", {
//       method: "POST",
//       headers: {
//         "X-Api-Key": "LLceb33NyNx7oRzibq7ZTHLH" // Secure API key
//       },
//       body: apiFormData,
//     });

//     // API Error Handling
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Remove.bg API Error:", errorText);
//       throw new Error("Failed to remove background: " + errorText);
//     }

//     // Processed image ko blob me convert karo
//     const imageBlob = await response.blob();
//     const base64 = await blobToBase64(imageBlob);

//     // Return processed image as base64
//     return NextResponse.json({ imageUrl: base64 });

//   } catch (error) {
//     console.error("Error processing image:", error);

//     return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
//   }
// }

// // Helper function to convert blob to base64
// async function blobToBase64(blob: Blob): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result as string);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// }























// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const formData = await req.formData();
//   const imageFile = formData.get("image_file") as Blob;

//   if (!imageFile) {
//     return NextResponse.json({ error: "No image provided" }, { status: 400 });
//   }

//   const apiKey = process.env.REMOVE_BG_API_KEY; // Ensure API key is in .env.local
//   const bgFormData = new FormData();
//   bgFormData.append("image_file", imageFile);

//   try {
//     const response = await fetch("https://api.remove.bg/v1.0/removebg", {
//       method: "POST",
//       headers: {
//         "X-Api-Key": apiKey!,
//         "Content-Type": "multipart/form-data",
//       },
//       body: bgFormData,
//     });

//     if (!response.ok) {
//       throw new Error("Remove.bg API error");
//     }

//     const imageBlob = await response.blob();
//     return new Response(imageBlob, { headers: { "Content-Type": "image/png" } });
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
//   }
// }





















import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"
import FormData from "form-data"

export async function POST(req: NextRequest) {
  try {
    // Read form data
    const formData = await req.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Create FormData for remove.bg
    const removeBgForm = new FormData()
    removeBgForm.append("image_file", buffer, file.name)
    removeBgForm.append("size", "auto")

    // Send request to remove.bg
    const response = await axios({
      method: "post",
      url: "https://api.remove.bg/v1.0/removebg",
      data: removeBgForm,
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY || "Gc33gTUinAVQNt5xuC6cG1cR",
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    })

    // Check response status
    if (response.status !== 200) {
      return NextResponse.json({ error: "Failed to process image" }, { status: response.status })
    }

    // Convert response to base64
    const base64Image = Buffer.from(response.data).toString("base64")

    // Return the image as base64
    return NextResponse.json({
      image: `data:image/png;base64,${base64Image}`,
      success: true,
    })
  } catch (error) {
    console.error("Error removing background:", error)

    // Improved error handling
    let errorMessage = "Internal Server Error"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

