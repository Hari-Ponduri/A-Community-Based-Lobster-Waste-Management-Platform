import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { LabRequest, Restaurant, AiMatchAdvice } from "@/lib/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { labRequest, candidates } = body as {
      labRequest: LabRequest;
      candidates: Restaurant[];
    };

    // Validate input
    if (!labRequest || !candidates || candidates.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: missing labRequest or candidates" },
        { status: 400 }
      );
    }

    // Build prompt for AI advisor
    const systemPrompt = `You are an expert biomaterials logistics advisor specializing in crustacean shell supply chains for chitosan extraction and biomaterial research.

Your role is to analyze matches between research labs and seafood restaurants, providing practical recommendations and identifying logistics considerations.

You must respond with valid JSON matching this exact structure:
{
  "recommendedRestaurantIds": ["id1", "id2"],
  "summary": "A 1-2 sentence explanation of why this match works well",
  "logisticsNotes": "Practical notes about storage, pickup coordination, and handling",
  "riskFactors": ["risk 1", "risk 2", "risk 3"]
}`;

    const userPrompt = `A research lab needs the following:
- Shell type: ${labRequest.shellTypeNeeded}
- Weekly quantity: ${labRequest.weeklyKgNeeded} kg
- Pickup frequency: ${labRequest.frequency}
- Pickup radius: ${labRequest.radiusKm} km
${labRequest.purpose ? `- Research purpose: ${labRequest.purpose}` : ""}

Available restaurant candidates (already pre-matched by algorithm):
${candidates
  .map(
    (r, idx) =>
      `${idx + 1}. ${r.name} (ID: ${r.id})
   - Shell type: ${r.shellType}
   - Weekly supply: ${r.weeklyKg} kg
   - Storage: ${r.storage}
   - Pickup window: ${r.pickupWindow}
   - Location: ${r.location}`
  )
  .join("\n\n")}

Analyze these matches and provide your recommendation in the JSON format specified.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("No response from AI model");
    }

    // Parse AI response
    const aiResponse = JSON.parse(responseContent) as AiMatchAdvice;

    // Validate response structure
    if (
      !aiResponse.recommendedRestaurantIds ||
      !aiResponse.summary ||
      !aiResponse.logisticsNotes ||
      !aiResponse.riskFactors
    ) {
      throw new Error("Invalid AI response structure");
    }

    return NextResponse.json({ advice: aiResponse });
  } catch (error) {
    console.error("AI Match Advisor error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate AI recommendations",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
