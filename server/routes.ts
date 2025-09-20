import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizAttemptSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get quiz questions with optional filtering
  app.get("/api/quiz/questions", async (req, res) => {
    try {
      const { difficulty, category, mode } = req.query;
      let questions = await storage.getQuizQuestions(
        difficulty as string, 
        category as string
      );
      
      // Handle different game modes
      if (mode === "quick") {
        questions = questions.slice(0, 5); // Quick mode: 5 questions
      } else if (mode === "comprehensive") {
        // Comprehensive mode: all questions (no limit)
      }
      
      // Shuffle questions for variety
      const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
      res.json(shuffledQuestions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quiz questions" });
    }
  });

  // Save quiz attempt
  app.post("/api/quiz/attempt", async (req, res) => {
    try {
      const validatedData = insertQuizAttemptSchema.parse(req.body);
      const attempt = await storage.saveQuizAttempt(validatedData);
      res.json(attempt);
    } catch (error) {
      res.status(400).json({ message: "Invalid quiz attempt data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
