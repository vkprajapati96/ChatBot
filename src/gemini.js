// let apiKey = "AIzaSyADOkOJi1j7hcIJ4w0Br--uiWSzO2_nY8I"



// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import fs from "fs";
// import mime from "mime-types";
// import dotenv from "dotenv";

// dotenv.config();

// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",    
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// export async function run(inputText) {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   });

//   const result = await chatSession.sendMessage(inputText);
//   const candidates = result.response.candidates;

//   for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
//     for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
//       const part = candidates[candidate_index].content.parts[part_index];
//       if (part.inlineData) {
//         try {
//           const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
//           fs.writeFileSync(filename, Buffer.from(part.inlineData.data, "base64"));
//           console.log(`Output written to: ${filename}`);
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     }
//   }
//   console.log(result.response.text());
//   return result.response.text();

// }


import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Use Vite environment variable
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 30,
  responseMimeType: "text/plain",
};

export async function run(inputText) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(inputText);
    const responseText = result.response.text();
    console.log("AI Response:", responseText);

    return responseText;
  } catch (error) {
    console.error("Error:", error);
    return "Error occurred";
  }
}
