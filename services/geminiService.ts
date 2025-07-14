
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME, JUNG_SYSTEM_PROMPT, REFUSAL_TRIGGER_PHRASE, IMMEDIATE_BLOCK_TRIGGER_PHRASE } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY is not set in environment variables. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY_PLACEHOLDER" });

export const analyzeDreamWithGemini = async (dreamDescription: string, isRetryAfterRefusal: boolean): Promise<string> => {
  if (!API_KEY || API_KEY === "MISSING_API_KEY_PLACEHOLDER") {
    throw new Error("Klucz API Gemini nie jest skonfigurowany. Proszę ustawić zmienną środowiskową API_KEY.");
  }
  
  const model = ai.models;
  const systemInstructionToUse = JUNG_SYSTEM_PROMPT;
  const userContent = `Sen do analizy: "${dreamDescription}"`;

  try {
    const response: GenerateContentResponse = await model.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: userContent,
        config: {
            systemInstruction: systemInstructionToUse,
            temperature: 0.7, 
            topK: 40,
            topP: 0.95,
        }
    });
    
    const text = response.text;

    if (!text) {
      // This case should be rare with the current robust prompt.
      // If Google's safety filters trigger without returning text but via candidate info,
      // it would be caught in the catch block below.
      // If the model genuinely returns empty text despite the prompt, it's an unexpected state.
      console.warn("Received an empty text response from AI, which is unexpected with the current prompt configuration. This might indicate an issue with the model or a very strong filter overriding the custom prompt instructions.");
      // Return a generic block trigger to be safe, as this is undefined behavior.
      return `${IMMEDIATE_BLOCK_TRIGGER_PHRASE} Otrzymano nieoczekiwaną pustą odpowiedź od serwera AI.`;
    }
    return text;

  } catch (error) {
    console.error("Gemini API error:", error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
            throw new Error("Klucz API Gemini jest nieprawidłowy. Sprawdź jego poprawność.");
        }
        if (error.message.toLowerCase().includes("quota") || error.message.toLowerCase().includes("rate limit")) {
            throw new Error("Przekroczono limit zapytań do API Gemini. Spróbuj ponownie później.");
        }
        // Check for specific safety-related blocking messages from Gemini
        // These can appear in error.message or sometimes in error.response.data or similar structures
        // depending on how the SDK wraps the error.
        const errorMessageLowerCase = error.message.toLowerCase();
        if (errorMessageLowerCase.includes("candidate") && (errorMessageLowerCase.includes("finish_reason: SAFETY") || errorMessageLowerCase.includes("blocked_reason"))) {
            console.warn("Gemini API blocked the request due to Google's safety filters:", error.message);
            return `${IMMEDIATE_BLOCK_TRIGGER_PHRASE} Twoje zapytanie naruszyło zasady bezpieczeństwa platformy AI.`;
        }
         if (errorMessageLowerCase.includes("safetySettings") || errorMessageLowerCase.includes("blocked by safety setting")) {
             console.warn("Gemini API blocked the request due to Google's safety settings (detected in error message):", error.message);
            return `${IMMEDIATE_BLOCK_TRIGGER_PHRASE} Twoje zapytanie zostało zablokowane przez filtry bezpieczeństwa AI.`;
        }

    }
    // Generic error for other communication issues
    throw new Error(`Błąd komunikacji z Gemini API: ${error instanceof Error ? error.message : String(error)}`);
  }
};
